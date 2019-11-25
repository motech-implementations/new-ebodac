package org.motechproject.newebodac.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.EntityType;

@Getter
@Setter
@Entity
@Table(name = "json_config")
public class JsonConfig extends BaseEntity {

  @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<JsonField> jsonFields = new HashSet();

  @NotNull
  @Column(name = "entity", nullable = false)
  @Enumerated(EnumType.STRING)
  private EntityType entity;

  @Column(name = "name", nullable = false)
  private String name;
}
