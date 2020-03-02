package org.motechproject.newebodac.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.motechproject.newebodac.domain.enums.FieldType;
import org.motechproject.newebodac.domain.enums.Operator;

@Getter
@Setter
@Entity
@Table(name = "search_condition")
public class Condition extends BaseEntity {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "field_config_id", nullable = false)
  private FieldConfig fieldConfig;

  @NotNull
  @Column(name = "operator", nullable = false)
  @Enumerated(EnumType.STRING)
  private Operator operator;

  @Column(name = "field_type", nullable = false)
  @Enumerated(EnumType.STRING)
  private FieldType fieldType;

  @Column(name = "text_val")
  private String textVal;

  @Column(name = "int_val")
  private Integer intVal;

  @Column(name = "float_val")
  private Double floatVal;

  @Column(name = "bool_val")
  private Boolean boolVal;

  @Column(name = "date_val")
  private LocalDate dateVal;

  @Column(name = "datetime_val")
  private LocalDateTime datetimeVal;

  @Type(type = "uuid-char")
  @Column(name = "id_val")
  private UUID idVal;

  @ManyToOne
  @JoinColumn(name = "app_settings_id")
  private AppSettings appSettings;
}
