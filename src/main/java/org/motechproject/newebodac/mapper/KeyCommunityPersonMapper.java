package org.motechproject.newebodac.mapper;

import java.util.Set;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.helper.EncryptionHelper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = { ExtraFieldMapper.class }, componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class KeyCommunityPersonMapper
    implements EntityMapper<KeyCommunityPersonDto, KeyCommunityPerson> {

  private static final String TO_ENCRYPTED_PHONE_NUMBER = "ToEncryptedPhoneNumber";
  private static final String TO_DECRYPTED_PHONE_NUMBER = "ToDecryptedPhoneNumber";

  @Autowired
  private EncryptionHelper encryptionHelper;

  @Mapping(target = "phone", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  public abstract void update(KeyCommunityPersonDto communityPersonDto,
      @MappingTarget KeyCommunityPerson communityPerson);

  @Override
  @Mapping(target = "language", source = "language.id")
  @Mapping(target = "phone", qualifiedByName = TO_DECRYPTED_PHONE_NUMBER)
  public abstract KeyCommunityPersonDto toDto(KeyCommunityPerson keyCommunityPerson);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "phone", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  public abstract KeyCommunityPerson fromDto(KeyCommunityPersonDto keyCommunityPersonDto);

  /**
   * Attaches this KeyCommunityPerson to all extra fields id.
   * @param keyCommunityPersonDto Dto of KeyCommunityPerson.
   * @param keyCommunityPerson Mapped KeyCommunityPerson.
   */
  @AfterMapping
  public void afterMappingFromDto(KeyCommunityPersonDto keyCommunityPersonDto,
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
  public Language toLanguage(UUID id) {
    if (id != null) {
      return new Language(id);
    }
    return null;
  }

  /**
   * Encrypts provided value.
   */
  @Named(TO_ENCRYPTED_PHONE_NUMBER)
  public String toEncryptedPhoneNumber(String phoneNumber) {
    if (StringUtils.isNotBlank(phoneNumber)) {
      return encryptionHelper.encrypt(phoneNumber);
    }
    return null;
  }

  /**
   * Decrypts provided value.
   */
  @Named(TO_DECRYPTED_PHONE_NUMBER)
  public String toDecryptedPhoneNumber(String phoneNumber) {
    if (StringUtils.isNotBlank(phoneNumber)) {
      return encryptionHelper.decrypt(phoneNumber);
    }
    return null;
  }
}
