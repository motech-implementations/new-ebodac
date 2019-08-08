package org.motechproject.newebodac.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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

  @Column(name = "text_val")
  private String textVal;

  @Lob
  @Column(name = "long_text_val")
  private String longTextVal;

  @Column(name = "int_val")
  private Integer intVal;

  @Column(name = "float_val")
  private Double floatVal;

  @Column(name = "bool_val")
  private Boolean boolVal;

  @Column(name = "date_val")
  private LocalDate dateVal;

  @Column(name = "datetime_val")
  private LocalDateTime datetimeVal;

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
