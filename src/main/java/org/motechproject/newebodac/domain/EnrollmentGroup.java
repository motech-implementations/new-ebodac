package org.motechproject.newebodac.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "enrollment_group")
public class EnrollmentGroup extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @OneToMany(mappedBy = "group")
  private Set<Vaccinee> vaccinees;

  @OneToMany(mappedBy = "group", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<ExtraField> extraFields = new HashSet<>();

  public EnrollmentGroup(UUID id) {
    super(id);
  }
}
