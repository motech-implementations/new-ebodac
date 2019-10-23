package org.motechproject.newebodac.mapper;

import java.util.Set;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.VisitDto;

@Mapper(uses = { ExtraFieldMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitMapper extends EntityMapper<VisitDto, Visit> {

  VisitMapper INSTANCE = Mappers.getMapper(VisitMapper.class);

  @Override
  @Mapping(target = "visitTypeId", source = "type.id")
  @Mapping(target = "vaccineeId", source = "vaccinee.id")
  @Mapping(target = "siteId", source = "site.id")
  VisitDto toDto(Visit visit);

  @Override
  @Mapping(target = "id", ignore = true)
  Visit fromDto(VisitDto visitDto);

  /**
   * Attaches this Visit to all extra fields id.
   * @param visitDto Dto of Visit.
   * @param visit Mapped Visit.
   */
  @AfterMapping
  default void afterMappingFromDto(VisitDto visitDto, @MappingTarget Visit visit) {
    Set<ExtraField> extraFieldList = visit.getExtraFields();
    for (ExtraField extraField : extraFieldList) {
      extraField.setVisit(visit);
      extraField.setEntity(EntityType.VISIT);
    }
  }
}
