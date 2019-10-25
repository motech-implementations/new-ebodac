package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.VisitDto;
import org.motechproject.newebodac.service.VisitService;
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
public class VisitController extends BaseController {

  @Autowired
  private VisitService visitService;

  /**
   * Returns List of visits Dtos loaded from the database.
   * @return List of visits Dtos
   */
  @RequestMapping(value = "/visit", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VisitDto> getAll() {
    return visitService.getAll();
  }

  @RequestMapping(value = "/visit/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitDto findById(@PathVariable("id") UUID id) {
    return visitService.findById(id);
  }

  /**
   * Creates visit from given dto and saves it into the database.
   * @param visitDto Dto of created visit.
   * @return Dto od created visit.
   */
  @RequestMapping(value = "/visit", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitDto create(@RequestBody @Valid VisitDto visitDto) {
    return visitService.create(visitDto);
  }

  @RequestMapping(value = "/visit/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid VisitDto visitDto) {
    return visitService.update(id, visitDto);
  }

  @RequestMapping(value = "/visit/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    visitService.delete(id);
  }
}
