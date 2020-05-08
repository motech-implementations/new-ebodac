package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CsvFieldDto extends BaseDto {

  private String fieldName;

  private UUID fieldConfigId;

  private String format;

  private String defaultValue;

  private Boolean keyField = false;

  private Set<CsvFieldValueToEntityDto> fieldValueMap = new HashSet();

  private Set<CsvFieldValueToEnumDto> enumValueMap = new HashSet();
}
