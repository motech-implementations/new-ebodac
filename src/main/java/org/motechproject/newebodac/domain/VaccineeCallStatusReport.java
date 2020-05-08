package org.motechproject.newebodac.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.SmsStatus;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "vaccinee_call_status_report")
public class VaccineeCallStatusReport extends BaseEntity {

  @NotBlank
  @Column(name = "provider_call_id", nullable = false)
  private String providerCallId;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "receiver_id", nullable = false)
  private Vaccinee receiver;

  @Column(name = "message_key")
  private String messageKey;

  @Column(name = "send_date")
  private LocalDateTime sendDate;

  @Column(name = "received_date")
  private LocalDateTime receivedDate;

  @Column(name = "call_duration")
  private Double callDuration;

  @Column(name = "message_percent_listened")
  private Double messagePercentListened;

  @Column(name = "message_time_listened")
  private Double messageTimeListened;

  @Column(name = "expected_duration")
  private Double expectedDuration;

  @Column(name = "number_of_attempts")
  private Integer numberOfAttempts;

  @NotNull
  @Column(name = "sms_status", nullable = false)
  @Enumerated(EnumType.STRING)
  private SmsStatus smsStatus;

  @Column(name = "sms_received_date")
  private LocalDateTime smsReceivedDate;

  @Column(name = "sms_not_received")
  private Boolean smsNotReceived = false;

  public VaccineeCallStatusReport(Vaccinee receiver, String providerCallId) {
    this.receiver = receiver;
    this.providerCallId = providerCallId;
  }
}
