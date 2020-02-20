package org.motechproject.newebodac.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CsvFieldValueToEntityDto extends BaseDto {

  private String fieldValue;

  private UUID entityId;

  /**
   * Construct new csvFieldValueToEntity with given parameters.
   * @param fieldValue value of the field
   * @param entityId id of the entity
   */
  public CsvFieldValueToEntityDto(String fieldValue, UUID entityId) {
    this.fieldValue = fieldValue;
    this.entityId = entityId;
  }
}
