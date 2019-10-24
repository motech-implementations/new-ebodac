package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.dto.LanguageDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LanguageMapper extends EntityMapper<LanguageDto, Language> {

  LanguageMapper INSTANCE = Mappers.getMapper(LanguageMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  Language fromDto(LanguageDto userDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(LanguageDto languageDto, @MappingTarget Language language);
}
