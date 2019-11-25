package org.motechproject.newebodac.mapper;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.JsonConfig;
import org.motechproject.newebodac.domain.JsonField;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.JsonConfigDto;
import org.motechproject.newebodac.dto.JsonFieldDto;
import org.motechproject.newebodac.dto.JsonFieldValueToEntityDto;
import org.motechproject.newebodac.dto.JsonFieldValueToEnumDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
@SuppressWarnings({"PMD.TooManyMethods"})
public interface JsonConfigMapper extends EntityMapper<JsonConfigDto, JsonConfig> {

  JsonConfigMapper INSTANCE = Mappers.getMapper(JsonConfigMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  JsonConfig fromDto(JsonConfigDto jsonConfigDto);

  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "fieldConfig", source = "fieldConfigId")
  JsonField fromDto(JsonFieldDto jsonFieldDto);

  default Map<String, UUID> fromDto(Set<JsonFieldValueToEntityDto> jsonFieldValueMap) {
    return jsonFieldValueMap.stream().collect(Collectors
        .toMap(JsonFieldValueToEntityDto::getFieldValue, JsonFieldValueToEntityDto::getEntityId));
  }

  default Map<String, String> fromDtoEnum(Set<JsonFieldValueToEnumDto> jsonFieldValueEnumMap) {
    return jsonFieldValueEnumMap.stream().collect(Collectors
        .toMap(JsonFieldValueToEnumDto::getFieldValue, JsonFieldValueToEnumDto::getEnumValue));
  }

  @Mapping(target = "fieldConfigId", source = "fieldConfig")
  JsonFieldDto toDto(JsonField jsonField);

  default Set<JsonFieldValueToEntityDto> toDto(Map<String, UUID> jsonFieldValueMap) {
    return jsonFieldValueMap.entrySet().stream().map(elem ->
        new JsonFieldValueToEntityDto(elem.getKey(), elem.getValue())).collect(Collectors.toSet());
  }

  default Set<JsonFieldValueToEnumDto> toDtoEnum(Map<String, String> jsonFieldValueEnumMap) {
    return jsonFieldValueEnumMap.entrySet().stream().map(elem ->
        new JsonFieldValueToEnumDto(elem.getKey(), elem.getValue())).collect(Collectors.toSet());
  }

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  void updateFromDto(JsonConfigDto jsonConfigDto, @MappingTarget JsonConfig jsonConfig);

  /**
   * Creates String from EntityType.
   * @param entityType EntityType.
   * @return String representation of EntityType;
   */
  default String fromEntityType(EntityType entityType) {
    if (entityType == null) {
      return null;
    }
    return entityType.getName();
  }

  default EntityType toEntityType(String entityType) {
    return EntityType.getByName(entityType);
  }

  default FieldConfig toFieldConfig(UUID id) {
    return new FieldConfig(id);
  }

  default UUID toUuid(FieldConfig fieldConfig) {
    return fieldConfig.getId();
  }
}
