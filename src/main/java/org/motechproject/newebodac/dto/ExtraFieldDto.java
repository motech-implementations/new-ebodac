package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class ExtraFieldDto {

  @Uuid
  private String id;

  private String name;

  private String textVal;

  private String longTextVal;

  private Integer intVal;

  private Double floatVal;

  private Boolean boolVal;

  private String dateVal;

  private String datetimeVal;

  private String vaccineeId;

  private String visitId;

  private String siteId;

  private String groupId;

  private String personId;
}
