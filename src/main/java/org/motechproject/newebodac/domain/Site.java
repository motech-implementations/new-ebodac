package org.motechproject.newebodac.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "site")
public class Site extends BaseEntity {

  @Column(name = "site_id")
  private String siteId;

  @Column(name = "description")
  private String description;

  @OneToMany(mappedBy = "site")
  private Set<Visit> visits;

  @OneToMany(mappedBy = "site", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
      CascadeType.REMOVE}, orphanRemoval = true)
  private Set<ExtraField> extraFields = new HashSet<>();

  public Site(UUID id) {
    super(id);
  }
}
