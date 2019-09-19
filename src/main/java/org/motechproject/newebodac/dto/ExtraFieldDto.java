package org.motechproject.newebodac.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExtraFieldDto extends BaseDto {

  private String name;

  private String textVal;

  private String longTextVal;

  private Integer intVal;

  private Double floatVal;

  private Boolean boolVal;

  private LocalDate dateVal;

  private LocalDateTime datetimeVal;

  private String vaccineeId;

  private String visitId;

  private String siteId;

  private String groupId;

  private String personId;
}
