package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class KeyCommunityPersonDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String phone;

  @Getter
  @Setter
  private String community;

  @Getter
  @Setter
  private String languageId;

  @Getter
  @Setter
  private Set<ExtraFieldDto> extraFields;
}
