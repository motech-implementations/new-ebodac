package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.repository.EnrollmentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentGroupService {

  @Autowired
  private EnrollmentGroupRepository enrollmentGroupRepository;

  private static final EnrollmentGroupMapper ENROLLMENT_GROUP_MAPPER =
      EnrollmentGroupMapper.INSTANCE;

  public Iterable<EnrollmentGroup> getEnrollmentGroups() {
    return enrollmentGroupRepository.findAll();
  }

  public EnrollmentGroup createEnrollmentGroup(EnrollmentGroup enrollmentGroup) {
    return enrollmentGroupRepository.save(enrollmentGroup);
  }

  public EnrollmentGroup findById(UUID id) {
    return enrollmentGroupRepository.getOne(id);
  }

  public EnrollmentGroupDto findByIdDto(UUID id) {
    return ENROLLMENT_GROUP_MAPPER.toDto(enrollmentGroupRepository.getOne(id));
  }

  public EnrollmentGroupDto getEnrollmentGroupDto(EnrollmentGroup enrollmentGroup) {
    return ENROLLMENT_GROUP_MAPPER.toDto(enrollmentGroup);
  }

  public List<EnrollmentGroupDto> getEnrollmentGroupsDtos(
      Iterable<EnrollmentGroup> enrollmentGroups) {
    return ENROLLMENT_GROUP_MAPPER.toDtos(enrollmentGroups);
  }
}
