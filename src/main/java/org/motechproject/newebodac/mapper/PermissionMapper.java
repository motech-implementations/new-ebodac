package org.motechproject.newebodac.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.security.UserPermission;
import org.motechproject.newebodac.dto.PermissionDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PermissionMapper {

  PermissionMapper INSTANCE = Mappers.getMapper(PermissionMapper.class);

  List<PermissionDto> toDtos(Iterable<UserPermission> permissions);

}
