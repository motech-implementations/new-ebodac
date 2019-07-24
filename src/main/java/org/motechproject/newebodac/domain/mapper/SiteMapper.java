package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.dto.SiteDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SiteMapper {

  SiteMapper INSTANCE = Mappers.getMapper(SiteMapper.class);

  SiteDto toDto(Site site);

  @Mapping(target = "id", ignore = true)
  Site fromDto(SiteDto visitDto);

  List<SiteDto> toDtos(Iterable<Site> sites);
}
