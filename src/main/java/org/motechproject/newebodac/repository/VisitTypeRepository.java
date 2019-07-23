package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.VisitType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitTypeRepository extends JpaRepository<VisitType, UUID> {

}
