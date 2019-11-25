package org.motechproject.newebodac.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.CsvConfig;
import org.motechproject.newebodac.domain.CsvField;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.JsonConfig;
import org.motechproject.newebodac.domain.JsonField;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.repository.CsvConfigRepository;
import org.motechproject.newebodac.repository.JsonConfigRepository;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.supercsv.io.CsvMapReader;
import org.supercsv.io.ICsvMapReader;
import org.supercsv.prefs.CsvPreference;

@SuppressWarnings({"PMD.CyclomaticComplexity", "PMD.CloseResource", "PMD.ExcessiveImports",
    "PMD.AssignmentInOperand", "PMD.NcssCount", "PMD.ExcessiveMethodLength"})
@Slf4j
@Service
public class ImportService {

  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  @Autowired
  private CsvConfigRepository csvConfigRepository;

  @Autowired
  private JsonConfigRepository jsonConfigRepository;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  @Autowired
  private VisitRepository visitRepository;

  private String importJsonWithConfig(JSONObject jsonObject, JsonConfig jsonConfig) {
    StringBuilder errorMessageBuilder = new StringBuilder();

    configureMapper();

    List<String> csvConfigFieldsNames = getAllJsonConfigFieldNames(jsonConfig);
    List<String> jsonKeys = this.getJsonKeys(jsonObject);

    Map<String, Object> cleanRow = new HashMap<>();
    for (JsonField jsonField : jsonConfig.getJsonFields()) {
      String jsonValue = jsonObject.getString(jsonField.getFieldName().toLowerCase(Locale.ENGLISH));
      System.out.println(String.format("key=%s, value=%s", jsonField.getFieldName(), jsonValue));

      if (StringUtils.isBlank(jsonValue)) {
        if (StringUtils.isBlank(jsonField.getDefaultValue())) {
          continue;
        } else {
          jsonValue = jsonField.getDefaultValue();
        }
      }

      jsonValue = jsonValue.trim();

      switch (jsonField.getFieldConfig().getFieldType()) {
        case DATE:
        case DATE_TIME:
          DateTimeFormatter formatter = DateTimeFormatter.ofPattern(jsonField.getFormat());
          LocalDate parsedDate = LocalDate.parse(jsonValue,
              formatter);
          cleanRow.put(jsonField.getFieldConfig().getName(), parsedDate);
        case RELATION:
          if (!jsonField.getFieldValueMap().isEmpty() && jsonField.getFieldValueMap()
              .get(jsonValue) == null) {
            errorMessageBuilder.append(addFieldValueMapErrorsFromJson(jsonValue, jsonField));
            continue;
          }
          BaseEntity relatedEntityObject = getRelatedEntityObject(jsonValue,
              jsonField.getFieldConfig(), jsonField.getFieldValueMap());
          cleanRow.put(jsonField.getFieldConfig().getName(),
              relatedEntityObject);
          break;
        case ENUM:
          if (!jsonField.getEnumValueMap().isEmpty() && jsonField.getEnumValueMap()
              .get(jsonValue) == null) {
            errorMessageBuilder.append(addFieldValueMapErrorsFromJson(jsonValue, jsonField));
            continue;
          }
          String relatedEnum = jsonField.getEnumValueMap().get(jsonValue);
          cleanRow.put(jsonField.getFieldConfig().getName(), relatedEnum);
          break;
        default:
          cleanRow.put(jsonField.getFieldConfig().getName(), jsonValue);
          break;
      }

      switch (jsonConfig.getEntity()) {
        case VACCINEE:
          handleVaccineeEntity(cleanRow);
          break;
        case VISIT:
          Visit visit = OBJECT_MAPPER.convertValue(cleanRow, Visit.class);

          Vaccinee correspondingVaccinee = vaccineeRepository.findByVaccineeId(visit.getVaccinee()
              .getVaccineeId());
          if (correspondingVaccinee == null) {
            errorMessageBuilder.append(String.format(
                "There is no Vaccinee with Vaccinee id=%s in DB",
                visit.getVaccinee().getVaccineeId()));
            continue;
          }
          visit.setVaccinee(correspondingVaccinee);

          Visit existingVisit = visitRepository
              .getByVaccineeIdAndType(visit.getVaccinee().getId(), visit.getType());
          if (existingVisit != null) {
            visit.setId(existingVisit.getId());
          }
          visitRepository.save(visit);
          break;
        case PERSON:
          handlePersonEntity(cleanRow);
          break;
        default:
          break;
      }
    }

    this.checkExistingColumnsInJson(jsonKeys, csvConfigFieldsNames);
    return errorMessageBuilder.toString();
  }

  public Map<Integer, String> importJsonArray(JSONArray jsonArray, String configName) {
    final Map<Integer, String> errorMap = new HashMap<>();

    JsonConfig jsonConfig = jsonConfigRepository.findByName(configName).orElseThrow(() ->
        new EntityNotFoundException("Json config with name: " + configName + " couldn't be found"));

    for (int i = 0; i < jsonArray.length(); i++) {
      JSONObject jsonObject = jsonArray.getJSONObject(i);
      errorMap.put(i, this.importJsonWithConfig(jsonObject, jsonConfig));
    }
    return errorMap;
  }

