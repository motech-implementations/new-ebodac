package org.motechproject.newebodac.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsonorg.JsonOrgModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.JsonConfig;
import org.motechproject.newebodac.domain.JsonField;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.NewEbodacException;
import org.motechproject.newebodac.helper.EncryptionHelper;
import org.motechproject.newebodac.repository.JsonConfigRepository;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JsonImportService extends ImportService {

  private static final String PHONE_NUMBER = "phoneNumber";

  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  @Autowired
  private JsonConfigRepository jsonConfigRepository;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  @Autowired
  private VisitRepository visitRepository;

  @Autowired
  private EncryptionHelper encryptionHelper;

  @Autowired
  private EnrollmentService enrollmentService;

  /**
   * Fuction deserializes json and saves it to database.
   * @param configName name of the JsonConfig.
   * @param jsonString String representing json.
   */
  public void importJson(String configName, String jsonString) {
    JsonConfig jsonConfig = jsonConfigRepository.findByName(configName).orElseThrow(() ->
        new EntityNotFoundException("Json config with name: " + configName + " couldn't be found"));

    try {
      if (StringUtils.isNotBlank(jsonConfig.getPathToData())) {
        JSONObject jsonObject = new JSONObject(jsonString);
        Object resolvedJson = resolvePath(jsonConfig.getPathToData(), jsonObject);
        if (jsonConfig.getMultipleRecord()) {
          importJsonArray((JSONArray) resolvedJson, jsonConfig);
        } else {
          importJsonWithConfig((JSONObject) resolvedJson, jsonConfig);
        }
      } else {
        if (jsonConfig.getMultipleRecord()) {
          importJsonArray(new JSONArray(jsonString), jsonConfig);
        } else {
          importJsonWithConfig(new JSONObject(jsonString), jsonConfig);
        }
      }
    } catch (JSONException e) {
      throw new NewEbodacException("Can't parse the json. Check format of the json.", e);
    }
  }

  private void importJsonWithConfig(JSONObject jsonObject, JsonConfig jsonConfig) {
    configureMapper();
    JSONObject deserializedObject = new JSONObject();
    for (JsonField jsonField : jsonConfig.getJsonFields()) {
      String fieldName = jsonField.getFieldName();
      String fieldConfigName = jsonField.getFieldConfig().getName();
      String jsonValue = jsonObject.getString(fieldName);
      if (StringUtils.isBlank(jsonValue)) {
        if (StringUtils.isBlank(jsonField.getDefaultValue())) {
          continue;
        } else {
          jsonValue = jsonField.getDefaultValue();
        }
      }
      switch (jsonField.getFieldConfig().getFieldType()) {
        case DATE:
        case DATE_TIME:
          DateTimeFormatter formatter = DateTimeFormatter.ofPattern(jsonField.getFormat());
          LocalDate parsedDate = LocalDate.parse(jsonValue, formatter);
          deserializedObject.put(fieldConfigName, parsedDate);
          break;
        case RELATION:
          BaseEntity relatedEntityObject = getRelatedEntityObject(jsonValue, jsonField);
          deserializedObject.put(fieldConfigName, relatedEntityObject);
          break;
        case ENUM:
          String relatedEnum = jsonField.getEnumValueMap().get(jsonValue);
          deserializedObject.put(fieldConfigName, relatedEnum);
          break;
        default:
          if (PHONE_NUMBER.equals(fieldConfigName)) {
            deserializedObject.put(fieldConfigName, encryptionHelper.encrypt(jsonValue));
          } else {
            deserializedObject.put(fieldConfigName, jsonValue);
          }
          break;
      }
    }

    handleDeserializedObject(jsonConfig.getEntity(), deserializedObject);
  }

  private void handleDeserializedObject(EntityType entityType, JSONObject deserializedObject) {
    switch (entityType) {
      case VACCINEE:
        handleVaccineeEntity(deserializedObject);
        break;
      case VISIT:
        handleVisit(deserializedObject);
        break;
      case PERSON:
        handlePersonEntity(deserializedObject);
        break;
      default:
        break;
    }
  }

  /**
   * Deserializes JSONArray.
   * @param jsonArray array of jsons to deserialize.
   * @param jsonConfig JsonConfig used to deserialize json.
   */
  private void importJsonArray(JSONArray jsonArray, JsonConfig jsonConfig) {
    for (int i = 0; i < jsonArray.length(); i++) {
      JSONObject jsonObject = jsonArray.getJSONObject(i);
      importJsonWithConfig(jsonObject, jsonConfig);
    }
  }

  private void configureMapper() {
    OBJECT_MAPPER.registerModule(new JavaTimeModule());
    OBJECT_MAPPER.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    OBJECT_MAPPER.registerModule(new JsonOrgModule());
  }

  /**
   * Function resolves path within JSONObject. It uses "JsonPointer" and it's format is
   * e.g. /one/two/three
   * @param pathToData path to data in json e.g. one.two.three
   * @param jsonObject json object to resolve with path
   * @return resolved JSONObject or JSON Array.
   */
  private Object resolvePath(String pathToData, JSONObject jsonObject) {
    if (StringUtils.isNotBlank(pathToData)) {
      String parsedPath = pathToData.replaceAll("\\.", "/");
      return jsonObject.optQuery("/" + parsedPath);
    }
    return jsonObject;
  }

  private BaseEntity getRelatedEntityObject(String cellValue, JsonField jsonField) {
    return getBaseEntity(cellValue, jsonField.getFieldConfig(), jsonField.getFieldValueMap(),
        OBJECT_MAPPER);
  }

  private void handlePersonEntity(JSONObject jsonObject) {
    KeyCommunityPerson keyCommunityPerson = OBJECT_MAPPER.convertValue(jsonObject,
        KeyCommunityPerson.class);

    keyCommunityPersonRepository.save(keyCommunityPerson);
  }

  private void handleVaccineeEntity(JSONObject jsonObject) {
    Vaccinee vaccinee = OBJECT_MAPPER.convertValue(jsonObject, Vaccinee.class);

    Vaccinee existingVaccinee = vaccineeRepository.findByVaccineeId(vaccinee.getVaccineeId());
    if (existingVaccinee != null) {
      vaccinee.setId(existingVaccinee.getId());
      enrollmentService.updateEnrollmentStatus(existingVaccinee);
    }
    vaccineeRepository.save(vaccinee);
  }

  private void handleVisit(JSONObject jsonObject) {
    Visit visit = OBJECT_MAPPER.convertValue(jsonObject, Visit.class);

    if (visit.getVaccinee() != null) {
      Vaccinee correspondingVaccinee = vaccineeRepository.findByVaccineeId(visit.getVaccinee()
          .getVaccineeId());
      if (correspondingVaccinee == null) {
        log.error(String.format("There is no Vaccinee with Vaccinee id=%s in DB",
            visit.getVaccinee().getVaccineeId()));
      } else {
        visit.setVaccinee(correspondingVaccinee);

        Visit existingVisit = visitRepository
            .getByVaccineeIdAndType(visit.getVaccinee().getId(), visit.getType());
        if (existingVisit == null) {
          EnrollmentStatus status = enrollmentService.getEnrollmentStatus(correspondingVaccinee);
          visit.setStatus(status);
        } else {
          visit.setId(existingVisit.getId());
        }

        visitRepository.save(visit);
      }
    }
  }
}
