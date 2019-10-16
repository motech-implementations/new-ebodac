package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.domain.VisitType;
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
  @Mapping(target = "visitType", source = "visitTypeId")
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  CampaignMessage fromDto(CampaignMessageDto campaignMessageDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "visitType", source = "visitTypeId")
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(CampaignMessageDto campaignMessageDto,
      @MappingTarget CampaignMessage campaignMessage);

  /**
   * Maps uuid to VisitType object. Returns null if the id is null.
   * @param id id of VisitType
   * @return VisitType with set id
   */
  default VisitType toVisitType(UUID id) {
    if (id != null) {
      return new VisitType(id);
    }
    return null;
  }
}