  public Map<Integer, String> importJsonWithConfigName(JSONObject jsonObject, String configName) {
    final Map<Integer, String> errorMap = new HashMap<>();
    JsonConfig jsonConfig = jsonConfigRepository.findByName(configName).orElseThrow(() ->
        new EntityNotFoundException("Json config with name: " + configName + " couldn't be found"));
    errorMap.put(0, this.importJsonWithConfig(jsonObject, jsonConfig));
    return errorMap;
  }

  /**
   * Processes CSV file with data and returns list of errors.
   *
   * @param csvFile     csv file with data to import
   * @param csvConfigId id of the particular CsvConfig
   * @return map with row numbers as keys and errors as values.
   */
  public Map<Integer, String> importDataFromCsvWithConfig(MultipartFile csvFile,
      UUID csvConfigId) throws IOException {

    CsvConfig csvConfig = csvConfigRepository.findById(csvConfigId).orElseThrow(() ->
        new EntityNotFoundException("Csv Config with id: " + csvConfigId + " couldn't be found"));

    configureMapper();

    final ICsvMapReader csvMapReader = new CsvMapReader(new InputStreamReader(
        csvFile.getInputStream()), CsvPreference.STANDARD_PREFERENCE);
    String[] csvHeaders = getCsvHeaders(csvMapReader);
    List<String> csvConfigFieldsNames = getAllCsvConfigFieldNames(csvConfig);
    checkExistingColumnsInCsv(csvHeaders, csvConfigFieldsNames);

    final Map<Integer, String> errorMap = new HashMap<>();
    Map<String, Object> cleanRow = new HashMap<>();
    Map<String, String> row;
    while ((row = csvMapReader.read(csvHeaders)) != null) {
      log.debug(String.format("lineNo=%s, rowNo=%s, row=%s", csvMapReader.getLineNumber(),
          csvMapReader.getRowNumber(), row));

      String cellValue;
      cleanRow.clear();
      for (CsvField csvField : csvConfig.getCsvFields()) {
        cellValue = row.get(csvField.getFieldName().toLowerCase(Locale.ENGLISH));

        if (StringUtils.isBlank(cellValue)) {
          if (StringUtils.isBlank(csvField.getDefaultValue())) {
            continue;
          } else {
            cellValue = csvField.getDefaultValue();
          }
        }

        cellValue = cellValue.trim();

        switch (csvField.getFieldConfig().getFieldType()) {
          case DATE:
          case DATE_TIME:
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(csvField.getFormat());
            LocalDate parsedDate = LocalDate.parse(cellValue,
                formatter);
            cleanRow.put(csvField.getFieldConfig().getName(), parsedDate);
            break;
          case RELATION:
            if (!csvField.getFieldValueMap().isEmpty() && csvField.getFieldValueMap()
                .get(cellValue) == null) {
              addFieldValueMapErrorsFromCsv(csvMapReader, errorMap, cellValue,
                  csvField, csvField.getFieldValueMap());
              continue;
            }
            BaseEntity relatedEntityObject = getRelatedEntityObject(cellValue,
                csvField.getFieldConfig(), csvField.getFieldValueMap());
            cleanRow.put(csvField.getFieldConfig().getName(),
                relatedEntityObject);
            break;
          case ENUM:
            if (!csvField.getEnumValueMap().isEmpty() && csvField.getEnumValueMap()
                .get(cellValue) == null) {
              addFieldValueMapErrorsFromCsv(csvMapReader, errorMap, cellValue,
                  csvField, csvField.getEnumValueMap());
              continue;
            }
            String relatedEnum = csvField.getEnumValueMap().get(cellValue);
            cleanRow.put(csvField.getFieldConfig().getName(), relatedEnum);
            break;
          default:
            cleanRow.put(csvField.getFieldConfig().getName(), cellValue);
            break;
        }
      }

      switch (csvConfig.getEntity()) {
        case VACCINEE:
          handleVaccineeEntity(cleanRow);
          break;
        case VISIT:
          Visit visit = OBJECT_MAPPER.convertValue(cleanRow, Visit.class);

          Vaccinee correspondingVaccinee = vaccineeRepository.findByVaccineeId(visit.getVaccinee()
                  .getVaccineeId());
          if (correspondingVaccinee == null) {
            errorMap.put(csvMapReader.getLineNumber(), String.format(
                "There is no Vaccinee with Vaccinee id=%s in DB",
                visit.getVaccinee().getVaccineeId()));
            continue;
          }
          visit.setVaccinee(correspondingVaccinee);

          Visit existingVisit = visitRepository
              .getByVaccineeIdAndType(visit.getVaccinee().getId(), visit.getType());
          if (existingVisit != null) {
            visit.setId(existingVisit.getId());
          }
          visitRepository.save(visit);
          break;
        case PERSON:
          handlePersonEntity(cleanRow);
          break;
        default:
          break;
      }
    }
    csvMapReader.close();
    return errorMap;
  }

