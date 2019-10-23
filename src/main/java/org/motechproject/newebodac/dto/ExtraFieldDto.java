package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExtraFieldDto extends BaseDto {

  private String name;

  private String value;

  private String fieldType;
}
