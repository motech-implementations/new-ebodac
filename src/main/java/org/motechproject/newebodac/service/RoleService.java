package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.security.UserRole;
import org.motechproject.newebodac.dto.PermissionDto;
import org.motechproject.newebodac.dto.RoleDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.PermissionMapper;
import org.motechproject.newebodac.mapper.RoleMapper;
import org.motechproject.newebodac.repository.PermissionRepository;
import org.motechproject.newebodac.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

  private static final RoleMapper MAPPER = RoleMapper.INSTANCE;
  private static final PermissionMapper PERMISSION_MAPPER = PermissionMapper.INSTANCE;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PermissionRepository permissionRepository;

  public List<RoleDto> getAll() {
    return MAPPER.toDtos(roleRepository.findAll());
  }

  public List<PermissionDto> getAllPermissions() {
    return PERMISSION_MAPPER.toDtos(permissionRepository.findAll());
  }

  public RoleDto findById(UUID id) {
    return MAPPER.toDto(roleRepository.getOne(id));
  }

  public RoleDto create(RoleDto roleDto) {
    return MAPPER.toDto(roleRepository.save(MAPPER.fromDto(roleDto)));
  }

  /**
   * Updates data from dto to role object, saves it and returns dto of it.
   * @param id ID of object to update.
   * @param roleDto Dto of role to update.
   * @return Dto of of updated role
   */
  public RoleDto update(UUID id, RoleDto roleDto) {
    UserRole role = roleRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Role with id: {0} not found", id.toString()));
    MAPPER.update(roleDto, role);
    return MAPPER.toDto(roleRepository.save(role));
  }

  /**
    * Deletes role with given id.
    * @param id ID of role to delete.
    */
  public void delete(UUID id) {
    UserRole role = roleRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Role with id: {0} not found", id.toString()));
    roleRepository.delete(role);
  }
}
