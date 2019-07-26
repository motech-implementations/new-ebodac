package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class SiteDto {

  @Getter
  @Setter
  @Uuid
  private String siteId;

  @Getter
  @Setter
  private String description;

  @Getter
  @Setter
  private Set<ExtraFieldDto> extraFields;
}
