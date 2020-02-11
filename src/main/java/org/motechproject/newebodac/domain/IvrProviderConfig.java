package org.motechproject.newebodac.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpMethod;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "ivr_provider_config")
@SuppressWarnings("PMD.TooManyFields")
public class IvrProviderConfig extends BaseEntity {

  @NotBlank
  @Column(name = "provider_name", nullable = false, unique = true)
  private String providerName;

  @NotBlank
  @Column(name = "url", nullable = false)
  private String url;

  @NotNull
  @Column(name = "http_method", nullable = false)
  @Enumerated(EnumType.STRING)
  private HttpMethod httpMethod;

  @NotNull
  @Column(name = "auth_required", nullable = false)
  private Boolean authRequired;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @ElementCollection
  @Column(name = "param")
  @CollectionTable(name = "ivr_provider_config_url_params",
      joinColumns = @JoinColumn(name = "config_id"))
  private Set<String> urlParams = new HashSet<>();

  @NotNull
  @Column(name = "json_request", nullable = false)
  private Boolean jsonRequest = true;

  @OneToOne(mappedBy = "requestConfig", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private IvrJsonField requestFields;

  @ElementCollection
  @Column(name = "param")
  @CollectionTable(name = "ivr_provider_config_request_params",
      joinColumns = @JoinColumn(name = "config_id"))
  private Set<String> requestParams = new HashSet<>();

  @NotNull
  @Column(name = "json_response", nullable = false)
  private Boolean jsonResponse = true;

  @OneToOne(mappedBy = "responseConfig", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private IvrJsonField responseFields;

  @NotNull
  @Column(name = "json_callback", nullable = false)
  private Boolean jsonCallback = true;

  @Column(name = "timestamp_format")
  private String timestampFormat;

  @OneToOne(mappedBy = "callbackConfig", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private IvrJsonField callbackFields;

  @ElementCollection
  @Column(name = "param")
  @CollectionTable(name = "ivr_provider_config_callback_params",
      joinColumns = @JoinColumn(name = "config_id"))
  private Set<String> callbackParams = new HashSet<>();

  public IvrProviderConfig(UUID id) {
    super(id);
  }
}
