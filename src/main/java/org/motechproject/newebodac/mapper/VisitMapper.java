package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.dto.VisitDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitMapper extends EntityMapper<VisitDto, Visit> {

  VisitMapper INSTANCE = Mappers.getMapper(VisitMapper.class);

  @Override
  @Mapping(target = "visitTypeId", source = "type.id")
  @Mapping(target = "vaccineeId", source = "vaccinee.id")
  @Mapping(target = "siteId", source = "site.id")
  VisitDto toDto(Visit visit);

  @Override
  @Mapping(target = "id", ignore = true)
  Visit fromDto(VisitDto visitDto);
}
