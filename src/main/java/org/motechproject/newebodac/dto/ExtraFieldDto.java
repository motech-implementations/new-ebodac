package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.Uuid;

public class ExtraFieldDto {
  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String value;

  @Getter
  @Setter
  private String vaccineeId;

  @Getter
  @Setter
  private String visitId;

  @Getter
  @Setter
  private String siteId;

  @Getter
  @Setter
  private String groupId;

  @Getter
  @Setter
  private String personId;
}
