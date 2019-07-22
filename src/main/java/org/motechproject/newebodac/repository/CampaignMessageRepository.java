package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignMessageRepository extends JpaRepository<CampaignMessage, UUID> {

}
