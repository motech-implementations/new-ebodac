package org.motechproject.newebodac.domain.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface KeyCommunityPersonMapper {

  KeyCommunityPersonMapper INSTANCE = Mappers.getMapper(KeyCommunityPersonMapper.class);

  @Mapping(target = "languageId", source = "language.id")
  KeyCommunityPersonDto toDto(KeyCommunityPerson keyCommunityPerson);

  List<KeyCommunityPersonDto> toDtos(Iterable<KeyCommunityPerson> keyCommunityPeople);

  @Mapping(target = "id", ignore = true)
  KeyCommunityPerson fromDto(KeyCommunityPersonDto keyCommunityPersonDto);
}
