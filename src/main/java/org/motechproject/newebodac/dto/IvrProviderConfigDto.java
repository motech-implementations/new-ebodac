package org.motechproject.newebodac.dto;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@SuppressWarnings("PMD.TooManyFields")
public class IvrProviderConfigDto extends BaseDto {

  private String providerName;

  private String url;

  private String httpMethod;

  private Boolean authRequired = false;

  private String username;

  private String password;

  private Set<String> urlParams = new HashSet<>();

  private Boolean jsonRequest = false;

  private IvrJsonFieldDto requestFields;

  private Set<String> requestParams = new HashSet<>();

  private Boolean jsonResponse = false;

  private IvrJsonFieldDto responseFields;

  private Boolean jsonCallback = false;

  private String timestampFormat;

  private IvrJsonFieldDto callbackFields;

  private Set<String> callbackParams = new HashSet<>();
}
