package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnrollmentGroupDto extends BaseDto {

  private String name;

  private Set<ExtraFieldDto> extraFields;
}
