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
public class SiteController extends BaseController {

  @Autowired
  private SiteService siteService;

  @RequestMapping(value = "/site", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<SiteDto> getAll() {
    return siteService.getAll();
  }

  @RequestMapping(value = "/site/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public SiteDto findById(@PathVariable("id") UUID siteId) {
    return siteService.findById(siteId);
  }

  @RequestMapping(value = "/site", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public SiteDto create(@RequestBody @Valid SiteDto siteDto) {
    return siteService.create(siteDto);
  }

  @RequestMapping(value = "/site/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public SiteDto update(@PathVariable("id") UUID id, @RequestBody @Valid SiteDto siteDto) {
    return siteService.update(id, siteDto);
  }

  @RequestMapping(value = "/site/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    siteService.delete(id);
  }
}
