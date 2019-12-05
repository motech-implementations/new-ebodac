package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.security.UserRole;
import org.motechproject.newebodac.dto.PermissionDto;
import org.motechproject.newebodac.dto.RoleDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.NewEbodacException;
import org.motechproject.newebodac.mapper.PermissionMapper;
import org.motechproject.newebodac.mapper.RoleMapper;
import org.motechproject.newebodac.repository.PermissionRepository;
import org.motechproject.newebodac.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

  private static final RoleMapper MAPPER = RoleMapper.INSTANCE;
  private static final PermissionMapper PERMISSION_MAPPER = PermissionMapper.INSTANCE;
  private static final String ADMIN_ROLE = "Admin";

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PermissionRepository permissionRepository;

  @PreAuthorize(DefaultPermissions.HAS_ROLE_READ_ROLE)
  public List<RoleDto> getAll() {
    return MAPPER.toDtos(roleRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_ROLE_READ_ROLE)
  public List<PermissionDto> getAllPermissions() {
    return PERMISSION_MAPPER.toDtos(permissionRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_ROLE_READ_ROLE)
  public RoleDto findById(UUID id) {
    return MAPPER.toDto(roleRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_ROLE_WRITE_ROLE)
  public RoleDto create(RoleDto roleDto) {
    return MAPPER.toDto(roleRepository.save(MAPPER.fromDto(roleDto)));
  }

  /**
   * Updates data from dto to role object, saves it and returns dto of it.
   * @param id ID of object to update.
   * @param roleDto Dto of role to update.
   * @return Dto of of updated role
   */
  @PreAuthorize(DefaultPermissions.HAS_ROLE_WRITE_ROLE)
  public RoleDto update(UUID id, RoleDto roleDto) {
    UserRole role = roleRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Role with id: {0} not found", id.toString()));
    if (role.getName().equals(ADMIN_ROLE)) {
      throw new NewEbodacException("Role with name: 'Admin' can not be changed");
    }
    MAPPER.update(roleDto, role);
    return MAPPER.toDto(roleRepository.save(role));
  }

  /**
    * Deletes role with given id.
    * @param id ID of role to delete.
    * @throws NewEbodacException if Admin user is attempt to be deleted
    */
  @PreAuthorize(DefaultPermissions.HAS_ROLE_WRITE_ROLE)
  public void delete(UUID id) {
    UserRole role = roleRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Role with id: {0} not found", id.toString()));
    if (role.getName().equals(ADMIN_ROLE)) {
      throw new NewEbodacException("Role with name: 'Admin' can not be deleted");
    }
    roleRepository.delete(role);
  }
}
