package org.motechproject.newebodac.domain;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "language")
public class Language extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @NotBlank
  @Column(name = "code", nullable = false, unique = true)
  private String code;

  public Language(UUID id) {
    super(id);
  }
}
