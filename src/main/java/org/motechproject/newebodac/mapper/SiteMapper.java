package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.dto.SiteDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SiteMapper extends EntityMapper<SiteDto, Site> {

  SiteMapper INSTANCE = Mappers.getMapper(SiteMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  Site fromDto(SiteDto visitDto);
}
