package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, UUID> {

}
