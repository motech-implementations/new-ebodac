package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyCommunityPersonDto extends BaseDto {

  private String name;

  private String phone;

  private String community;

  private String languageId;

  private Set<ExtraFieldDto> extraFields;
}
