package org.motechproject.newebodac.web;

import java.util.List;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.dto.EnrollmentGroupDto;
import org.motechproject.newebodac.service.EnrollmentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class EnrollmentGroupController extends BaseController{

  @Autowired
  private EnrollmentGroupService enrollmentGroupService;

  private EnrollmentGroupMapper enrollmentGroupMapper = EnrollmentGroupMapper.INSTANCE;

  @RequestMapping(value = "/enrollmentGroup/create", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public EnrollmentGroupDto createEnrollmentGroup(@RequestParam(value = "name", required = false) String name) {

    EnrollmentGroup enrollmentGroup = new EnrollmentGroup();
    enrollmentGroup.setName(name);

    enrollmentGroupService.createEnrollmentGroup(enrollmentGroup);

    return enrollmentGroupMapper.toDto(enrollmentGroup);
  }

  @RequestMapping(value = "/enrollmentGroup", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<EnrollmentGroupDto> getEnrollmentGroup() {

    Iterable<EnrollmentGroup> enrollemntGroups = enrollmentGroupService.getEnrollmentGroups();

    return enrollmentGroupMapper.toDtos(enrollemntGroups);
  }
}
