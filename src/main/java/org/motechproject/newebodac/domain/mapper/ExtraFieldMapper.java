package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.ExtraFieldDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExtraFieldMapper {

  ExtraFieldMapper INSTANCE = Mappers.getMapper(ExtraFieldMapper.class);

  List<ExtraFieldDto> toDtos(Iterable<ExtraField> extraFields);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "vaccinee", source = "vaccineeId")
  ExtraField fromDto(ExtraFieldDto extraFieldDto);

  @Mapping(target = "vaccineeId", source = "vaccinee.id")
  @Mapping(target = "visitId", source = "visit.id")
  @Mapping(target = "siteId", source = "site.id")
  @Mapping(target = "groupId", source = "group.id")
  @Mapping(target = "personId", source = "person.id")
  ExtraFieldDto toDto(ExtraField extraField);

  default Vaccinee toVaccinee(String vaccineeId) {
    if (vaccineeId == null || vaccineeId.isEmpty()) {
      return null;
    }

    return new Vaccinee(UUID.fromString(vaccineeId));
  }
}
