package org.motechproject.newebodac.repository;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.VisitType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, UUID> {

  List<Visit> getByType(VisitType visitType);

  Visit getByVaccineeIdAndType(UUID vacUuid, VisitType visitType);
}
