package org.motechproject.newebodac.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class VaccineeDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String vaccineeId;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String gender;

  @Getter
  @Setter
  private Integer age;

  @Getter
  @Setter
  private Integer yearOfBirth;

  @Getter
  @Setter
  private String phoneNumber;

  @Getter
  @Setter
  private String alternatePhoneNumber;

  @Getter
  @Setter
  private String preferredLanguageName;

  @Getter
  @Setter
  private String preferredLanguageId;

  @Getter
  @Setter
  private String address;

  @Getter
  @Setter
  private String groupName;

  @Getter
  @Setter
  private String groupId;

  @Getter
  @Setter
  private Set<ExtraFieldDto> extraFields;
}
