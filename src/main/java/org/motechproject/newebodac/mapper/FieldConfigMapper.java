package org.motechproject.newebodac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.FieldConfigDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FieldConfigMapper extends EntityMapper<FieldConfigDto, FieldConfig> {

  FieldConfigMapper INSTANCE = Mappers.getMapper(FieldConfigMapper.class);

  @Override
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "base", ignore = true)
  @Mapping(target = "relatedEntity", ignore = true)
  @Mapping(target = "relatedField", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  FieldConfig fromDto(FieldConfigDto fieldConfigDto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "base", ignore = true)
  @Mapping(target = "name", ignore = true)
  @Mapping(target = "entity", ignore = true)
  @Mapping(target = "fieldType", ignore = true)
  @Mapping(target = "relatedEntity", ignore = true)
  @Mapping(target = "relatedField", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  @Mapping(target = "hidden", ignore = true)
  @Mapping(target = "fieldOrder", ignore = true)
  void updateFromDto(FieldConfigDto fieldConfigDto, @MappingTarget FieldConfig fieldConfig);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "base", ignore = true)
  @Mapping(target = "name", ignore = true)
  @Mapping(target = "entity", ignore = true)
  @Mapping(target = "fieldType", ignore = true)
  @Mapping(target = "relatedEntity", ignore = true)
  @Mapping(target = "relatedField", ignore = true)
  @Mapping(target = "updateDate", ignore = true)
  @Mapping(target = "createDate", ignore = true)
  void updateOrderFromDto(FieldConfigDto fieldConfigDto, @MappingTarget FieldConfig fieldConfig);
  
  /**
   * Create String form EntityType.
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
}
