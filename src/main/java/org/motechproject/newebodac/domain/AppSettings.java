package org.motechproject.newebodac.domain;

import java.time.LocalTime;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "application_settings")
public class AppSettings extends BaseEntity {

  @Column(name = "ivrMessageTime")
  private LocalTime ivrMessageTime;

  public AppSettings(UUID id) {
    super(id);
  }
}
