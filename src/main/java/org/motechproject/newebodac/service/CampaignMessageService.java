package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.CampaignMessageDto;
import org.motechproject.newebodac.mapper.CampaignMessageMapper;
import org.motechproject.newebodac.repository.CampaignMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignMessageService {

  @Autowired
  private CampaignMessageRepository campaignMessageRepository;

  private static final CampaignMessageMapper CAMPAIGN_MESSAGE_MAPPER =
      CampaignMessageMapper.INSTANCE;

  public List<CampaignMessageDto> getCampaignMessagesDtos() {
    return CAMPAIGN_MESSAGE_MAPPER.toDtos(
        campaignMessageRepository.findAll()
    );
  }

  public CampaignMessageDto createCampaignMessage(CampaignMessageDto campaignMessageDto) {
    return CAMPAIGN_MESSAGE_MAPPER.toDto(
        campaignMessageRepository.save(CAMPAIGN_MESSAGE_MAPPER.fromDto(campaignMessageDto))
    );
  }

  public CampaignMessageDto findByIdDto(UUID id) {
    return CAMPAIGN_MESSAGE_MAPPER.toDto(campaignMessageRepository.getOne(id));
  }
}
