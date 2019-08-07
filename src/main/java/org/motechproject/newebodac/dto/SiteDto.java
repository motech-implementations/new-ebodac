package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class SiteDto {

  @Uuid
  private String siteId;

  private String description;

  private Set<ExtraFieldDto> extraFields;
}
