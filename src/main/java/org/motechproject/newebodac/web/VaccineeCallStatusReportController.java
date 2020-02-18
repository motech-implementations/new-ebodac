package org.motechproject.newebodac.web;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.dto.VaccineeCallStatusReportDto;
import org.motechproject.newebodac.service.VaccineeCallStatusReportService;
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
public class VaccineeCallStatusReportController extends BaseController {

  @Autowired
  private VaccineeCallStatusReportService vaccineeCallStatusReportService;

  @RequestMapping(value = "/vaccineeCallStatusReport", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<VaccineeCallStatusReportDto> getAll() {
    return vaccineeCallStatusReportService.getAll();
  }

  @RequestMapping(value = "/vaccineeCallStatusReport/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public VaccineeCallStatusReportDto findById(@PathVariable("id") UUID id) {
    return vaccineeCallStatusReportService.findById(id);
  }

  /**
   * Generate Vaccinee Call Status Reports starting from given date.
   * @param fromDate report generation will start from this date
   */
  @RequestMapping(value = "/vaccineeCallStatusReport/generate", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public void generateVaccineeCallStatusReports(@RequestBody(required = false) String fromDate) {
    LocalDate date = null;

    if (StringUtils.isNotBlank(fromDate)) {
      date = LocalDate.parse(fromDate);
    }

    vaccineeCallStatusReportService.generateVaccineeCallStatusReports(date);
  }
}
