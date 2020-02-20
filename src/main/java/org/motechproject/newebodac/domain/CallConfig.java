package org.motechproject.newebodac.domain;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.MapKeyEnumerated;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.MapKeyType;
import org.hibernate.annotations.Type;
import org.motechproject.newebodac.domain.enums.CallDetailFields;
import org.motechproject.newebodac.domain.enums.CallStatus;
import org.motechproject.newebodac.domain.enums.IvrCallFields;

@Getter
@Setter
@Entity
@Table(name = "call_config")
public class CallConfig extends BaseEntity {

  private static final String CONFIG_ID = "config_id";
  private static final String PARAM_VALUE = "param_value";

  @NotBlank
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "provider_config_id", nullable = false)
  private IvrProviderConfig ivrProviderConfig;

  @ElementCollection
  @CollectionTable(name = "call_config_url_params_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = PARAM_VALUE)
  @MapKeyColumn(name = "url_param")
  private Map<String, String> urlParamsMap;

  @ElementCollection
  @CollectionTable(name = "call_config_request_params_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = PARAM_VALUE)
  @MapKeyColumn(name = "request_param")
  private Map<String, String> requestParamsMap;

  @ElementCollection
  @CollectionTable(name = "call_config_response_params_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = PARAM_VALUE)
  @MapKeyColumn(name = "response_param")
  @MapKeyEnumerated(EnumType.STRING)
  private Map<IvrCallFields, String> responseParamsMap;

  @ElementCollection
  @CollectionTable(name = "call_config_callback_params_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = PARAM_VALUE)
  @MapKeyColumn(name = "callback_param")
  @MapKeyEnumerated(EnumType.STRING)
  private Map<CallDetailFields, String> callbackParamsMap;

  @ElementCollection
  @CollectionTable(name = "call_config_language_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = "ivr_language_id", nullable = false)
  @MapKeyColumn(name = "language_id")
  @MapKeyType(@Type(type = "uuid-char"))
  private Map<UUID, String> languageMap;

  @ElementCollection
  @CollectionTable(name = "call_config_message_key_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = "ivr_message_id", nullable = false)
  @MapKeyColumn(name = "message_key")
  @MapKeyType(@Type(type = "uuid-char"))
  private Map<UUID, String> messageKeyMap;

  @ElementCollection
  @CollectionTable(name = "call_config_status_map",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = "call_status", nullable = false)
  @Enumerated(EnumType.STRING)
  @MapKeyColumn(name = "ivr_call_status")
  private Map<String, CallStatus> callStatusMap = new HashMap<>();

  @ManyToMany
  @JoinTable(
      name = "call_config_entity_fields",
      joinColumns = @JoinColumn(
          name = "call_config_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(
          name = "field_config_id", referencedColumnName = "id"))
  private Set<FieldConfig> entityFields = new HashSet<>();

  @ElementCollection
  @CollectionTable(name = "call_config_group_by_fields",
      joinColumns = @JoinColumn(name = CONFIG_ID))
  @Column(name = "field_name")
  private Set<String> groupByFields = new HashSet<>();
}
