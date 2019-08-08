package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

@Getter
@Setter
public class FieldConfigDto {

  @Uuid
  private String id;

  private String name;

  private String displayName;

  private String type;

  private String entity;

  private Boolean base;

  private Boolean required;

  private Boolean hidden;

  private Integer order;

  private String format;
}
