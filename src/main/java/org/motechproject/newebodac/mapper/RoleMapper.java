package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.security.UserPermission;
import org.motechproject.newebodac.domain.security.UserRole;
import org.motechproject.newebodac.dto.RoleDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper extends EntityMapper<RoleDto, UserRole> {

  RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

  @Mapping(target = "permissions", source = "permissionIds")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "readonly", ignore = true)
  void update(RoleDto roleDto, @MappingTarget UserRole role);

  @Mapping(target = "permissionIds", source = "permissions")
  @Override
  RoleDto toDto(UserRole userRole);

  @Mapping(target = "permissions", source = "permissionIds")
  @Override
  UserRole fromDto(RoleDto roleDto);

  default UserPermission toUserPermission(UUID id) {
    return new UserPermission(id);
  }

  default UUID toUuid(UserPermission userPermission) {
    return userPermission.getId();
  }
}
