package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.domain.mapper.CampaignMessageMapper;
import org.motechproject.newebodac.dto.CampaignMessageDto;
import org.motechproject.newebodac.repository.CampaignMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignMessageService {

  @Autowired
  private CampaignMessageRepository campaignMessageRepository;

  private static final CampaignMessageMapper CAMPAIGN_MESSAGE_MAPPER =
      CampaignMessageMapper.INSTANCE;

  public Iterable<CampaignMessage> getCampaignMessages() {
    return campaignMessageRepository.findAll();
  }

  public CampaignMessageDto getCampaignMessageDto(CampaignMessage campaignMessage) {
    return CAMPAIGN_MESSAGE_MAPPER.toDto(campaignMessage);
  }

  public List<CampaignMessageDto> getCampaignMessagesDtos() {
    return CAMPAIGN_MESSAGE_MAPPER.toDtos(campaignMessageRepository.findAll());
  }

  public CampaignMessage createCampaignMessage(CampaignMessage campaignMessage) {
    return campaignMessageRepository.save(campaignMessage);
  }

  public CampaignMessage getCampaignMessageFromDto(CampaignMessageDto campaignMessageDto) {
    return CAMPAIGN_MESSAGE_MAPPER.fromDto(campaignMessageDto);
  }

  public CampaignMessage findById(UUID id) {
    return campaignMessageRepository.getOne(id);
  }

  public CampaignMessageDto findByIdDto(UUID id) {
    return CAMPAIGN_MESSAGE_MAPPER.toDto(campaignMessageRepository.getOne(id));
  }
}
