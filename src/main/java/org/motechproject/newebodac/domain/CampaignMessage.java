package org.motechproject.newebodac.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.motechproject.newebodac.domain.enums.VisitDateType;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "campaign_message")
public class CampaignMessage extends BaseEntity {

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @NotBlank
  @Column(name = "message_key", nullable = false)
  private String messageKey;

  @NotNull
  @Column(name = "time_offset", nullable = false)
  private Integer timeOffset;

  @NotNull
  @Column(name = "related_date", nullable = false)
  @Enumerated(EnumType.STRING)
  private VisitDateType relatedDate;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "visit_type_id", nullable = false)
  private VisitType visitType;

}
