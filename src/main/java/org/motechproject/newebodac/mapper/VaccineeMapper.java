package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.VaccineeDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VaccineeMapper extends EntityMapper<VaccineeDto, Vaccinee> {

  VaccineeMapper INSTANCE = Mappers.getMapper(VaccineeMapper.class);

  @Mapping(target = "preferredLanguage", source = "preferredLanguageId")
  @Mapping(target = "group", source = "groupId")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(VaccineeDto vaccineeDto, @MappingTarget Vaccinee vaccinee);

  @Override
  @Mapping(target = "groupId", source = "group.id")
  @Mapping(target = "preferredLanguageId", source = "preferredLanguage.id")
  VaccineeDto toDto(Vaccinee vaccinee);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "group", source = "groupId")
  @Mapping(target = "preferredLanguage", source = "preferredLanguageId")
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)

  Vaccinee fromDto(VaccineeDto vaccineeDto);

  /**
   * Maps uuid to Language object. Returns null if the id is null.
   * @param id id of Language
   * @return Language with set id
   */
  default Language toPreferredLanguage(UUID id) {
    if (id != null) {
      return new Language(id);
    }
    return null;
  }

  /**
   * Maps uuid to EnrollmentGroup object. Returns null if the id is null.
   * @param id id of Language
   * @return EnrollmentGroup with set id
   */
  default EnrollmentGroup toGroup(UUID id) {
    if (id != null) {
      return new EnrollmentGroup(id);
    }
    return null;
  }
}
