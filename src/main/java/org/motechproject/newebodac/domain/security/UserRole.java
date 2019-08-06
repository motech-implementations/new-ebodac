package org.motechproject.newebodac.domain.security;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Entity
@Table(name = "user_role")
public class UserRole extends BaseEntity {

  @Column(name = "name", nullable = false, unique = true)
  @Getter
  @Setter
  @NotBlank
  private String name;

  @Column(name = "readonly", nullable = false)
  @Getter
  @Setter
  private Boolean readonly = false;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
      name = "user_role_permissions",
      joinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(
          name = "permission_id", referencedColumnName = "id"))
  @Getter
  @Setter
  @Valid
  private Set<UserPermission> permissions = new HashSet<>();
}
