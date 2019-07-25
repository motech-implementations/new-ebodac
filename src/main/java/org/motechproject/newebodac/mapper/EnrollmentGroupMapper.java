package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EnrollmentGroupMapper extends EntityMapper<EnrollmentGroupDto, EnrollmentGroup> {

  EnrollmentGroupMapper INSTANCE = Mappers.getMapper(EnrollmentGroupMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  EnrollmentGroup fromDto(EnrollmentGroupDto enrollmentGroupDto);
}
