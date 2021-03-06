package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VisitTypeDto extends BaseDto {

  private String name;

  private String displayName;

  private String category;

  private Integer timeOffset;

  private Integer earliestOffset;

  private Integer latestOffset;
}
