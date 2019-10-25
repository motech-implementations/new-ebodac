package org.motechproject.newebodac.repository;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Vaccinee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineeRepository extends JpaRepository<Vaccinee, UUID> {

  List<Vaccinee> findByPreferredLanguage(Language language);
}
