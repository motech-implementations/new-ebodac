package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.AppSettings;
import org.motechproject.newebodac.dto.AppSettingsDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppSettingsMapper extends EntityMapper<AppSettingsDto, AppSettings> {

  AppSettingsMapper INSTANCE = Mappers.getMapper(AppSettingsMapper.class);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(AppSettingsDto appSettingsDto, @MappingTarget AppSettings appSettings);
}
