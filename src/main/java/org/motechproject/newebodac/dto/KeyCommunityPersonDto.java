package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class KeyCommunityPersonDto {

  @Uuid
  private String id;

  private String name;

  private String phone;

  private String community;

  private String languageId;

  private Set<ExtraFieldDto> extraFields;
}
