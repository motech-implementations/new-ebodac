package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.dto.CampaignMessageDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CampaignMessageMapper {

  CampaignMessageMapper INSTANCE = Mappers.getMapper(CampaignMessageMapper.class);

  @Mapping(target = "visitTypeId", source = "visitType.id")
  CampaignMessageDto toDto(CampaignMessage campaignMessage);

  List<CampaignMessageDto> toDtos(Iterable<CampaignMessage> languages);

  @Mapping(target = "id", ignore = true)
  CampaignMessage fromDto(CampaignMessageDto campaignMessageDto);
}
