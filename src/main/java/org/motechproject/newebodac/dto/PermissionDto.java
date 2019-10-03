package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermissionDto extends BaseDto {

  private String name;

  private String displayName;

  private Boolean readonly = false;
}
