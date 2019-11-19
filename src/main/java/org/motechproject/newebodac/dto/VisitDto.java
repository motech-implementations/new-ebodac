package org.motechproject.newebodac.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VisitDto extends BaseDto {

  private LocalDate date;

  private LocalDate plannedDate;

  private UUID type;

  private UUID vaccinee;

  private String status;

  private UUID site;

  private Set<ExtraFieldDto> extraFields = new HashSet<>();
}
