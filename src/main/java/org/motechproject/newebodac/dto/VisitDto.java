package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class VisitDto {

  @Uuid
  private String id;

  private String date;

  private String plannedDate;

  private String visitTypeId;

  private String vaccineeId;

  private String status;

  private String siteId;

  private Set<ExtraFieldDto> extraFields;
}
