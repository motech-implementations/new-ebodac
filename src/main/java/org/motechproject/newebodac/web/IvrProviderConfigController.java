package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.IvrProviderConfigDto;
import org.motechproject.newebodac.service.IvrProviderConfigService;
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
public class IvrProviderConfigController extends BaseController {

  @Autowired
  private IvrProviderConfigService ivrProviderConfigService;

  @RequestMapping(value = "/ivrProviderConfig", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<IvrProviderConfigDto> getAll() {
    return ivrProviderConfigService.getAll();
  }

  @RequestMapping(value = "/ivrProviderConfig/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public IvrProviderConfigDto findById(@PathVariable("id") UUID id) {
    return ivrProviderConfigService.findById(id);
  }

  @RequestMapping(value = "/ivrProviderConfig", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public IvrProviderConfigDto create(@RequestBody @Valid IvrProviderConfigDto providerConfigDto) {
    return ivrProviderConfigService.create(providerConfigDto);
  }

  @RequestMapping(value = "/ivrProviderConfig/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public IvrProviderConfigDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid IvrProviderConfigDto ivrProviderConfigDto) {
    return ivrProviderConfigService.update(id, ivrProviderConfigDto);
  }

  @RequestMapping(value = "/ivrProviderConfig/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    ivrProviderConfigService.delete(id);
  }
}
