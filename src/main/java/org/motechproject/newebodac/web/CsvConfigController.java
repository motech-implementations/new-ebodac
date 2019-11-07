package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.CsvConfigDto;
import org.motechproject.newebodac.service.CsvConfigService;
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
public class CsvConfigController extends BaseController {

  @Autowired
  private CsvConfigService csvConfigService;

  @RequestMapping(value = "/csvConfig", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<CsvConfigDto> getAll() {
    return csvConfigService.getAll();
  }

  @RequestMapping(value = "/csvConfig/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CsvConfigDto findById(@PathVariable("id") UUID id) {
    return csvConfigService.findById(id);
  }

  @RequestMapping(value = "/csvConfig", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CsvConfigDto create(@RequestBody @Valid CsvConfigDto csvConfigDto) {
    return csvConfigService.create(csvConfigDto);
  }

  @RequestMapping(value = "/csvConfig/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public CsvConfigDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid CsvConfigDto csvConfigDto) {
    return csvConfigService.update(id, csvConfigDto);
  }

  @RequestMapping(value = "/csvConfig/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    csvConfigService.delete(id);
  }
}
