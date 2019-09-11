package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaccineeDto extends BaseDto {

  private String vaccineeId;

  private String name;

  private String gender;

  private Integer age;

  private Integer yearOfBirth;

  private String phoneNumber;

  private String alternatePhoneNumber;

  private String preferredLanguageId;

  private String address;

  private String groupId;

  private Set<ExtraFieldDto> extraFields;
}
