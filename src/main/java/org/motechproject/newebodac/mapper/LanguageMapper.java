package org.motechproject.newebodac.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.dto.LanguageDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LanguageMapper {

  LanguageMapper INSTANCE = Mappers.getMapper(LanguageMapper.class);

  List<LanguageDto> toDtos(Iterable<Language> languages);

  @Mapping(target = "id", ignore = true)
  Language fromDto(LanguageDto userDto);

  LanguageDto toDto(Language language);
}
