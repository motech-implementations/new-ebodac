package org.motechproject.newebodac.domain;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "visit")
public class Visit extends BaseEntity {

  @Column(name = "date")
  private LocalDate date;

  @Column(name = "planned_date")
  private LocalDate plannedDate;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "visit_type_id", nullable = false)
  private VisitType type;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "vaccinee_id", nullable = false)
  private Vaccinee vaccinee;

  @NotNull
  @Column(name = "status", nullable = false)
  @Enumerated(EnumType.STRING)
  private EnrollmentStatus status = EnrollmentStatus.NOT_ENROLLED;

  @ManyToOne
  @JoinColumn(name = "site_id")
  private Site site;

  @OneToMany(mappedBy = "visit", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<ExtraField> extraFields = new HashSet<>();

  public Visit(UUID id) {
    super(id);
  }
}
