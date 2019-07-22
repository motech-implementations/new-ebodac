package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.Vaccinee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineeRepository extends JpaRepository<Vaccinee, UUID> {

}
