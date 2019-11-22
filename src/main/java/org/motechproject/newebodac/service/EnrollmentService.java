package org.motechproject.newebodac.service;

import java.util.Set;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.enums.EnrollmentStatus;
import org.motechproject.newebodac.exception.EnrollmentException;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

  @Autowired
  private VisitRepository visitRepository;

  /**
   * Enroll Visit with given id.
   * @param id id of Visit
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_VACCINEE_ENROLLMENT_ROLE)
  public void enrollVisit(UUID id) {
    Visit visit = getVisitById(id);

    if (EnrollmentStatus.COMPLETED.equals(visit.getStatus())) {
      throw new EnrollmentException("Cannot enroll completed visit");
    } else if (!EnrollmentStatus.ENROLLED.equals(visit.getStatus())) {
      visit.setStatus(EnrollmentStatus.ENROLLED);
      visitRepository.save(visit);
    }
  }

  /**
   * Unenroll Visit with given id.
   * @param id id of Visit
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_VACCINEE_ENROLLMENT_ROLE)
  public void unenrollVisit(UUID id) {
    Visit visit = getVisitById(id);

    if (!EnrollmentStatus.ENROLLED.equals(visit.getStatus())) {
      throw new EnrollmentException("Only enrolled visit can be unenrolled");
    }

    visit.setStatus(EnrollmentStatus.UNENROLLED);
    visitRepository.save(visit);
  }

  /**
   * Enroll Vaccinee with given id.
   * @param id id of Vaccinee
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_VACCINEE_ENROLLMENT_ROLE)
  public void enrollVaccinee(UUID id) {
    Set<Visit> visits = visitRepository.findAllByVaccineeId(id);

    visits.forEach(visit -> {
      if (!EnrollmentStatus.COMPLETED.equals(visit.getStatus())) {
        visit.setStatus(EnrollmentStatus.ENROLLED);
        visitRepository.save(visit);
      }
    });
  }

  /**
   * Unenroll Vaccinee with given id.
   * @param id id of Vaccinee
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_VACCINEE_ENROLLMENT_ROLE)
  public void unenrollVaccinee(UUID id) {
    Set<Visit> visits = visitRepository.findAllByVaccineeId(id);

    visits.forEach(visit -> {
      if (EnrollmentStatus.ENROLLED.equals(visit.getStatus())) {
        visit.setStatus(EnrollmentStatus.UNENROLLED);
        visitRepository.save(visit);
      }
    });
  }

  private Visit getVisitById(UUID id) {
    return visitRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Visit with id: {0} not found",
            id.toString()));
  }
}