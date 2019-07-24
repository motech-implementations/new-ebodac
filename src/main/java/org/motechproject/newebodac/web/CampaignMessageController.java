package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.dto.CampaignMessageDto;
import org.motechproject.newebodac.service.CampaignMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class CampaignMessageController extends BaseController {

  @Autowired
  private CampaignMessageService campaignMessageService;

  /**
   * Function requests all campaign messages from the database.
   * @return All campaign messages from the database.
   */
  @RequestMapping(value = "/campaignMessage", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<CampaignMessageDto> getCampaignMessages() {

    return campaignMessageService.getCampaignMessagesDtos();
  }

  @RequestMapping(value = "/campaignMessage/{campaignMessageId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto getCampaignMessage(
      @PathVariable("campaignMessageId") UUID campaignMessageId) {

    return campaignMessageService.findByIdDto(campaignMessageId);
  }

  /**
   * Creates enrollment group from Dto.
   * @param campaignMessageDto Dto of created campaign message.
   * @return Dto of created campaign message.
   */
  @RequestMapping(value = "/campaignMessage/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto createEnrollmentGroup(
      @RequestBody @Valid CampaignMessageDto campaignMessageDto) {

    CampaignMessage campaignMessage =
        campaignMessageService.getCampaignMessageFromDto(campaignMessageDto);

    return campaignMessageService.getCampaignMessageDto(
        campaignMessageService.createCampaignMessage(campaignMessage)
    );
  }
}
