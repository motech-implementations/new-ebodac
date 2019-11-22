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
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.CsvConfig;
import org.motechproject.newebodac.domain.CsvField;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.repository.CsvConfigRepository;
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
  private VaccineeRepository vaccineeRepository;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  @Autowired
  private VisitRepository visitRepository;

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
              addFieldValueMapErrors(csvMapReader, errorMap, cellValue,
                  csvField, csvField.getFieldValueMap());
              continue;
            }
            BaseEntity relatedEntityObject = getRelatedEntityObject(cellValue,
                csvField);
            cleanRow.put(csvField.getFieldConfig().getName(),
                relatedEntityObject);
            break;
          case ENUM:
            if (!csvField.getEnumValueMap().isEmpty() && csvField.getEnumValueMap()
                .get(cellValue) == null) {
              addFieldValueMapErrors(csvMapReader, errorMap, cellValue,
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

  private List<String> getAllCsvConfigFieldNames(CsvConfig csvConfig) {
    return csvConfig.getCsvFields()
        .stream()
        .map(CsvField::getFieldName)
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

  private void addFieldValueMapErrors(ICsvMapReader csvMapReader, Map<Integer, String> errorMap,
      String cellValue, CsvField csvField, Map<String, ?> valuesMap) {
    errorMap.put(csvMapReader.getLineNumber(), String.format(
        "The value '%s' from the CSV column '%s' isn't mapped in the CSV config for field %s: "
            + "%s", cellValue, csvField.getFieldName(),
        csvField.getFieldConfig().getDisplayName(), valuesMap.keySet()));
  }

  private BaseEntity getRelatedEntityObject(String cellValue, CsvField csvField) {
    Class<? extends BaseEntity> relatedEntityClass = csvField.getFieldConfig().getRelatedEntity()
        .getEntityClass();
    BaseEntity relatedEntityObject;
    if (csvField.getFieldValueMap().isEmpty()) {
      relatedEntityObject = OBJECT_MAPPER.convertValue(
          Map.of(csvField.getFieldConfig().getName(), cellValue),
          relatedEntityClass);
    } else {
      relatedEntityObject = OBJECT_MAPPER.convertValue(
          Map.of("id", csvField.getFieldValueMap().get(cellValue)),
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
}
