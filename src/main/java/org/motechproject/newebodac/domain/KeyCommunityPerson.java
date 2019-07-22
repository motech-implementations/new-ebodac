package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "key_community_person")
public class KeyCommunityPerson extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "phone")
  private String phone;

  @Column(name = "community")
  private String community;

  @ManyToOne
  @JoinColumn(name = "language_id")
  private Language language;

  @OneToMany(mappedBy = "person")
  private Set<ExtraField> extraFields;
}
