package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseDto {

  private String username;

  private String email;

  private String password;

  private String name;

  private Set<UUID> roleIds = new HashSet<>();

  private Boolean enabled;
}
