package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.IvrJsonField;
import org.motechproject.newebodac.domain.IvrProviderConfig;
import org.motechproject.newebodac.dto.IvrJsonFieldDto;
import org.motechproject.newebodac.dto.IvrProviderConfigDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IvrProviderConfigMapper
    extends EntityMapper<IvrProviderConfigDto, IvrProviderConfig> {

  IvrProviderConfigMapper INSTANCE = Mappers.getMapper(IvrProviderConfigMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  IvrProviderConfig fromDto(IvrProviderConfigDto ivrProviderConfigDto);

  /**
   * Map IVR Provider Config to id.
   * @param ivrProviderConfig IVR Provider Config
   * @return id of the IVR Provider Config
   */
  default UUID fromIvrProviderConfig(IvrProviderConfig ivrProviderConfig) {
    if (ivrProviderConfig != null) {
      return ivrProviderConfig.getId();
    }

    return null;
  }

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  void updateFromDto(IvrProviderConfigDto ivrProviderConfigDto,
      @MappingTarget IvrProviderConfig ivrProviderConfig);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "parentField", ignore = true)
  void updateFromDto(IvrJsonFieldDto ivrJsonFieldDto, @MappingTarget IvrJsonField ivrJsonField);

  @Mapping(target = "parentField", ignore = true)
  IvrJsonField fromJsonFieldDto(IvrJsonFieldDto ivrJsonFieldDto);

  IvrJsonFieldDto toJsonFieldDto(IvrJsonField ivrJsonField);

  /**
   * Create IVR Provider Config with given id.
   * @param id id of IVR Provider Config
   * @return IVR Provider Config with given id
   */
  default IvrProviderConfig toIvrProviderConfig(UUID id) {
    if (id != null) {
      return new IvrProviderConfig(id);
    }

    return null;
  }

  /**
   * Set parent for all child IVR Json Fields.
   */
  @AfterMapping
  default void setJsonFieldParent(@MappingTarget IvrJsonField ivrJsonField) {
    if (ivrJsonField.getChildFields() != null && !ivrJsonField.getChildFields().isEmpty()) {
      ivrJsonField.getChildFields().forEach(field -> field.setParentField(ivrJsonField));
    }
  }

  /**
   * Set relation for IVR Json Fields.
   */
  @AfterMapping
  default void setJsonFieldProvider(@MappingTarget IvrProviderConfig ivrProviderConfig) {
    if (ivrProviderConfig.getRequestFields() != null) {
      ivrProviderConfig.getRequestFields().setRequestConfig(ivrProviderConfig);
    }
    if (ivrProviderConfig.getResponseFields() != null) {
      ivrProviderConfig.getResponseFields().setResponseConfig(ivrProviderConfig);
    }
    if (ivrProviderConfig.getCallbackFields() != null) {
      ivrProviderConfig.getCallbackFields().setCallbackConfig(ivrProviderConfig);
    }
  }
}
