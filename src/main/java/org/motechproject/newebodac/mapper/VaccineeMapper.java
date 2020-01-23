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
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.helper.EncryptionHelper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = { ExtraFieldMapper.class },
    componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class VaccineeMapper implements EntityMapper<VaccineeDto, Vaccinee> {

  private static final String TO_ENCRYPTED_PHONE_NUMBER = "ToEncryptedPhoneNumber";
  private static final String TO_DECRYPTED_PHONE_NUMBER = "ToDecryptedPhoneNumber";

  @Autowired
  private EncryptionHelper encryptionHelper;

  @Mapping(target = "phoneNumber", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "alternatePhoneNumber", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  public abstract void update(VaccineeDto vaccineeDto, @MappingTarget Vaccinee vaccinee);

  @Override
  @Mapping(target = "group", source = "group.id")
  @Mapping(target = "preferredLanguage", source = "preferredLanguage.id")
  @Mapping(target = "phoneNumber", qualifiedByName = TO_DECRYPTED_PHONE_NUMBER)
  @Mapping(target = "alternatePhoneNumber", qualifiedByName = TO_DECRYPTED_PHONE_NUMBER)
  @Mapping(target = "status", source = "visits")
  public abstract VaccineeDto toDto(Vaccinee vaccinee);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "phoneNumber", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "alternatePhoneNumber", qualifiedByName = TO_ENCRYPTED_PHONE_NUMBER)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  public abstract Vaccinee fromDto(VaccineeDto vaccineeDto);

  /**
   * Attaches this Vaccinee to all extra fields id.
   * @param vaccineeDto Dto of Vaccinee.
   * @param vaccinee Mapped Vaccinee.
   */
  @AfterMapping
  public void afterMappingFromDto(VaccineeDto vaccineeDto, @MappingTarget Vaccinee vaccinee) {
    Set<ExtraField> extraFieldList = vaccinee.getExtraFields();
    for (ExtraField extraField : extraFieldList) {
      extraField.setVaccinee(vaccinee);
      extraField.setEntity(EntityType.VACCINEE);
    }
  }

  /**
   * Maps uuid to Language object. Returns null if the id is null.
   * @param id id of Language
   * @return Language with set id
   */
  public Language toPreferredLanguage(UUID id) {
    if (id != null) {
      return new Language(id);
    }
    return null;
  }

  /**
   * Calculate enrollment status for Vaccinee.
   * @param visits list of visits
   * @return Vaccinee enrollment status
   */
  public String toStatus(Set<Visit> visits) {
    EnrollmentStatus status = EnrollmentStatus.COMPLETED;

    if (visits != null) {
      for (Visit visit : visits) {
        if (EnrollmentStatus.ENROLLED.equals(visit.getStatus())) {
          return EnrollmentStatus.ENROLLED.name();
        }
        if (EnrollmentStatus.UNENROLLED.equals(visit.getStatus())) {
          status = EnrollmentStatus.UNENROLLED;
        } else if (!EnrollmentStatus.UNENROLLED.equals(status)
            && EnrollmentStatus.NOT_ENROLLED.equals(visit.getStatus())) {
          status = EnrollmentStatus.NOT_ENROLLED;
        }
      }
    }

    return status.name();
  }

  /**
   * Maps uuid to EnrollmentGroup object. Returns null if the id is null.
   * @param id id of Language
   * @return EnrollmentGroup with set id
   */
  public EnrollmentGroup toGroup(UUID id) {
    if (id != null) {
      return new EnrollmentGroup(id);
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
