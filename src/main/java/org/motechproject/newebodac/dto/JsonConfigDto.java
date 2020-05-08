package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.JsonConfigHasKeyField;

@Getter
@Setter
public class JsonConfigDto extends BaseDto {

  @JsonConfigHasKeyField
  private Set<JsonFieldDto> jsonFields = new HashSet<>();

  private String entity;

  private String name;

  private String pathToData = "";

  private Boolean multipleRecord = false;
}
