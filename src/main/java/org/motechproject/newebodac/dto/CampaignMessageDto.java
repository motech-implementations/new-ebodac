package org.motechproject.newebodac.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignMessageDto extends BaseDto {

  private String name;

  private String messageKey;

  private Integer timeOffset;

  private UUID visitTypeId;

  private Boolean sendForActualDate;
}
