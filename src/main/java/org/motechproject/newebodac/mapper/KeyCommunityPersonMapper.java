package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface KeyCommunityPersonMapper
    extends EntityMapper<KeyCommunityPersonDto, KeyCommunityPerson> {

  KeyCommunityPersonMapper INSTANCE = Mappers.getMapper(KeyCommunityPersonMapper.class);

  @Override
  @Mapping(target = "languageId", source = "language.id")
  KeyCommunityPersonDto toDto(KeyCommunityPerson keyCommunityPerson);

  @Override
  @Mapping(target = "id", ignore = true)
  KeyCommunityPerson fromDto(KeyCommunityPersonDto keyCommunityPersonDto);
}
