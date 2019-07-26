package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, UUID> {

}
