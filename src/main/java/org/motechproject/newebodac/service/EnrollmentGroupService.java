package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.RelationViolationException;
import org.motechproject.newebodac.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.repository.EnrollmentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentGroupService {

  private static final EnrollmentGroupMapper MAPPER = EnrollmentGroupMapper.INSTANCE;

  @Autowired
  private EnrollmentGroupRepository enrollmentGroupRepository;

  @Autowired
  private FieldConfigService fieldConfigService;

  @PreAuthorize(DefaultPermissions.HAS_GROUP_READ_ROLE)
  public List<EnrollmentGroupDto> getAll() {
    return MAPPER.toDtos(enrollmentGroupRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_GROUP_READ_ROLE)
  public EnrollmentGroupDto findById(UUID id) {
    return MAPPER.toDto(enrollmentGroupRepository.getOne(id));
  }

  /**
  * Creates data from dto to object, saves it and returns its Dto.
  */

  @PreAuthorize(DefaultPermissions.HAS_GROUP_WRITE_ROLE)
  public EnrollmentGroupDto create(EnrollmentGroupDto enrollmentGroupDto) {
    EnrollmentGroup newEnrollmentGroup = MAPPER.fromDto(enrollmentGroupDto);
    fieldConfigService.checkIfUnique(EntityType.GROUP, newEnrollmentGroup);
    return MAPPER.toDto(enrollmentGroupRepository.save(newEnrollmentGroup));
  }

  /**
  * Updates data from dto to object, saves it and returns its Dto.
  *
  * @param id      ID of object to update.
  * @param enrollmentGroupDto Dto of object to update.
  * @return Dto of of updated object
  */
  @PreAuthorize(DefaultPermissions.HAS_GROUP_WRITE_ROLE)
  public EnrollmentGroupDto update(UUID id, EnrollmentGroupDto enrollmentGroupDto) {

    EnrollmentGroup existingEnrollmentGroup = enrollmentGroupRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(
            "Enrollment Group with id: {0} not found", id.toString()));
    MAPPER.update(enrollmentGroupDto, existingEnrollmentGroup);
    fieldConfigService.checkIfUnique(EntityType.GROUP, existingEnrollmentGroup);
    return MAPPER.toDto(enrollmentGroupRepository.save(existingEnrollmentGroup));
  }

  /**
  * Deletes enrollment group with given id.
  * @param id ID of key community person to delete.
  */
  @PreAuthorize(DefaultPermissions.HAS_GROUP_WRITE_ROLE)
  public void delete(UUID id) {
    EnrollmentGroup enrollmentGroup = enrollmentGroupRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Enrollment group with id: {0} not found", id.toString()));
    if (!enrollmentGroup.getVaccinees().isEmpty()) {
      throw new RelationViolationException("Can not delete group with users in it!");
    }
    enrollmentGroupRepository.delete(enrollmentGroup);
  }
}
