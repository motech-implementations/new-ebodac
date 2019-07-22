package org.motechproject.newebodac.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "visit_type")
public class VisitType extends BaseEntity {

  @NotBlank
  @Column(name = "name", unique = true, nullable = false)
  private String name;

  @NotBlank
  @Column(name = "display_name", nullable = false)
  private String displayName;

  @Column(name = "time_offset")
  private Integer timeOffset;

  @Column(name = "earliest_offset")
  private Integer earliestOffset;

  @Column(name = "latest_offset")
  private Integer latestOffset;

  @OneToMany(mappedBy = "visitType")
  private Set<CampaignMessage> messages;
}
