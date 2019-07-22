package org.motechproject.newebodac.service;

import java.util.UUID;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.repository.CampaignMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignMessageService {

  @Autowired
  private CampaignMessageRepository campaignMessageRepository;

  public Iterable<CampaignMessage> getLanguages() {
    return campaignMessageRepository.findAll();
  }

  public CampaignMessage createCampaignMessage(CampaignMessage language) {
    return campaignMessageRepository.save(language);
  }

  public CampaignMessage findById(UUID id) { return campaignMessageRepository.getOne(id); }
}
