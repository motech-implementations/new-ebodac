package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
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
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  EnrollmentGroup fromDto(EnrollmentGroupDto enrollmentGroupDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(EnrollmentGroupDto enrollmentGroupDto,
      @MappingTarget EnrollmentGroup enrollmentGroup);
}
