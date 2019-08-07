package org.motechproject.newebodac.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.domain.enums.FieldType;

@Getter
@Setter
@Entity
@Table(name = "field_config")
public class FieldConfig extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @NotBlank
  @Column(name = "display_name", nullable = false)
  private String displayName;

  @NotNull
  @Column(name = "field_type", nullable = false)
  @Enumerated(EnumType.STRING)
  private FieldType fieldType;

  @NotNull
  @Column(name = "entity", nullable = false)
  @Enumerated(EnumType.STRING)
  private EntityType entity;

  @Column(name = "related_entity")
  @Enumerated(EnumType.STRING)
  private EntityType relatedEntity;

  @Column(name = "related_field")
  private String relatedField;

  @NotNull
  @Column(name = "base", nullable = false)
  private Boolean base = false;

  @NotNull
  @Column(name = "required", nullable = false)
  private Boolean required = false;

  @NotNull
  @Column(name = "hidden", nullable = false)
  private Boolean hidden = false;

  @NotNull
  @Column(name = "sort_order", nullable = false)
  private Integer sortOrder;

  @Column(name = "format")
  private String format;
}
