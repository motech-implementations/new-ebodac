package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "site")
public class Site extends BaseEntity {

  @Column(name = "site_id")
  private String siteId;

  @Column(name = "description")
  private String description;

  @OneToMany(mappedBy = "site")
  private Set<Visit> visits;

  @OneToMany(mappedBy = "site")
  private Set<ExtraField> extraFields;
}
