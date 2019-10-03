package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.PermissionDto;
import org.motechproject.newebodac.dto.RoleDto;
import org.motechproject.newebodac.service.RoleService;
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
public class RoleController extends BaseController {

  @Autowired
  private RoleService roleService;

  /**
   * Returns List of user roles Dtos loaded from the database.
   * @return List of user roles Dtos
   */
  @RequestMapping(value = "/role", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<RoleDto> getAll() {
    return roleService.getAll();
  }

  /**
   * Returns List of user permissions Dtos loaded from the database.
   * @return List of user permissions Dtos
   */
  @RequestMapping(value = "/permission", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<PermissionDto> getAllPermissions() {
    return roleService.getAllPermissions();
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public RoleDto findById(@PathVariable("id") UUID id) {
    return roleService.findById(id);
  }

  /**
   * Creates role from given dto and saves it into the database.
   * @param roleDto Dto of created role.
   * @return Dto od created role.
   */
  @RequestMapping(value = "/role", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public RoleDto create(@RequestBody @Valid RoleDto roleDto) {
    return roleService.create(roleDto);
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public RoleDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid RoleDto roleDto) {
    return roleService.update(id, roleDto);
  }

  @RequestMapping(value = "/role", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    roleService.delete(id);
  }
}
