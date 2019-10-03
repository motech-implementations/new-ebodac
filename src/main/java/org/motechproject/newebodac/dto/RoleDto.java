package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RoleDto extends BaseDto {

  private String name;

  private Boolean readonly = false;

  private Set<UUID> permissionIds = new HashSet<>();
}
