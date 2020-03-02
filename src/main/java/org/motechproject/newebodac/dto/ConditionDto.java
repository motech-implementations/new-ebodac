package org.motechproject.newebodac.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConditionDto extends BaseDto {

  private UUID fieldConfig;

  private String operator;

  private String fieldType;

  private String value;
}
