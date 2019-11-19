package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.HasKeyField;

@Getter
@Setter
public class CsvConfigDto extends BaseDto {

  @HasKeyField
  private Set<CsvFieldDto> csvFields = new HashSet();

  private String entity;

  private String name;
}
