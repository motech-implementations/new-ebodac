package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyCommunityPersonRepository extends JpaRepository<KeyCommunityPerson, UUID> {

}
