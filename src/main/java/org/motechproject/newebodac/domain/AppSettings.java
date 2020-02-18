package org.motechproject.newebodac.domain;

import java.time.LocalDate;
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
  private Boolean sendIvrMessages = false;

  @Column(name = "call_config_name")
  private String callConfigName;

  @Column(name = "ivr_message_time")
  private LocalTime ivrMessageTime;

  @NotNull
  @Column(name = "generate_reports", nullable = false)
  private Boolean generateReports = false;

  @Column(name = "reports_generation_time")
  private LocalTime reportsGenerationTime;

  @Column(name = "last_report_generation_date")
  private LocalDate lastReportGenerationDate;

  public AppSettings(UUID id) {
    super(id);
  }
}
