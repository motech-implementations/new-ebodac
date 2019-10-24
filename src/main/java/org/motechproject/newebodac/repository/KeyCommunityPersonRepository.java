package org.motechproject.newebodac.repository;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyCommunityPersonRepository extends JpaRepository<KeyCommunityPerson, UUID> {

  List<KeyCommunityPerson> getByLanguage(Language language);
}
