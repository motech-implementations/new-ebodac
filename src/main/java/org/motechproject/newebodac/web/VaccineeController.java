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
  public List<VaccineeDto> getVaccinees() {

    return vaccineeService.getVaccineesDtos();
  }

  @RequestMapping(value = "/vaccinee/{vaccineeId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeDto getVaccinee(@PathVariable("vaccineeId") UUID vaccineeId) {

    return vaccineeService.findByIdDto(vaccineeId);
  }

  /**
   * Creates vaccinee from dto.
   * @param vaccineeDto Dto of created vaccinee.
   * @return Dto of created vaccinee.
   */
  @RequestMapping(value = "/vaccinee/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeDto createVaccinee(
      @RequestBody @Valid VaccineeDto vaccineeDto) {

    return vaccineeService.createVaccinee(vaccineeDto);
  }
}
