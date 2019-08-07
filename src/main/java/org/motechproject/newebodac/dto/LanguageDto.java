package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class LanguageDto {

  @Uuid
  private String id;

  private String name;

  private String code;
}
