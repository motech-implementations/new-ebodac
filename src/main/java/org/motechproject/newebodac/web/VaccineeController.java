package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.service.VaccineeService;
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
public class VaccineeController extends BaseController {

  @Autowired
  private VaccineeService vaccineeService;

  /**
   * Returns List of vaccinee Dtos loaded from the database.
   * @return List of vaccinee Dtos.
   */
  @RequestMapping(value = "/vaccinee", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VaccineeDto> getAll() {
    return vaccineeService.getAll();
  }

  @RequestMapping(value = "/vaccinee/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeDto findById(@PathVariable("id") UUID id) {
    return vaccineeService.findById(id);
  }

  /**
   * Creates vaccinee from dto.
   * @param vaccineeDto Dto of created vaccinee.
   * @return Dto of created vaccinee.
   */
  @RequestMapping(value = "/vaccinee/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeDto create(@RequestBody @Valid VaccineeDto vaccineeDto) {
    return vaccineeService.create(vaccineeDto);
  }
}
