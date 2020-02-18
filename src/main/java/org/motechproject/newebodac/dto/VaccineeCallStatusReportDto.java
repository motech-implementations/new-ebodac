package org.motechproject.newebodac.dto;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineeCallStatusReportDto extends BaseDto {

  private UUID receiver;

  private String messageKey;

  private LocalDateTime sendDate;

  private LocalDateTime receivedDate;

  private Double callDuration;

  private Double messagePercentListened;

  private Double messageTimeListened;

  private Double expectedDuration;

  private Integer numberOfAttempts;

  private String smsStatus;

  private LocalDateTime smsReceivedDate;
}
