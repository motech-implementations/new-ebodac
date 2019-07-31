package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.dto.ExtraFieldDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExtraFieldMapper extends EntityMapper<ExtraFieldDto, ExtraField> {

  ExtraFieldMapper INSTANCE = Mappers.getMapper(ExtraFieldMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "vaccinee", source = "vaccineeId")
  ExtraField fromDto(ExtraFieldDto extraFieldDto);

  @Override
  @Mapping(target = "vaccineeId", source = "vaccinee.id")
  @Mapping(target = "visitId", source = "visit.id")
  @Mapping(target = "siteId", source = "site.id")
  @Mapping(target = "groupId", source = "group.id")
  @Mapping(target = "personId", source = "person.id")
  ExtraFieldDto toDto(ExtraField extraField);


  /**
   * Create Vaccinee object with given id.
   * @param vaccineeId id of vaccinee to create.
   * @return Vaccinee object with given id
   */
  default Vaccinee toVaccinee(String vaccineeId) {
    if (StringUtils.isBlank(vaccineeId)) {
      return null;
    }

    return new Vaccinee(UUID.fromString(vaccineeId));
  }
}