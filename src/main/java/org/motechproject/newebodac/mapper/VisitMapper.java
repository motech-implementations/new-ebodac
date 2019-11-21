package org.motechproject.newebodac.mapper;

import java.util.Set;
import java.util.UUID;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.VisitDto;

@Mapper(uses = { ExtraFieldMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VisitMapper extends EntityMapper<VisitDto, Visit> {

  VisitMapper INSTANCE = Mappers.getMapper(VisitMapper.class);

  @Override
  @Mapping(target = "type", source = "type.id")
  @Mapping(target = "vaccinee", source = "vaccinee.id")
  @Mapping(target = "site", source = "site.id")
  VisitDto toDto(Visit visit);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "status", ignore = true)
  Visit fromDto(VisitDto visitDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "status", ignore = true)
  void update(VisitDto visitDto, @MappingTarget Visit visit);

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

  /**
   * Maps uuid to Vaccinee object. Returns null if the id is null.
   * @param id id of Vaccinee
   * @return Vaccinee with set id
   */
  default Vaccinee toVaccinee(UUID id) {
    if (id != null) {
      return new Vaccinee(id);
    }
    return null;
  }

  /**
   * Maps uuid to Site object. Returns null if the id is null.
   * @param id id of Site
   * @return Site with set id
   */
  default Site toSite(UUID id) {
    if (id != null) {
      return new Site(id);
    }
    return null;
  }

  /**
   * Maps uuid to VisitType object. Returns null if the id is null.
   * @param id id of VisitType
   * @return VisitType with set id
   */
  default VisitType toVisitType(UUID id) {
    if (id != null) {
      return new VisitType(id);
    }
    return null;
  }
}
