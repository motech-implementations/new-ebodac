package org.motechproject.newebodac.dto;

import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppSettingsDto extends BaseDto {

  private LocalTime ivrMessageTime;
}
