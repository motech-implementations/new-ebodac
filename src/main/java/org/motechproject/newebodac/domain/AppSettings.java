package org.motechproject.newebodac.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.ConditionsResolution;

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

  @Column(name = "enrollment_conditions_resolution")
  @Enumerated(EnumType.STRING)
  private ConditionsResolution enrollmentConditionsResolution;

  @OneToMany(mappedBy = "appSettings", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<Condition> enrollmentConditions = new HashSet<>();

  @NotNull
  @Column(name = "generate_reports", nullable = false)
  private Boolean generateReports = false;

  @Column(name = "reports_generation_time")
  private LocalTime reportsGenerationTime;

  @Column(name = "last_report_generation_date")
  private LocalDate lastReportGenerationDate;

}
