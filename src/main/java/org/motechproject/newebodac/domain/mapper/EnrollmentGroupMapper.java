package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EnrollmentGroupMapper {

  EnrollmentGroupMapper INSTANCE = Mappers.getMapper(EnrollmentGroupMapper.class);

  List<EnrollmentGroupDto> toDtos(Iterable<EnrollmentGroup> enrollmentGroups);

  @Mapping(target = "id", ignore = true)
  EnrollmentGroup fromDto(EnrollmentGroupDto enrollmentGroupDto);

  EnrollmentGroupDto toDto(EnrollmentGroup enrollmentGroup);
}
