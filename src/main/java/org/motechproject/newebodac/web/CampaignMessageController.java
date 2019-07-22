package org.motechproject.newebodac.web;

import org.motechproject.newebodac.domain.mapper.CampaignMessageMapper;
import org.motechproject.newebodac.service.CampaignMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CampaignMessageController extends BaseController{

  @Autowired
  private CampaignMessageService campaignMessageService;

  private CampaignMessageMapper campaignMessageMapper = CampaignMessageMapper.INSTANCE;
}
