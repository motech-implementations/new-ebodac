package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.Uuid;

public class EnrollmentGroupDto {
  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private Set<VaccineeDto> vaccinees;

  @Getter
  @Setter
  private Set<ExtraFieldDto> extraFields;
}
