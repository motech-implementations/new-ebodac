package org.motechproject.newebodac.domain.security;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User extends BaseEntity {

  @Column(name = "username", nullable = false, unique = true)
  private String username;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "email", unique = true)
  private String email;

  @Column(name = "name")
  private String name;
}
