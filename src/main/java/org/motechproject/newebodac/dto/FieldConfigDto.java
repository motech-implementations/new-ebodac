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

  private String fieldType;

  private String entity;

  private String relatedEntity;

  private String relatedField;

  private Boolean base;

  private Boolean required;

  private Boolean hidden;

  private Boolean filterable;

  private Boolean editable;

  private Integer fieldOrder;

  private String format;
}
