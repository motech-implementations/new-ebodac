package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.dto.CampaignMessageDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CampaignMessageMapper extends EntityMapper<CampaignMessageDto, CampaignMessage> {

  CampaignMessageMapper INSTANCE = Mappers.getMapper(CampaignMessageMapper.class);

  @Override
  @Mapping(target = "visitTypeId", source = "visitType.id")
  CampaignMessageDto toDto(CampaignMessage campaignMessage);

  @Override
  @Mapping(target = "id", ignore = true)
  CampaignMessage fromDto(CampaignMessageDto campaignMessageDto);
}
