package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.repository.EnrollmentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentGroupService {

  private static final EnrollmentGroupMapper MAPPER = EnrollmentGroupMapper.INSTANCE;

  @Autowired
  private EnrollmentGroupRepository enrollmentGroupRepository;

  public List<EnrollmentGroupDto> getAll() {
    return MAPPER.toDtos(enrollmentGroupRepository.findAll());
  }

  public EnrollmentGroupDto findById(UUID id) {
    return MAPPER.toDto(enrollmentGroupRepository.getOne(id));
  }

  public EnrollmentGroupDto create(EnrollmentGroupDto enrollmentGroupDto) {
    return MAPPER.toDto(enrollmentGroupRepository.save(MAPPER.fromDto(enrollmentGroupDto)));
  }

  /**
   * Deletes enrollment group with given id.
   * @param id ID of key community person to delete.
   */
  public void delete(UUID id) {
    EnrollmentGroup enrollmentGroup = enrollmentGroupRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Enrollment group with id: {0} not found", id.toString()));
    enrollmentGroupRepository.delete(enrollmentGroup);
  }
}
