package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.SiteDto;
import org.motechproject.newebodac.service.SiteService;
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
public class SiteController {

  @Autowired
  private SiteService siteService;

  @RequestMapping(value = "/site", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<SiteDto> getSites() {

    return siteService.getSitesDtos();
  }

  @RequestMapping(value = "/site/{siteId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public SiteDto findById(@PathVariable(value = "siteId") UUID siteId) {

    return siteService.findByIdDto(siteId);
  }

  @RequestMapping(value = "/site/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public SiteDto createSite(@RequestBody @Valid SiteDto siteDto) {

    return siteService.createSite(siteDto);
  }
}
