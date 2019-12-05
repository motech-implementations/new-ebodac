package org.motechproject.newebodac.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonFieldValueToEntityDto extends BaseDto {

  private String fieldValue;

  private UUID entityId;

  /**
   * Construct new jsonFieldValueToEntity with given parameters.
   * @param fieldValue value of the field
   * @param entityId id of the entity
   */
  public JsonFieldValueToEntityDto(String fieldValue, UUID entityId) {
    super();
    this.fieldValue = fieldValue;
    this.entityId = entityId;
  }
}
