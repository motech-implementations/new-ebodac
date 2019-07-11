package org.motechproject.newebodac.domain.security;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseEntity {

  @Column(name = "username", nullable = false, unique = true)
  @Getter
  @Setter
  private String username;

  @Column(name = "password", nullable = false)
  @Getter
  @Setter
  private String password;

  @Column(name = "email", unique = true)
  @Getter
  @Setter
  private String email;

  @Column(name = "name")
  @Getter
  @Setter
  private String name;
}
