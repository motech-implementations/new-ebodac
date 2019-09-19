package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SiteDto extends BaseDto {

  private String siteId;

  private String description;

  private Set<ExtraFieldDto> extraFields;
}
