package org.motechproject.newebodac.domain;

import java.time.LocalDateTime;
import java.util.Map;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.CallStatus;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "call_detail")
public class CallDetail extends BaseEntity {

  @Column(name = "provider_call_id")
  private String providerCallId;

  @Column(name = "call_detail_id")
  private String callDetailId;

  @Column(name = "phone")
  private String phone;

  @NotNull
  @Column(name = "call_status", nullable = false)
  @Enumerated(EnumType.STRING)
  private CallStatus callStatus;

  @Column(name = "call_status_details")
  private String callStatusDetails;

  @Column(name = "start_timestamp")
  private LocalDateTime startTimestamp;

  @Column(name = "end_timestamp")
  private LocalDateTime endTimestamp;

  @Column(name = "number_of_attempts")
  private Integer numberOfAttempts;

  @Column(name = "call_duration")
  private Double callDuration;

  @Column(name = "message_percent_listened")
  private Double messagePercentListened;

  @Column(name = "message_time_listened")
  private Double messageTimeListened;

  @ManyToOne
  @JoinColumn(name = "ivr_call_id")
  private IvrCall ivrCall;

  @ElementCollection
  @CollectionTable(name = "call_detail_extra_params",
      joinColumns = @JoinColumn(name = "ivr_call_id"))
  @Column(name = "param_value")
  @MapKeyColumn(name = "param_name")
  private Map<String, String> extraParams;

  /**
   * Create new Call Detail.
   */
  @SuppressWarnings("PMD.ExcessiveParameterList")
  public CallDetail(String providerCallId, String callDetailId, String phone,
      @NotNull CallStatus callStatus, String callStatusDetails,
      LocalDateTime startTimestamp, LocalDateTime endTimestamp, Integer numberOfAttempts,
      Double callDuration, Double messagePercentListened, Double messageTimeListened,
      IvrCall ivrCall, Map<String, String> extraParams) {
    this.providerCallId = providerCallId;
    this.callDetailId = callDetailId;
    this.phone = phone;
    this.callStatus = callStatus;
    this.callStatusDetails = callStatusDetails;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.numberOfAttempts = numberOfAttempts;
    this.callDuration = callDuration;
    this.messagePercentListened = messagePercentListened;
    this.messageTimeListened = messageTimeListened;
    this.ivrCall = ivrCall;
    this.extraParams = extraParams;
  }
}
