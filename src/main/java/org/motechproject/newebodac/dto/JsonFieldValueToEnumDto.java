package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonFieldValueToEnumDto extends BaseDto {

  private String fieldValue;

  private String enumValue;

  /**
   * Construct new jsonFieldValueToEnum with given parameters.
   * @param fieldValue value of the field
   * @param enumValue Value of the enum field
   */
  public JsonFieldValueToEnumDto(String fieldValue, String enumValue) {
    this.fieldValue = fieldValue;
    this.enumValue = enumValue;
  }
}
