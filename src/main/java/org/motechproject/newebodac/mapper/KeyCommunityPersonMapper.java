package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface KeyCommunityPersonMapper
    extends EntityMapper<KeyCommunityPersonDto, KeyCommunityPerson> {

  KeyCommunityPersonMapper INSTANCE = Mappers.getMapper(KeyCommunityPersonMapper.class);

  @Mapping(target = "language", source = "languageId")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(KeyCommunityPersonDto communityPersonDto,
      @MappingTarget KeyCommunityPerson communityPerson);

  @Override
  @Mapping(target = "languageId", source = "language.id")
  KeyCommunityPersonDto toDto(KeyCommunityPerson keyCommunityPerson);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "language", source = "languageId")
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  KeyCommunityPerson fromDto(KeyCommunityPersonDto keyCommunityPersonDto);

  /**
   * Maps uuid to Language object. Returns null if the id is null.
   * @param id id of Language
   * @return Language with set id
   */
  default Language toLanguage(UUID id) {
    if (id != null) {
      return new Language(id);
    }
    return null;
  }
}
