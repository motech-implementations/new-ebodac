package org.motechproject.newebodac.domain;

import java.util.Map;
import java.util.UUID;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "csv_field")
public class CsvField extends BaseEntity {

  @NotBlank
  @Column(name = "field_name", nullable = false)
  private String fieldName;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "field_config_id", nullable = false)
  private FieldConfig fieldConfig;

  @Column(name = "format")
  private String format;

  @Column(name = "default_value")
  private String defaultValue;

  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(name = "csv_field_value_map", joinColumns = @JoinColumn(name = "csv_field_id"))
  @Column(name = "mapped_entity")
  @MapKeyColumn(name = "field_value")
  private Map<String, UUID> fieldValueMap;
}
