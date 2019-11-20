package org.motechproject.newebodac.mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.enums.FieldType;
import org.motechproject.newebodac.dto.ExtraFieldDto;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ExtraFieldMapper extends EntityMapper<ExtraFieldDto, ExtraField> {

  @Override
  default ExtraField fromDto(ExtraFieldDto extraFieldDto) {
    ExtraField extraField = new ExtraField();
    FieldType fieldType = FieldType.valueOf(extraFieldDto.getFieldType());
    setValue(extraField, extraFieldDto);
    extraField.setFieldType(fieldType);
    extraField.setName(extraFieldDto.getName());
    extraField.setId(extraFieldDto.getId());
    extraField.setCreateDate(extraFieldDto.getCreateDate());
    return extraField;
  }

  @Override
  @Mapping(target = "value", expression = "java(toValue(extraField))")
  ExtraFieldDto toDto(ExtraField extraField);

  /**
   * Gets fields related to fieldType and casts it to string.
   * @param extraField Mapped entity.
   * @return String value of related to fieldType field.
   */
  default String toValue(ExtraField extraField) {
    String result;
    switch (extraField.getFieldType()) {
      case TEXT:
        result = extraField.getTextVal();
        break;
      case LONG_TEXT:
        result = extraField.getLongTextVal();
        break;
      case INTEGER:
        result = Objects.toString(extraField.getIntVal(), null);
        break;
      case FLOAT:
        result = Objects.toString(extraField.getFloatVal(), null);
        break;
      case BOOLEAN:
        result = Objects.toString(extraField.getBoolVal(), null);
        break;
      case DATE:
        result = Objects.toString(extraField.getDateVal(), null);
        break;
      case DATE_TIME:
        result = Objects.toString(extraField.getDatetimeVal(), null);
        break;
      default:
        return null;
    }
    return result;
  }

  /**
   * Sets Extrafield value from string to corresponding value depending on field type.
   * @param extraField Target object to set corresponding value.
   * @param extraFieldDto Source of data to set.
   */
  private void setValue(ExtraField extraField, ExtraFieldDto extraFieldDto) {
    FieldType fieldType = FieldType.valueOf(extraFieldDto.getFieldType());
    String extraFieldValue = extraFieldDto.getValue();
    if (StringUtils.isNotBlank(extraFieldValue)) {
      switch (fieldType) {
        case TEXT:
          extraField.setTextVal(extraFieldValue);
          break;
        case LONG_TEXT:
          extraField.setLongTextVal(extraFieldValue);
          break;
        case INTEGER:
          extraField.setIntVal(Integer.parseInt(extraFieldValue));
          break;
        case FLOAT:
          extraField.setFloatVal(Double.parseDouble(extraFieldValue));
          break;
        case BOOLEAN:
          extraField.setBoolVal(Boolean.parseBoolean(extraFieldValue));
          break;
        case DATE:
          extraField.setDateVal(LocalDate.parse(extraFieldValue));
          break;
        case DATE_TIME:
          extraField.setDatetimeVal(LocalDateTime.parse(extraFieldValue));
          break;
        default:
          break;
      }
    }
  }
}
