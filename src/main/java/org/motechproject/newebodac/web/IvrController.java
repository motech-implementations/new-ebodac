package org.motechproject.newebodac.web;

import java.util.Map;
import org.motechproject.newebodac.service.IvrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class IvrController extends BaseController {

  @Autowired
  private IvrService ivrService;

  @RequestMapping(value = "/initiateCall/{configName}", method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public void sendIvrCall(@PathVariable("configName") String configName,
      @RequestParam Map<String, Object> params) {
    ivrService.sendIvrCall(configName, params);
  }

  @RequestMapping("/ivrCallback/{configName}")
  @ResponseStatus(HttpStatus.OK)
  public void saveIvrCallback(@PathVariable("configName") String configName,
      @RequestParam(required = false) Map<String, String> ivrData,
      @RequestBody(required = false) String json) {
    ivrService.saveIvrCallback(configName, ivrData, json);
  }
}
