package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitTypeMapper {
  VisitTypeMapper INSTANCE = Mappers.getMapper(VisitTypeMapper.class);

  VisitType fromDto(VisitTypeDto visitTypeDto);

  VisitTypeDto toDto(VisitType visitType);

  List<VisitTypeDto> toDtos(Iterable<VisitType> visitTypes);
}
