package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.dto.CampaignMessageDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.CampaignMessageMapper;
import org.motechproject.newebodac.repository.CampaignMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignMessageService {

  private static final CampaignMessageMapper MAPPER = CampaignMessageMapper.INSTANCE;

  @Autowired
  private CampaignMessageRepository campaignMessageRepository;

  public List<CampaignMessageDto> getAll() {
    return MAPPER.toDtos(campaignMessageRepository.findAll());
  }

  public CampaignMessageDto findById(UUID id) {
    return MAPPER.toDto(campaignMessageRepository.getOne(id));
  }

  public CampaignMessageDto create(CampaignMessageDto campaignMessageDto) {
    return MAPPER.toDto(campaignMessageRepository.save(MAPPER.fromDto(campaignMessageDto)));
  }

  /**
   * Updates data from dto to object, saves it and returns its Dto.
   *
   * @param id      ID of object to update.
   * @param campaignMessageDto Dto of object to update.
   * @return Dto of of updated object
   */
  public CampaignMessageDto update(UUID id, CampaignMessageDto campaignMessageDto) {

    CampaignMessage existingCampaignMessage = campaignMessageRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(
            "Message Campaign with id: {0} not found", id.toString()));
    MAPPER.update(campaignMessageDto, existingCampaignMessage);

    return MAPPER.toDto(campaignMessageRepository.save(existingCampaignMessage));
  }

  /**
   * Deletes campaign message with given id.
   * @param id ID of campaign message to delete.
   */
  public void delete(UUID id) {
    CampaignMessage campaignMessage = campaignMessageRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Campaign message with id: {0} not found", id.toString()));
    campaignMessageRepository.delete(campaignMessage);
  }
}
