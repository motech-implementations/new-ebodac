package org.motechproject.newebodac.domain.security;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "user_role")
@NoArgsConstructor
public class UserRole extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "readonly", nullable = false)
  private Boolean readonly = false;

  @Valid
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
      name = "user_role_permissions",
      joinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(
          name = "permission_id", referencedColumnName = "id"))
  private Set<UserPermission> permissions = new HashSet<>();

  public UserRole(UUID id) {
    super(id);
  }
}
