package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.JsonFieldType;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "ivr_json_field")
public class IvrJsonField extends BaseEntity {

  @Column(name = "field_name")
  private String fieldName;

  @NotNull
  @Column(name = "field_type", nullable = false)
  @Enumerated(EnumType.STRING)
  private JsonFieldType fieldType;

  @OneToOne
  @JoinColumn(name = "request_config_id")
  private IvrProviderConfig requestConfig;

  @OneToOne
  @JoinColumn(name = "response_config_id")
  private IvrProviderConfig responseConfig;

  @OneToOne
  @JoinColumn(name = "callback_config_id")
  private IvrProviderConfig callbackConfig;

  @OneToOne
  @JoinColumn(name = "parent_id")
  private IvrJsonField parentField;

  @OneToMany(mappedBy = "parentField", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<IvrJsonField> childFields;
}
