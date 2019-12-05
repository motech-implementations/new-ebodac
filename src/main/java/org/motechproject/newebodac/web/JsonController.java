package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.JsonConfigDto;
import org.motechproject.newebodac.service.JsonConfigService;
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
public class JsonController extends BaseController {

  @Autowired
  private JsonConfigService jsonConfigService;

  @RequestMapping(value = "/jsonConfig", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<JsonConfigDto> getAll() {
    return jsonConfigService.getAll();
  }

  @RequestMapping(value = "/jsonConfig/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public JsonConfigDto findById(@PathVariable("id") UUID id) {
    return jsonConfigService.findById(id);
  }

  @RequestMapping(value = "/jsonConfig", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public JsonConfigDto create(@RequestBody @Valid JsonConfigDto jsonConfigDto) {
    return jsonConfigService.create(jsonConfigDto);
  }

  @RequestMapping(value = "/jsonConfig/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public JsonConfigDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid JsonConfigDto jsonConfigDto) {
    return jsonConfigService.update(id, jsonConfigDto);
  }

  @RequestMapping(value = "/jsonConfig/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    jsonConfigService.delete(id);
  }
}
