package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.FieldConfigDto;
import org.motechproject.newebodac.service.FieldConfigService;
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
public class FieldConfigController extends BaseController {

  @Autowired
  private FieldConfigService fieldConfigService;

  @RequestMapping(value = "/fieldConfig/{name}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<FieldConfigDto> findByEntityName(@PathVariable("name") String name) {
    return fieldConfigService.getByEntityName(name);
  }

  @RequestMapping(value = "/fieldConfig", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public FieldConfigDto create(@RequestBody @Valid FieldConfigDto fieldConfigDto) {
    return fieldConfigService.create(fieldConfigDto);
  }

  @RequestMapping(value = "/fieldConfig/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public FieldConfigDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid FieldConfigDto fieldConfigDto) {
    return fieldConfigService.updateFromDto(id, fieldConfigDto);
  }

  @RequestMapping(value = "/fieldConfig/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    fieldConfigService.delete(id);
  }
}
