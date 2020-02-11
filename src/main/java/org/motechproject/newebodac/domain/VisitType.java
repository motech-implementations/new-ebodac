package org.motechproject.newebodac.domain;

import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.VisitTypeCategory;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "visit_type")
public class VisitType extends BaseEntity {

  @NotBlank
  @Column(name = "name", unique = true, nullable = false)
  private String name;

  @NotBlank
  @Column(name = "display_name", nullable = false)
  private String displayName;

  @NotNull
  @Column(name = "category")
  @Enumerated(EnumType.STRING)
  private VisitTypeCategory category;

  @Column(name = "time_offset")
  private Integer timeOffset;

  @Column(name = "earliest_offset")
  private Integer earliestOffset;

  @Column(name = "latest_offset")
  private Integer latestOffset;

  @OneToMany(mappedBy = "visitType", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
  private Set<CampaignMessage> messages;

  @OneToMany(mappedBy = "type", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
  private Set<Visit> visits;

  public VisitType(UUID id) {
    super(id);
  }
}
