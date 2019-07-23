package org.motechproject.newebodac.service;

import java.util.UUID;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.repository.EnrollmentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentGroupService {

  @Autowired
  private EnrollmentGroupRepository enrollmentGroupRepository;

  public Iterable<EnrollmentGroup> getEnrollmentGroups() {
    return enrollmentGroupRepository.findAll();
  }

  public EnrollmentGroup createEnrollmentGroup(EnrollmentGroup language) {
    return enrollmentGroupRepository.save(language);
  }

  public EnrollmentGroup findById(UUID id) { return enrollmentGroupRepository.getOne(id); }

}
