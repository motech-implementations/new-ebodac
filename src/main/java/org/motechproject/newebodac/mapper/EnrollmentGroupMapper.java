package org.motechproject.newebodac.mapper;

import java.util.Set;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;

@Mapper(uses = { ExtraFieldMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EnrollmentGroupMapper extends EntityMapper<EnrollmentGroupDto, EnrollmentGroup> {

  EnrollmentGroupMapper INSTANCE = Mappers.getMapper(EnrollmentGroupMapper.class);

  @Override
  @Mapping(target = "vaccinees", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  EnrollmentGroup fromDto(EnrollmentGroupDto enrollmentGroupDto);

  @Mapping(target = "vaccinees", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(EnrollmentGroupDto enrollmentGroupDto,
      @MappingTarget EnrollmentGroup enrollmentGroup);

  /**
   * Attaches this group to all extra fields id.
   * @param enrollmentGroupDto Dto of group.
   * @param enrollmentGroup Mapped group.
   */
  @AfterMapping
  default void afterMappingFromDto(EnrollmentGroupDto enrollmentGroupDto,
      @MappingTarget EnrollmentGroup enrollmentGroup) {
    Set<ExtraField> extraFieldList = enrollmentGroup.getExtraFields();
    for (ExtraField extraField : extraFieldList) {
      extraField.setGroup(enrollmentGroup);
      extraField.setEntity(EntityType.GROUP);
    }
  }
}
