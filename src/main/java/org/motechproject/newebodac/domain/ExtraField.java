package org.motechproject.newebodac.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "extra_field")
public class ExtraField extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "value")
  private String value;

  @ManyToOne
  @JoinColumn(name = "vaccinee_id")
  private Vaccinee vaccinee;

  @ManyToOne
  @JoinColumn(name = "visit_id")
  private Visit visit;

  @ManyToOne
  @JoinColumn(name = "site_id")
  private Site site;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private EnrollmentGroup group;

  @ManyToOne
  @JoinColumn(name = "person_id")
  private KeyCommunityPerson person;
}
