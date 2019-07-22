package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentGroupRepository extends JpaRepository<EnrollmentGroup, UUID> {

}
