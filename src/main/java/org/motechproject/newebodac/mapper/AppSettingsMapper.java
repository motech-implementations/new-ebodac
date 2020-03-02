package org.motechproject.newebodac.mapper;

import java.util.Set;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.AppSettings;
import org.motechproject.newebodac.domain.Condition;
import org.motechproject.newebodac.dto.AppSettingsDto;

@Mapper(uses = { ConditionMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppSettingsMapper extends EntityMapper<AppSettingsDto, AppSettings> {

  AppSettingsMapper INSTANCE = Mappers.getMapper(AppSettingsMapper.class);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  void update(AppSettingsDto appSettingsDto, @MappingTarget AppSettings appSettings);

  /**
   * Set parent for all app setting's conditions.
   * @param appSettings the AppSettings entity
   */
  @AfterMapping
  default void setConditionParent(@MappingTarget AppSettings appSettings) {
    Set<Condition> conditions = appSettings.getEnrollmentConditions();

    if (conditions != null && !conditions.isEmpty()) {
      conditions.forEach(condition -> condition.setAppSettings(appSettings));
    }
  }
}
