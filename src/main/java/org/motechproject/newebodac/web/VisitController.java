package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.domain.Visit;
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
public class VisitController {

  @Autowired
  private VisitService visitService;

  /**
   * Returns List of visits Dtos loaded from the database.
   * @return List of visits Dtos
   */
  @RequestMapping(value = "/visit", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VisitDto> getVisits() {

    Iterable<Visit> visits = visitService.getVisits();

    return visitService.getVisitsDtos(visits);
  }

  @RequestMapping(value = "/visit/{visitId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitDto findById(@PathVariable(value = "visitId") UUID visitId) {

    return visitService.findByIdDto(visitId);
  }

  /**
   * Creates visit from given dto and saves it into the database.
   * @param visitDto Dto of created visit.
   * @return Dto od created visit.
   */
  @RequestMapping(value = "/visit/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitDto createVisit(@RequestBody @Valid VisitDto visitDto) {

    Visit visit = visitService.getVisitFromDto(visitDto);

    return visitService.getVisitDto(visitService.createVisit(visit));
  }
}
