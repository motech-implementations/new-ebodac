package org.motechproject.newebodac.web;

import java.util.UUID;
import org.motechproject.newebodac.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class EnrollmentController extends BaseController {

  @Autowired
  private EnrollmentService enrollmentService;

  @RequestMapping(value = "/visit/enroll/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  public void enrollVisit(@PathVariable("id") UUID id) {
    enrollmentService.enrollVisit(id);
  }

  @RequestMapping(value = "/visit/unenroll/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  public void unenrollVisit(@PathVariable("id") UUID id) {
    enrollmentService.unenrollVisit(id);
  }

  @RequestMapping(value = "/vaccinee/enroll/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  public void enrollVaccinee(@PathVariable("id") UUID id) {
    enrollmentService.enrollVaccinee(id);
  }

  @RequestMapping(value = "/vaccinee/unenroll/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  public void unenrollVaccinee(@PathVariable("id") UUID id) {
    enrollmentService.unenrollVaccinee(id);
  }
}
