package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyCommunityPersonDto extends BaseDto {

  private String name;

  private String phone;

  private String community;

  private UUID language;

  private Set<ExtraFieldDto> extraFields = new HashSet<>();
}
