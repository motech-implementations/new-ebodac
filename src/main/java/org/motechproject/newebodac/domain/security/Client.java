package org.motechproject.newebodac.domain.security;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {

  @Id
  @Column(name = "client_id")
  private String clientId;

  @Column(name = "client_secret")
  private String clientSecret;

  @Column(name = "scope")
  private String scope;

  @Column(name = "resource_ids")
  private String resourceIds;

  @NotBlank
  @Column(name = "authorized_grant_types", nullable = false)
  private String authorizedGrantTypes;

  @Column(name = "registered_redirect_uris")
  private String registeredRedirectUris;

  @NotBlank
  @Column(name = "authorities", nullable = false)
  private String authorities;

  @Column(name = "access_token_validity_seconds")
  private Integer accessTokenValiditySeconds;

  @Column(name = "refresh_token_validity_seconds")
  private Integer refreshTokenValiditySeconds;

  @Column(name = "additional_information")
  private String additionalInformation;
}
