package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
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
  public List<CampaignMessageDto> getAll() {
    return campaignMessageService.getAll();
  }

  @RequestMapping(value = "/campaignMessage/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto findById(@PathVariable("id") UUID id) {
    return campaignMessageService.findById(id);
  }

  /**
   * Creates enrollment group from Dto.
   * @param campaignMessageDto Dto of created campaign message.
   * @return Dto of created campaign message.
   */
  @RequestMapping(value = "/campaignMessage", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto create(@RequestBody @Valid CampaignMessageDto campaignMessageDto) {
    return campaignMessageService.create(campaignMessageDto);
  }

  /**
  * Updates existing {@link org.motechproject.newebodac.domain.CampaignMessage}
  * with given id and dto and saves it into
  * the database.
  *
  * @param id                   id of message campaign to update
  * @param campaignMessageDto DTO of message campaign to save
  * @return Dto of updated message campaign.
  */
  @RequestMapping(value = "/campaignMessage/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CampaignMessageDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid CampaignMessageDto campaignMessageDto) {
    return campaignMessageService.update(id, campaignMessageDto);
  }

  @RequestMapping(value = "/campaignMessage/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    campaignMessageService.delete(id);
  }
}
