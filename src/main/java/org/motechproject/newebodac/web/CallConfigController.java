package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.CallConfigDto;
import org.motechproject.newebodac.service.CallConfigService;
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
public class CallConfigController extends BaseController {

  @Autowired
  private CallConfigService callConfigService;

  @RequestMapping(value = "/callConfig", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<CallConfigDto> getAll() {
    return callConfigService.getAll();
  }

  @RequestMapping(value = "/callConfig/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CallConfigDto findById(@PathVariable("id") UUID id) {
    return callConfigService.findById(id);
  }

  @RequestMapping(value = "/callConfig", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CallConfigDto create(@RequestBody @Valid CallConfigDto callConfigDto) {
    return callConfigService.create(callConfigDto);
  }

  @RequestMapping(value = "/callConfig/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CallConfigDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid CallConfigDto callConfigDto) {
    return callConfigService.update(id, callConfigDto);
  }

  @RequestMapping(value = "/callConfig/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    callConfigService.delete(id);
  }
}
