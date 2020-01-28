package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.domain.security.UserRole;
import org.motechproject.newebodac.dto.UserDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends EntityMapper<UserDto, User> {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  @Mapping(target = "roles", source = "roleIds")
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(UserDto userDto, @MappingTarget User user);

  @Mapping(target = "password", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "username", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void adminUpdate(UserDto userDto, @MappingTarget User user);

  @Mapping(target = "roleIds", source = "roles")
  @Mapping(target = "password", ignore = true)
  @Override
  UserDto toDto(User user);

  @Mapping(target = "roles", source = "roleIds")
  @Override
  User fromDto(UserDto userDto);

  default UserRole toUserRole(UUID id) {
    return new UserRole(id);
  }

  default UUID toUuid(UserRole userRole) {
    return userRole.getId();
  }
}
