package org.motechproject.newebodac.domain.security;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Entity
@Table(name = "user_permission")
public class UserPermission extends BaseEntity {

  @Column(name = "name", nullable = false)
  @Getter
  @Setter
  @NotBlank
  private String name;

  @Column(name = "display_name")
  @Getter
  @Setter
  private String displayName;

  @Column(name = "readonly", nullable = false)
  @Getter
  @Setter
  private Boolean readonly = false;
}
