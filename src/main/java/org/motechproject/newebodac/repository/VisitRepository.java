package org.motechproject.newebodac.repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.VisitType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, UUID> {

  Set<Visit> getByType(VisitType visitType);

  Optional<Visit> getById(UUID id);

  Set<Visit> findAllByVaccineeId(UUID id);

  Visit getByVaccineeIdAndType(UUID vacUuid, VisitType visitType);
}
