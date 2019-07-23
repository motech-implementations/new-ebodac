package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.VisitType;
import org.motechproject.newebodac.domain.mapper.VisitTypeMapper;
import org.motechproject.newebodac.dto.VisitTypeDto;
import org.motechproject.newebodac.service.VisitTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class VisitTypeController extends BaseController{

  @Autowired
  private VisitTypeService visitTypeService;

  private VisitTypeMapper visitTypeMapper = VisitTypeMapper.INSTANCE;

  @RequestMapping(value = "/visitType", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VisitTypeDto> getVisitTypes() {
    Iterable<VisitType> visitTypes = visitTypeService.getVisitTypes();

    return visitTypeMapper.toDtos(visitTypes);
  }

  @RequestMapping(value = "/visitType/{visitTypeId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VisitTypeDto getVisitType(@PathVariable("visitTypeId") UUID visitTypeId) {

    return visitTypeMapper.toDto(visitTypeService.findById(visitTypeId));
  }
}
