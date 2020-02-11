package org.motechproject.newebodac.domain;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "ivr_call")
public class IvrCall extends BaseEntity {

  @Column(name = "provider_call_id", unique = true)
  private String providerCallId;

  @Column(name = "receiver_id")
  private String receiverId;

  @Column(name = "phone")
  private String phone;

  @Column(name = "message_key")
  private String messageKey;

  @OneToMany(mappedBy = "ivrCall")
  private Set<CallDetail> callDetails = new HashSet<>();

  @ElementCollection
  @CollectionTable(name = "ivr_call_extra_params",
      joinColumns = @JoinColumn(name = "ivr_call_id"))
  @Column(name = "param_value")
  @MapKeyColumn(name = "param_name")
  private Map<String, String> extraParams;

  /**
   * Create new Ivr Call.
   */
  public IvrCall(String providerCallId, String phone, String receiverId, String messageKey,
      Map<String, String> extraParams) {
    this.providerCallId = providerCallId;
    this.phone = phone;
    this.receiverId = receiverId;
    this.messageKey = messageKey;
    this.extraParams = extraParams;
  }
}
