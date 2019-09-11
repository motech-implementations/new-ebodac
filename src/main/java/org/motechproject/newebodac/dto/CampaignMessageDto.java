package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignMessageDto extends BaseDto {

  private String name;

  private String messageKey;

  private String timeOffset;

  private String visitTypeId;
}
