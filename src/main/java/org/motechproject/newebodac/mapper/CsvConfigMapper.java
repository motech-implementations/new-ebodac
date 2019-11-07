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
import org.motechproject.newebodac.domain.CsvConfig;
import org.motechproject.newebodac.domain.CsvField;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.CsvConfigDto;
import org.motechproject.newebodac.dto.CsvFieldDto;
import org.motechproject.newebodac.dto.CsvFieldValueToEntityDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CsvConfigMapper extends EntityMapper<CsvConfigDto, CsvConfig> {

  CsvConfigMapper INSTANCE = Mappers.getMapper(CsvConfigMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  CsvConfig fromDto(CsvConfigDto csvConfigDto);

  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "fieldConfig", source = "fieldConfigId")
  CsvField fromDto(CsvFieldDto csvFieldDto);


  default Map<String, UUID> fromDto(Set<CsvFieldValueToEntityDto> csvFieldValueMap) {
    return csvFieldValueMap.stream().collect(Collectors
        .toMap(CsvFieldValueToEntityDto::getFieldValue, CsvFieldValueToEntityDto::getEntityId));
  }

  @Mapping(target = "fieldConfigId", source = "fieldConfig")
  CsvFieldDto toDto(CsvField csvField);

  default Set<CsvFieldValueToEntityDto> toDto(Map<String, UUID> csvFieldValueMap) {
    return csvFieldValueMap.entrySet().stream().map(elem ->
        new CsvFieldValueToEntityDto(elem.getKey(), elem.getValue())).collect(Collectors.toSet());
  }

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  void updateFromDto(CsvConfigDto csvConfigDto, @MappingTarget CsvConfig csvConfig);

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
