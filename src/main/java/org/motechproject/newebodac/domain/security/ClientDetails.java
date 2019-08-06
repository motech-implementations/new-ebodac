package org.motechproject.newebodac.domain.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.util.StringUtils;

@Getter
@Setter
public class ClientDetails implements org.springframework.security.oauth2.provider.ClientDetails {

  private static final long serialVersionUID = 1L;

  private static final Logger LOGGER = LoggerFactory.getLogger(ClientDetails.class);

  private String clientId;

  private String clientSecret;

  private Set<String> scope;

  private Set<String> resourceIds;

  private Set<String> authorizedGrantTypes;

  private Set<String> registeredRedirectUris;

  private List<GrantedAuthority> authorities;

  private Integer accessTokenValiditySeconds;

  private Integer refreshTokenValiditySeconds;

  private Map<String, Object> additionalInformation = new LinkedHashMap<>();

  /** Initializes ClientDetails with properties from given client.
   *
   * @param client instance of custom Client
   */
  public ClientDetails(Client client) {
    this.clientId = client.getClientId();

    this.resourceIds = toSet(client.getResourceIds());
    this.scope = toSet(client.getScope());
    this.authorizedGrantTypes = toSet(client.getAuthorizedGrantTypes());
    this.authorities = toAuthorities(client.getAuthorities());
    this.registeredRedirectUris = toSet(client.getRegisteredRedirectUris());

    this.clientSecret = client.getClientSecret();
    this.accessTokenValiditySeconds = client.getAccessTokenValiditySeconds();
    this.refreshTokenValiditySeconds = client.getRefreshTokenValiditySeconds();

    String json = client.getAdditionalInformation();
    if (null != json) {
      try {
        this.additionalInformation = new ObjectMapper().readValue(json,
            new TypeReference<Map<String, Object>>() {});
      } catch (Exception ex) {
        LOGGER.warn("Could not decode JSON for additional information: " + this, ex);
      }
    }
  }

  private Set<String> toSet(String arg) {
    if (StringUtils.hasText(arg)) {
      Set<String> elements = StringUtils.commaDelimitedListToSet(arg);

      if (!elements.isEmpty()) {
        return elements;
      }
    }

    return null;
  }

  private List<GrantedAuthority> toAuthorities(String arg) {
    return StringUtils.hasText(arg)
        ? AuthorityUtils.commaSeparatedStringToAuthorityList(arg)
        : null;
  }

  @Override
  public boolean isSecretRequired() {
    return clientSecret != null && !clientSecret.isEmpty();
  }

  @Override
  public boolean isScoped() {
    return false;
  }

  @Override
  public Set<String> getRegisteredRedirectUri() {
    return registeredRedirectUris;
  }

  @Override
  public boolean isAutoApprove(String scope) {
    return false;
  }
}
