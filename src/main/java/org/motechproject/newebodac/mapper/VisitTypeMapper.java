package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitTypeMapper extends EntityMapper<VisitTypeDto, VisitType> {

  VisitTypeMapper INSTANCE = Mappers.getMapper(VisitTypeMapper.class);

  @Mapping(target = "messages", source = "messageIds")
  @Override
  @Mapping(target = "id", ignore = true)
  VisitType fromDto(VisitTypeDto visitTypeDto);

  @Mapping(target = "messageIds", source = "messages")
  @Override
  VisitTypeDto toDto(VisitType visitType);

  default CampaignMessage toCampaignMessage(UUID id) {
    return new CampaignMessage(id);
  }

  default UUID toUuid(CampaignMessage campaignMessage) {
    return campaignMessage.getId();
  }
}
