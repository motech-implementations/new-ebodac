package org.motechproject.newebodac.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.dto.FieldConfigDto;

@Mapper(uses = { UuidMapper.class },
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FieldConfigMapper {

  FieldConfigMapper INSTANCE = Mappers.getMapper(FieldConfigMapper.class);

  FieldConfigDto toDto(FieldConfig fieldConfig);

  @Mapping(target = "id", ignore = true)
  FieldConfig fromDto(FieldConfigDto fieldConfigDto);

  List<FieldConfigDto> toDtos(Iterable<FieldConfig> fieldConfigs);
}
