package org.motechproject.newebodac.domain;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;

@Getter
@Setter
@Entity
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
}
