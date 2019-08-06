package org.motechproject.newebodac.domain.security;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "user_log")
public class UserLog extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  public User user;

  @Column(name = "login_date")
  private LocalDateTime loginDate;

  @Column(name = "logout_date")
  private LocalDateTime logoutDate;
}
