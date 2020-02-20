package org.motechproject.newebodac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FieldConfigDto extends BaseDto {

  private String name;

  private String displayName;

  private String fieldType;

  private String entity;

  private String relatedEntity;

  private String relatedField;

  private Boolean base = false;

  private Boolean required = false;

  private Boolean hidden = false;

  private Boolean filterable = true;

  private Boolean editable = true;

  private Integer fieldOrder;

  private String format;

  private String pattern;

  private Boolean uniqueField = false;
}
