package org.motechproject.newebodac.web;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.enums.Gender;
import org.motechproject.newebodac.domain.mapper.VaccineeMapper;
import org.motechproject.newebodac.dto.VaccineeDto;
import org.motechproject.newebodac.service.LanguageService;
import org.motechproject.newebodac.service.VaccineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class VaccineeController extends BaseController{

  @Autowired
  private VaccineeService vaccineeService;

  @Autowired
  private LanguageService languageService;

  private VaccineeMapper vaccineeMapper = VaccineeMapper.INSTANCE;

  @RequestMapping(value = "/vaccinees", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VaccineeDto> getVaccinees() {

    Vaccinee vaccinee = new Vaccinee();
    vaccinee.setVaccineeId("name1");

    vaccineeService.createVaccinee(vaccinee);
    System.out.println("AAABBCC");
    Iterable<Vaccinee> vaccinees = vaccineeService.getVaccinees();

    return vaccineeMapper.toDtos(vaccinees);
  }

  @RequestMapping(value = "/vaccinee/{vaccineeId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeDto getVaccinee(@PathVariable("vaccineeId") Integer vaccineeId) {
    List<VaccineeDto> vaccinees = new LinkedList<>();
    VaccineeDto v1 = new VaccineeDto();
    v1.setGender("male");
    v1.setName("name1");
    v1.setYearOfBirth(vaccineeId);
    return v1;
  }
}
