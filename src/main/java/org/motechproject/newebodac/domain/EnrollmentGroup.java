package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "enrollment_group")
public class EnrollmentGroup extends BaseEntity {

  @Column(name = "name", nullable = false)
  private String name;

  @OneToMany(mappedBy = "group")
  private Set<Vaccinee> vaccinees;

  @OneToMany(mappedBy = "group")
  private Set<ExtraField> extraFields;
}
