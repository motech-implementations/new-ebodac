package org.motechproject.newebodac.mapper;

import java.util.Set;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.SiteDto;

@Mapper(uses = { ExtraFieldMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SiteMapper extends EntityMapper<SiteDto, Site> {

  SiteMapper INSTANCE = Mappers.getMapper(SiteMapper.class);


  @Override
  @Mapping(target = "visits", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  Site fromDto(SiteDto visitDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(SiteDto siteDto, @MappingTarget Site site);

  /**
   * Attaches this Site to all extra fields id.
   * @param siteDto Dto of Site.
   * @param site Mapped Site.
   */
  @AfterMapping
  default void afterMappingFromDto(SiteDto siteDto, @MappingTarget Site site) {
    Set<ExtraField> extraFieldList = site.getExtraFields();
    for (ExtraField extraField : extraFieldList) {
      extraField.setSite(site);
      extraField.setEntity(EntityType.SITE);
    }
  }
}
