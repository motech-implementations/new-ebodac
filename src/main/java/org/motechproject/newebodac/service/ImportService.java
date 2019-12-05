package org.motechproject.newebodac.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.UUID;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.FieldConfig;

public abstract class ImportService {

  /**
   * Gets BaseEntity object to deserialize relation values.
   * @param cellValue value of the cell in csv row.
   * @param fieldConfig related field config.
   * @param fieldValueMap mapped values with
   * @param objectMapper object to map values to entities.
   * @return Deserialized entity.
   */
  protected BaseEntity getBaseEntity(String cellValue, FieldConfig fieldConfig,
      Map<String, UUID> fieldValueMap, ObjectMapper objectMapper) {
    Class<? extends BaseEntity> relatedEntityClass = fieldConfig.getRelatedEntity()
        .getEntityClass();
    BaseEntity relatedEntityObject;
    if (fieldValueMap.isEmpty()) {
      relatedEntityObject = objectMapper.convertValue(
          Map.of(fieldConfig.getName(), cellValue),
          relatedEntityClass);
    } else {
      relatedEntityObject = objectMapper.convertValue(
          Map.of("id", fieldValueMap.get(cellValue)),
          relatedEntityClass);
    }
    return relatedEntityObject;
  }
}
