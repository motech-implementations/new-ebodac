package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.VaccineeDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VaccineeMapper {

  VaccineeMapper INSTANCE = Mappers.getMapper(VaccineeMapper.class);

  @Mapping(target = "groupName", source = "group.name")
  @Mapping(target = "groupId", source = "group.id")
  @Mapping(target = "preferredLanguageName", source = "preferredLanguage.name")
  @Mapping(target = "preferredLanguageId", source = "preferredLanguage.id")
  VaccineeDto toDto(Vaccinee vaccinee);

  @Mapping(target = "id", ignore = true)
  Vaccinee fromDto(VaccineeDto vaccineeDto);

  List<VaccineeDto> toDtos(Iterable<Vaccinee> incharges);
}
