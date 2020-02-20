package org.motechproject.newebodac.dto;

import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppSettingsDto extends BaseDto {

  private Boolean sendIvrMessages = false;

  private String callConfigName;

  private LocalTime ivrMessageTime;

  private Boolean generateReports = false;

  private LocalTime reportsGenerationTime;
}
