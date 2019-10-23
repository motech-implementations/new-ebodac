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
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;

@Mapper(uses = { ExtraFieldMapper.class },
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
   * Attaches this KeyCommunityPerson to all extra fields id.
   * @param keyCommunityPersonDto Dto of KeyCommunityPerson.
   * @param keyCommunityPerson Mapped KeyCommunityPerson.
   */
  @AfterMapping
  default void afterMappingFromDto(KeyCommunityPersonDto keyCommunityPersonDto,
      @MappingTarget KeyCommunityPerson keyCommunityPerson) {
    Set<ExtraField> extraFieldList = keyCommunityPerson.getExtraFields();
    for (ExtraField extraField : extraFieldList) {
      extraField.setPerson(keyCommunityPerson);
      extraField.setEntity(EntityType.PERSON);
    }
  }

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
