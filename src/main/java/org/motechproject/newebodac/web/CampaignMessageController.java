package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.CampaignMessage;
import org.motechproject.newebodac.domain.mapper.CampaignMessageMapper;
import org.motechproject.newebodac.dto.CampaignMessageDto;
import org.motechproject.newebodac.service.CampaignMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class CampaignMessageController extends BaseController{

  @Autowired
  private CampaignMessageService campaignMessageService;

  private CampaignMessageMapper campaignMessageMapper = CampaignMessageMapper.INSTANCE;

  @RequestMapping(value = "/campaignMessage/{campaignMessageId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto getCampaignMessage(@PathVariable("campaignMessageId") UUID campaignMessageId) {

    return campaignMessageMapper.toDto(campaignMessageService.findById(campaignMessageId));
  }

  @RequestMapping(value = "/campaignMessage", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<CampaignMessageDto> getCampaignMessages() {

    Iterable<CampaignMessage> campaignMessages = campaignMessageService.getCampaignMessages();

    return campaignMessageMapper.toDtos(campaignMessages);
  }
}
