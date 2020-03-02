package org.motechproject.newebodac.dto;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppSettingsDto extends BaseDto {

  private Boolean sendIvrMessages = false;

  private String callConfigName;

  private LocalTime ivrMessageTime;

  private String enrollmentConditionsResolution;

  private Set<ConditionDto> enrollmentConditions = new HashSet<>();

  private Boolean generateReports = false;

  private LocalTime reportsGenerationTime;
}
