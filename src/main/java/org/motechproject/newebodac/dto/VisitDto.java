package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class VisitDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String date;

  @Getter
  @Setter
  private String plannedDate;

  @Getter
  @Setter
  private String visitTypeId;

  @Getter
  @Setter
  private String vaccineeId;

  @Getter
  @Setter
  private String status;

  @Getter
  @Setter
  private String siteId;

  @Getter
  @Setter
  private Set<ExtraFieldDto> extraFields;
}
