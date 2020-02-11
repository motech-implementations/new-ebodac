package org.motechproject.newebodac.dto;

import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IvrJsonFieldDto extends BaseDto {

  private String fieldName;

  private String fieldType;

  private UUID requestConfig;

  private UUID responseConfig;

  private UUID callbackConfig;

  private Set<IvrJsonFieldDto> childFields;

}
