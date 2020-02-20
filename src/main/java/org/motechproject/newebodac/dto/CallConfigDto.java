package org.motechproject.newebodac.dto;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.CallDetailFields;
import org.motechproject.newebodac.domain.enums.IvrCallFields;

@Getter
@Setter
public class CallConfigDto extends BaseDto {

  private String name;

  private UUID ivrProviderConfig;

  private Map<String, String> urlParamsMap = new HashMap<>();

  private Map<String, String> requestParamsMap = new HashMap<>();

  private Map<IvrCallFields, String> responseParamsMap = new HashMap<>();

  private Map<CallDetailFields, String> callbackParamsMap = new HashMap<>();

  private Set<IdValueMapDto> languageMap = new HashSet<>();

  private Set<IdValueMapDto> messageKeyMap = new HashSet<>();

  private Set<StringValueMapDto> callStatusMap = new HashSet<>();

  private Set<UUID> entityFields = new HashSet<>();

  private Set<String> groupByFields = new HashSet<>();
}
