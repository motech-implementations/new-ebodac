package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.validate.annotations.Uuid;

public class FieldConfigDto {

  @Getter
  @Setter
  @Uuid
  private String id;

  @Getter
  @Setter
  private String name;

  @Getter
  @Setter
  private String displayName;

  @Getter
  @Setter
  private String type;

  @Getter
  @Setter
  private String entity;

  @Getter
  @Setter
  private Boolean base;

  @Getter
  @Setter
  private Boolean required;

  @Getter
  @Setter
  private Boolean hidden;

  @Getter
  @Setter
  private Integer order;

  @Getter
  @Setter
  private String format;
}
