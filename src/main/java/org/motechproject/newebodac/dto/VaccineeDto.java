package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.Uuid;

public class VaccineeDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String gender;

  @Getter
  @Setter
  private Integer yearOfBirth;
}
