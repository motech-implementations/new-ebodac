package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CsvFieldValueToEnumDto extends BaseDto  {

  private String fieldValue;

  private String enumValue;

  /**
   * Construct new csvFieldValueToEnum with given parameters.
   * @param fieldValue value of the field
   * @param enumValue Value of the enum fiedl
   */
  public CsvFieldValueToEnumDto(String fieldValue, String enumValue) {
    super();
    this.fieldValue = fieldValue;
    this.enumValue = enumValue;
  }
}
