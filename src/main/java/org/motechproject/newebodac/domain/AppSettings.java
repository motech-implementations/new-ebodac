package org.motechproject.newebodac.domain;

import java.time.LocalTime;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "application_settings")
public class AppSettings extends BaseEntity {

  @NotNull
  @Column(name = "send_ivr_messages", nullable = false)
  private Boolean sendIvrMessages = true;

  @Column(name = "call_config_name")
  private String callConfigName;

  @Column(name = "ivr_message_time")
  private LocalTime ivrMessageTime;

  public AppSettings(UUID id) {
    super(id);
  }
}
