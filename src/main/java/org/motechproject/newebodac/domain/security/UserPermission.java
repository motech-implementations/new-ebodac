package org.motechproject.newebodac.domain.security;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "user_permission")
public class UserPermission extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "display_name")
  private String displayName;

  @Column(name = "readonly", nullable = false)
  private Boolean readonly = false;

  public UserPermission(UUID id) {
    super(id);
  }
}
