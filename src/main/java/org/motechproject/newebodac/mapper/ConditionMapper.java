package org.motechproject.newebodac.mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.motechproject.newebodac.domain.Condition;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.dto.ConditionDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ConditionMapper extends EntityMapper<ConditionDto, Condition> {

  @Override
  @Mapping(target = "value", expression = "java(toValue(condition))")
  ConditionDto toDto(Condition condition);

  /**
   * Map UUID to FieldConfig, create field config with given id.
   * @param id id of the field config
   * @return field config with given id
   */
  default FieldConfig toFieldConfig(UUID id) {
    if (id == null) {
      return null;
    }

    return new FieldConfig(id);
  }

  /**
   * Map FieldConfig to UUID, get the id.
   * @param fieldConfig field config to be mapped
   * @return id of field config
   */
  default UUID fromFieldConfig(FieldConfig fieldConfig) {
    if (fieldConfig == null) {
      return null;
    }

    return fieldConfig.getId();
  }

  /**
   * Map condition value depending of the fieldType.
   * @param condition condition which value should be mapped.
   * @return value of the condition
   */
  @SuppressWarnings({"checkstyle:FallThroughCheck", "PMD.CyclomaticComplexity"})
  default String toValue(Condition condition) {
    switch (condition.getFieldType()) {
      case TEXT:
      case LONG_TEXT:
      case ENUM:
        return condition.getTextVal();
      case BOOLEAN:
        return Objects.toString(condition.getBoolVal(), null);
      case INTEGER:
        return Objects.toString(condition.getIntVal(), null);
      case FLOAT:
        return Objects.toString(condition.getFloatVal(), null);
      case DATE:
        return condition.getDateVal() == null ? null
            : condition.getDateVal().format(DateTimeFormatter.ISO_LOCAL_DATE);
      case DATE_TIME:
        return condition.getDatetimeVal() == null ? null
            : condition.getDatetimeVal().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
      case RELATION:
        return Objects.toString(condition.getIdVal(), null);
      default:
        return null;
    }
  }

  /**
   * Parse and map the value from Dto to corresponding type depending on fieldType.
   * @param conditionDto DTO with value that should be mapped
   * @param condition the mapping target
   */
  @AfterMapping
  default void setConditionValue(ConditionDto conditionDto, @MappingTarget Condition condition) {
    String value = conditionDto.getValue();

    if (StringUtils.isNotBlank(value)) {
      switch (condition.getFieldType()) {
        case BOOLEAN:
          condition.setBoolVal(Boolean.parseBoolean(value));
          break;
        case INTEGER:
          condition.setIntVal(Integer.parseInt(value));
          break;
        case FLOAT:
          condition.setFloatVal(Double.parseDouble(value));
          break;
        case DATE:
          condition.setDateVal(LocalDate.parse(value));
          break;
        case DATE_TIME:
          condition.setDatetimeVal(LocalDateTime.parse(value));
          break;
        case RELATION:
          condition.setIdVal(UUID.fromString(value));
          break;
        default:
          condition.setTextVal(value);
          break;
      }
    }
  }
}
