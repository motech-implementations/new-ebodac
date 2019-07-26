package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class CampaignMessageDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String messageKey;

  @Getter
  @Setter
  private String timeOffset;

  @Getter
  @Setter
  private String visitTypeId;
}
