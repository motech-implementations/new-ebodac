package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, UUID> {

}
