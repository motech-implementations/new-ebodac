package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.repository.EnrollmentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentGroupService {

  @Autowired
  private EnrollmentGroupRepository enrollmentGroupRepository;

  private static final EnrollmentGroupMapper ENROLLMENT_GROUP_MAPPER =
      EnrollmentGroupMapper.INSTANCE;

  public EnrollmentGroupDto createEnrollmentGroup(String name) {
    EnrollmentGroup enrollmentGroup = new EnrollmentGroup();
    enrollmentGroup.setName(name);
    return ENROLLMENT_GROUP_MAPPER.toDto(
        enrollmentGroupRepository.save(enrollmentGroup)
    );
  }

  public EnrollmentGroupDto findByIdDto(UUID id) {
    return ENROLLMENT_GROUP_MAPPER.toDto(enrollmentGroupRepository.getOne(id));
  }

  public List<EnrollmentGroupDto> getEnrollmentGroupsDtos() {
    return ENROLLMENT_GROUP_MAPPER.toDtos(
        enrollmentGroupRepository.findAll()
    );
  }
}
