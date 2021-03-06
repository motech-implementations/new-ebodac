package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.service.EnrollmentGroupService;
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
public class EnrollmentGroupController extends BaseController {

  @Autowired
  private EnrollmentGroupService enrollmentGroupService;

  /**
   * Returns List of enrollment group Dtos loaded from the database.
   * @return List of enrollment group Dtos.
   */
  @RequestMapping(value = "/group", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<EnrollmentGroupDto> getAll() {
    return enrollmentGroupService.getAll();
  }

  @RequestMapping(value = "/group/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto findById(@PathVariable("id") UUID id) {
    return enrollmentGroupService.findById(id);
  }

  @RequestMapping(value = "/group", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto create(@RequestBody @Valid EnrollmentGroupDto enrollmentGroupDto) {
    return enrollmentGroupService.create(enrollmentGroupDto);
  }

  /**
   * Updates existing {@link org.motechproject.newebodac.domain.EnrollmentGroup}
   * with given id and dto and saves it into
   * the database.
   *
   * @param id                    id of enrollment group to update
   * @param enrollmentGroupDto DTO of enrollment group to save
   * @return Dto of updated enrollment group.
   */
  @RequestMapping(value = "/group/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid EnrollmentGroupDto enrollmentGroupDto) {
    return enrollmentGroupService.update(id, enrollmentGroupDto);
  }

  @RequestMapping(value = "/group/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    enrollmentGroupService.delete(id);
  }
}
