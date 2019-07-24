package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.Uuid;

public class VisitTypeDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String displayName;

  @Getter
  @Setter
  private Integer timeOffset;

  @Getter
  @Setter
  private Integer earliestOffset;

  @Getter
  @Setter
  private Integer latestOffset;

  @Getter
  @Setter
  private Set<CampaignMessageDto> messages;
}
