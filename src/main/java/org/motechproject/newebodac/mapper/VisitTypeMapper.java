package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitTypeMapper extends EntityMapper<VisitTypeDto, VisitType> {

  VisitTypeMapper INSTANCE = Mappers.getMapper(VisitTypeMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  VisitType fromDto(VisitTypeDto visitTypeDto);
}
