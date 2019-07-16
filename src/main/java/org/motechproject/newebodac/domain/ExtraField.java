package org.motechproject.newebodac.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

  @NotNull
  @ManyToOne
  @JoinColumn(name = "vaccinee_id", nullable = false)
  private Vaccinee vaccinee;
}
