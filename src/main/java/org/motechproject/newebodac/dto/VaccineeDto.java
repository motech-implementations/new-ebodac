package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
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

  private UUID preferredLanguageId;

  private String address;

  private UUID groupId;

  private Set<ExtraFieldDto> extraFields = new HashSet<>();
}
