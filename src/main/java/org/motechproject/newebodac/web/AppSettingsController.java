package org.motechproject.newebodac.web;

import javax.validation.Valid;
import org.motechproject.newebodac.dto.AppSettingsDto;
import org.motechproject.newebodac.service.AppSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class AppSettingsController extends BaseController {

  @Autowired
  private AppSettingsService appSettingsService;

  @RequestMapping(value = "/appSettings", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public AppSettingsDto get() {
    return appSettingsService.get();
  }

  @RequestMapping(value = "/appSettings", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public AppSettingsDto update(@RequestBody @Valid AppSettingsDto appSettingsDto) {
    return appSettingsService.update(appSettingsDto);
  }
}
