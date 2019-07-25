package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.service.EnrollmentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class EnrollmentGroupController extends BaseController {

  @Autowired
  private EnrollmentGroupService enrollmentGroupService;

  /**
   * Returns List of enrollment group Dtos loaded from the database.
   * @return List of enrollment group Dtos.
   */
  @RequestMapping(value = "/enrollmentGroup", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<EnrollmentGroupDto> getEnrollmentGroups() {

    return enrollmentGroupService.getEnrollmentGroupsDtos();
  }

  @RequestMapping(value = "/enrollmentGroup/{enrollmentGroupId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto getEnrollmentGroup(
      @PathVariable(value = "enrollmentGroupId") UUID enrollmentGroupId) {

    return enrollmentGroupService.findByIdDto(enrollmentGroupId);
  }

  /**
   * Creates enrollment group with given name and saves it.
   * @param name Name of the enrollment group.
   * @return Dto of the saved enrollment group.
   */
  @RequestMapping(value = "/enrollmentGroup/create", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto createEnrollmentGroup(
      @RequestParam(value = "name", required = false) String name) {

    return enrollmentGroupService.createEnrollmentGroup(name);
  }
}
