package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.Gender;

@Getter
@Setter
@Entity
@Table(name = "vaccinee")
public class Vaccinee extends BaseEntity {

  @NotBlank
  @Column(name = "vaccinee_id", nullable = false)
  private String vaccineeId;

  @Column(name = "name")
  private String name;

  @Column(name = "gender")
  @Enumerated(EnumType.STRING)
  private Gender gender;

  @Column(name = "age")
  private Integer age;

  @Column(name = "year_of_birth")
  private Integer yearOfBirth;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "alternate_phone_number")
  private String alternatePhoneNumber;

  @ManyToOne
  @JoinColumn(name = "language_id")
  private Language preferredLanguage;

  @Column(name = "address")
  private String address;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private EnrollmentGroup group;

  @OneToMany(mappedBy = "vaccinee")
  private Set<Visit> visits;

  @OneToMany(mappedBy = "vaccinee")
  private Set<ExtraField> extraFields;
}