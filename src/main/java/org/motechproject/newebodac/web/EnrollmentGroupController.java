package org.motechproject.newebodac.web;

import org.motechproject.newebodac.domain.mapper.EnrollmentGroupMapper;
import org.motechproject.newebodac.service.EnrollmentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class EnrollmentGroupController extends BaseController{

  @Autowired
  private EnrollmentGroupService enrollmentGroupService;

  private EnrollmentGroupMapper enrollmentGroupMapper = EnrollmentGroupMapper.INSTANCE;

}
