package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonFieldDto extends BaseDto {

  private String fieldName;

  private UUID fieldConfigId;

  private String format;

  private String defaultValue;

  private Boolean keyField;

  private Set<JsonFieldValueToEntityDto> fieldValueMap = new HashSet();

  private Set<JsonFieldValueToEnumDto> enumValueMap = new HashSet();
}
