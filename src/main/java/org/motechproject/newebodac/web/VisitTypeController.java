package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.dto.VisitTypeDto;
import org.motechproject.newebodac.service.VisitTypeService;
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
public class VisitTypeController extends BaseController {

  @Autowired
  private VisitTypeService visitTypeService;

  /**
   * Returns List of visit type Dtos loaded from the database.
   * @return List of visit type Dtos
   */
  @RequestMapping(value = "/visitType", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VisitTypeDto> getVisitTypes() {
    Iterable<VisitType> visitTypes = visitTypeService.getVisitTypes();

    return visitTypeService.getVisitTypesDtos(visitTypes);
  }

  @RequestMapping(value = "/visitType/{visitTypeId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitTypeDto getVisitType(@PathVariable("visitTypeId") UUID visitTypeId) {

    return visitTypeService.findByIdDto(visitTypeId);
  }

  /**
   * Creates visit type form dto.
   * @param visitTypeDto Dto of created visit type.
   * @return Dto of created visit type.
   */
  @RequestMapping(value = "/visitType/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitTypeDto createVisitType(
      @RequestBody @Valid VisitTypeDto visitTypeDto) {

    VisitType visitType =
        visitTypeService.getVisitTypeFromDto(visitTypeDto);

    return visitTypeService.getVisitTypeDto(
        visitTypeService.createVisitType(visitType)
    );
  }
}