  private String[] getCsvHeaders(ICsvMapReader csvMapReader) throws IOException {
    return Arrays.stream(csvMapReader.getHeader(true))
          .map(String::trim)
          .map(String::toLowerCase)
          .toArray(String[]::new);
  }

  private  List<String> getJsonKeys(JSONObject jsonObject) {
    List<String> result = new ArrayList<>();
    Iterator<String> iterator = jsonObject.keys();
    while (iterator.hasNext()) {
      String key = iterator.next();
      result.add(key);
    }
    return result;
  }

  private List<String> getAllCsvConfigFieldNames(CsvConfig csvConfig) {
    return csvConfig.getCsvFields()
        .stream()
        .map(CsvField::getFieldName)
        .map(String::toLowerCase)
        .collect(Collectors.toList());
  }

  private List<String> getAllJsonConfigFieldNames(JsonConfig jsonConfig) {
    return jsonConfig.getJsonFields()
        .stream()
        .map(JsonField::getFieldName)
        .map(String::toLowerCase)
        .collect(Collectors.toList());
  }

  private void configureMapper() {
    OBJECT_MAPPER.registerModule(new JavaTimeModule());
    OBJECT_MAPPER.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
  }

  private void handlePersonEntity(Map<String, Object> cleanRow) {
    KeyCommunityPerson keyCommunityPerson = OBJECT_MAPPER.convertValue(cleanRow,
        KeyCommunityPerson.class);

    keyCommunityPersonRepository.save(keyCommunityPerson);
  }

  private void handleVaccineeEntity(Map<String, Object> cleanRow) {
    Vaccinee vaccinee = OBJECT_MAPPER.convertValue(cleanRow, Vaccinee.class);

    Vaccinee existingVaccinee = vaccineeRepository.findByVaccineeId(vaccinee.getVaccineeId());
    if (existingVaccinee != null) {
      vaccinee.setId(existingVaccinee.getId());
    }
    vaccineeRepository.save(vaccinee);
  }

  private void addFieldValueMapErrorsFromCsv(ICsvMapReader csvMapReader, Map<Integer, String> errorMap,
      String cellValue, CsvField csvField, Map<String, ?> valuesMap) {
    errorMap.put(csvMapReader.getLineNumber(), String.format(
        "The value '%s' from the CSV column '%s' isn't mapped in the CSV config for field %s: "
            + "%s", cellValue, csvField.getFieldName(),
        csvField.getFieldConfig().getDisplayName(), valuesMap.keySet()));
  }

  private String addFieldValueMapErrorsFromJson(String jsonValue,
      JsonField jsonField) {
    return String.format(
        "The value '%s' from the Json key '%s' isn't mapped in the Json config for field %s\n",
        jsonValue, jsonField.getFieldName(), jsonField.getFieldConfig().getDisplayName());
  }

  private BaseEntity getRelatedEntityObject(String cellValue, FieldConfig fieldConfig, Map<String, UUID> fieldValueMap) {
    Class<? extends BaseEntity> relatedEntityClass = fieldConfig.getRelatedEntity()
        .getEntityClass();
    BaseEntity relatedEntityObject;
    if (fieldValueMap.isEmpty()) {
      relatedEntityObject = OBJECT_MAPPER.convertValue(
          Map.of(fieldConfig.getName(), cellValue),
          relatedEntityClass);
    } else {
      relatedEntityObject = OBJECT_MAPPER.convertValue(
          Map.of("id", fieldValueMap.get(cellValue)),
          relatedEntityClass);
    }
    return relatedEntityObject;
  }

  private void checkExistingColumnsInCsv(String[] csvHeaders, List<String> csvConfigFieldsNames) {
    csvConfigFieldsNames.forEach(csvConfigFieldName -> {
      if (Arrays.stream(csvHeaders).noneMatch(h -> h.equals(csvConfigFieldName))) {
        List<String> unmappedHeaders = new ArrayList<>(Arrays.asList(csvHeaders));
        unmappedHeaders.removeAll(csvConfigFieldsNames);
        throw new IllegalArgumentException(String.format("Column '%s' "
                + "is missing in the CSV file.\nEither fix your CSV or your CSV config.\n"
                + "Following CSV headers appear in the CSV file but not in config:\n'%s'",
            csvConfigFieldName, unmappedHeaders));
      }
    });
  }

  private void checkExistingColumnsInJson(List<String> jsonKeys, List<String> jsonConfigFieldsNames) {
    jsonConfigFieldsNames.forEach(jsonConfigFieldName -> {
      if (jsonKeys.stream().noneMatch(key -> key.equals(jsonConfigFieldName))) {
        ArrayList unmappedKeys = new ArrayList<>(jsonKeys);
        unmappedKeys.removeAll(jsonConfigFieldsNames);
        throw new IllegalArgumentException(String.format("Column '%s' "
                + "is missing in the Json.\nEither fix your Json or your Json config.\n"
                + "Following Json headers appear in the Json file but not in config:\n'%s'",
            jsonConfigFieldName, unmappedKeys));
      }
    });
  }
}
