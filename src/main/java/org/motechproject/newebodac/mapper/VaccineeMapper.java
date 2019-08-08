package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.VaccineeDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VaccineeMapper extends EntityMapper<VaccineeDto, Vaccinee> {

  VaccineeMapper INSTANCE = Mappers.getMapper(VaccineeMapper.class);

  @Override
  @Mapping(target = "groupId", source = "group.id")
  @Mapping(target = "preferredLanguageId", source = "preferredLanguage.id")
  VaccineeDto toDto(Vaccinee vaccinee);

  @Override
  @Mapping(target = "id", ignore = true)
  Vaccinee fromDto(VaccineeDto vaccineeDto);
}
