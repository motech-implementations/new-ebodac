package org.motechproject.newebodac.dto;

import java.time.LocalDate;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VisitDto extends BaseDto {

  private LocalDate date;

  private LocalDate plannedDate;

  private String visitTypeId;

  private String vaccineeId;

  private String status;

  private String siteId;

  private Set<ExtraFieldDto> extraFields;
}
