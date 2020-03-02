package org.motechproject.newebodac.helper;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.Condition;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.domain.enums.FieldType;
import org.motechproject.newebodac.domain.enums.Operator;
import org.motechproject.newebodac.exception.ConditionCheckException;
import org.springframework.util.ReflectionUtils;

@SuppressWarnings({"PMD.CyclomaticComplexity", "PMD.TooManyMethods", "PMD.GodClass"})
public class ConditionCheckHelper {

  private static final String EXTRA_FIELDS = "extraFields";

  /**
   * Check if the condition is met for given entity.
   * @param condition condition to be checked
   * @param entity entity to be checked
   * @return true if given condition is met
   */
  public static boolean checkCondition(Condition condition, BaseEntity entity) {
    FieldConfig fieldConfig = condition.getFieldConfig();
    FieldType fieldType = condition.getFieldType();

    Object fieldValue = getFieldValue(fieldConfig, entity);
    Object conditionValue = getConditionValue(condition);
    Operator operator = condition.getOperator();

    try {
      switch (fieldType) {
        case TEXT:
        case LONG_TEXT:
          return checkTextVal((String) fieldValue, (String) conditionValue, operator);
        case INTEGER:
          return checkIntVal((Integer) fieldValue, (Integer) conditionValue, operator);
        case FLOAT:
          return checkFloatVal((Double) fieldValue, (Double) conditionValue, operator);
        case BOOLEAN:
          return checkBoolVal((Boolean) fieldValue, (Boolean) conditionValue, operator);
        case DATE:
          return checkDateVal((LocalDate) fieldValue, (LocalDate) conditionValue, operator);
        case DATE_TIME:
          return checkDateTimeVal((LocalDateTime) fieldValue,
              (LocalDateTime) conditionValue, operator);
        case ENUM:
          return checkEnumVal(fieldValue, (String) conditionValue, operator);
        case RELATION:
          return checkRelationVal((BaseEntity) fieldValue, (UUID) conditionValue, operator);
        default:
          throw new ConditionCheckException("Field type: {0} not supported", fieldType.name());
      }
    } catch (ClassCastException e) {
      throw new ConditionCheckException(e, "Wrong value type in field: {0}", fieldConfig.getName());
    }
  }

  private static boolean checkTextVal(String fieldVal, String conditionVal, Operator operator) {
    switch (operator) {
      case IS_NULL:
        return fieldVal == null;
      case IS_NOT_NULL:
        return fieldVal != null;
      case IS_EMPTY:
        return StringUtils.isEmpty(fieldVal);
      case IS_NOT_EMPTY:
        return StringUtils.isNotEmpty(fieldVal);
      case IS_BLANK:
        return StringUtils.isBlank(fieldVal);
      case IS_NOT_BLANK:
        return StringUtils.isNotBlank(fieldVal);
      case EQUALS:
        return StringUtils.equals(fieldVal, conditionVal);
      case EQUALS_IGNORE_CASE:
        return StringUtils.equalsIgnoreCase(fieldVal, conditionVal);
      case NOT_EQUALS:
        return !StringUtils.equals(fieldVal, conditionVal);
      case CONTAINS:
        return StringUtils.contains(fieldVal, conditionVal);
      case CONTAINS_IGNORE_CASE:
        return StringUtils.containsIgnoreCase(fieldVal, conditionVal);
      default:
        throw new ConditionCheckException(
            "Operator: {0} not supported for text field", operator.name());
    }
  }

  private static boolean checkBoolVal(Boolean fieldVal, Boolean conditionVal, Operator operator) {
    switch (operator) {
      case IS_NULL:
        return fieldVal == null;
      case IS_NOT_NULL:
        return fieldVal != null;
      case EQUALS:
        return Objects.equals(fieldVal, conditionVal);
      case NOT_EQUALS:
        return !Objects.equals(fieldVal, conditionVal);
      default:
        throw new ConditionCheckException(
            "Operator: {0} not supported for boolean field", operator.name());
    }
  }

  private static boolean checkIntVal(Integer fieldVal, Integer conditionVal, Operator operator) {
    return checkComparableVal(fieldVal, conditionVal, operator);
  }

  private static boolean checkFloatVal(Double fieldVal, Double conditionVal, Operator operator) {
    if (fieldVal != null && conditionVal != null) {
      BigDecimal fieldValBd = new BigDecimal(fieldVal);
      BigDecimal conditionValBd = new BigDecimal(conditionVal);

      return checkComparableVal(fieldValBd, conditionValBd, operator);
    }

    return checkComparableVal(fieldVal, conditionVal, operator);
  }

  private static boolean checkDateVal(LocalDate fieldVal, LocalDate condVal, Operator operator) {
    return checkComparableDates(fieldVal, condVal, LocalDate.now(), operator);
  }

  private static boolean checkDateTimeVal(LocalDateTime fieldVal,
      LocalDateTime conditionVal, Operator operator) {
    return checkComparableDates(fieldVal, conditionVal, LocalDateTime.now(), operator);
  }

  private static boolean checkRelationVal(BaseEntity fieldVal, UUID condVal, Operator operator) {
    UUID fieldValId = fieldVal == null ? null : fieldVal.getId();

    switch (operator) {
      case IS_NULL:
        return fieldVal == null;
      case IS_NOT_NULL:
        return fieldVal != null;
      case EQUALS:
        return Objects.equals(fieldValId, condVal);
      case NOT_EQUALS:
        return !Objects.equals(fieldValId, condVal);
      default:
        throw new ConditionCheckException(
            "Operator: {0} not supported for relation field", operator.name());
    }
  }

  private static boolean checkEnumVal(Object fieldVal, String conditionVal, Operator operator) {
    String enumVal = fieldVal == null ? null : fieldVal.toString();

    switch (operator) {
      case IS_NULL:
        return enumVal == null;
      case IS_NOT_NULL:
        return enumVal != null;
      case EQUALS:
        return Objects.equals(enumVal, conditionVal);
      case NOT_EQUALS:
        return !Objects.equals(enumVal, conditionVal);
      default:
        throw new ConditionCheckException(
            "Operator: {0} not supported for enum field", operator.name());
    }
  }

  private static <T extends Comparable<T>> boolean checkComparableVal(T fieldVal, T conditionVal,
      Operator operator) {
    Integer compare = null;
    if (fieldVal != null && conditionVal != null) {
      compare = fieldVal.compareTo(conditionVal);
    }

    switch (operator) {
      case IS_NULL:
        return fieldVal == null;
      case IS_NOT_NULL:
        return fieldVal != null;
      case EQUALS:
        return compare != null && compare == 0;
      case NOT_EQUALS:
        return compare != null && compare != 0;
      case GREATER_THAN:
        return compare != null && compare > 0;
      case GREATER_THAT_EQUAL:
        return compare != null && compare >= 0;
      case LESS_THAN:
        return compare != null && compare < 0;
      case LESS_THAN_EQUAL:
        return compare != null && compare <= 0;
      default:
        throw new ConditionCheckException(
            "Operator: {0} not supported for this field", operator.name());
    }
  }

  private static <T extends Comparable<T>> boolean checkComparableDates(T fieldVal, T conditionVal,
      T currentDate, Operator operator) {
    Integer compareToNow = null;

    if (fieldVal != null) {
      compareToNow = fieldVal.compareTo(currentDate);
    }

    switch (operator) {
      case IS_IN_THE_PAST:
        return compareToNow != null && compareToNow < 0;
      case IS_IN_THE_FUTURE:
        return compareToNow != null && compareToNow > 0;
      case IS_NOT_IN_THE_PAST:
        return compareToNow != null && compareToNow >= 0;
      case IS_NOT_IN_THE_FUTURE:
        return compareToNow != null && compareToNow <= 0;
      default:
        return checkComparableVal(fieldVal, conditionVal, operator);
    }
  }

  private static Object getConditionValue(Condition condition) {
    switch (condition.getFieldType()) {
      case DATE:
        return condition.getDateVal();
      case DATE_TIME:
        return condition.getDatetimeVal();
      case BOOLEAN:
        return condition.getBoolVal();
      case INTEGER:
        return condition.getIntVal();
      case FLOAT:
        return condition.getFloatVal();
      case RELATION:
        return condition.getIdVal();
      default:
        return condition.getTextVal();
    }
  }

  private static Object getFieldValue(FieldConfig fieldConfig, BaseEntity entity) {
    String fieldName = fieldConfig.getName();
    EntityType entityType = fieldConfig.getEntity();

    if (fieldConfig.getBase()) {
      return getFieldValue(fieldName, entityType, entity);
    }

    return getExtraFieldValue(fieldName, entityType, entity);
  }

  private static Object getFieldValue(String fieldName, EntityType entityType, BaseEntity entity) {
    try {
      Class<?> entityClass = entityType.getEntityClass();
      Field field = ReflectionUtils.findField(entityClass, fieldName);

      if (field == null) {
        throw new ConditionCheckException("Field with name: {0} not found", fieldName);
      }

      field.setAccessible(true);
      return field.get(entity);
    } catch (IllegalAccessException | IllegalStateException e) {
      throw new ConditionCheckException(e, "Error accessing field: {0}", fieldName);
    }
  }

  private static Object getExtraFieldValue(String fieldName,
      EntityType entityType, BaseEntity entity) {
    Set<ExtraField> fields = (Set<ExtraField>) getFieldValue(EXTRA_FIELDS, entityType,  entity);

    if (fields == null || fields.isEmpty()) {
      return null;
    }

    ExtraField extraField = fields.stream()
        .filter(field -> field.getName().equals(fieldName))
        .findFirst().orElse(null);

    return getExtraFieldValue(extraField);
  }

  private static Object getExtraFieldValue(ExtraField extraField) {
    if (extraField == null) {
      return null;
    }

    switch (extraField.getFieldType()) {
      case TEXT:
      case ENUM:
        return extraField.getTextVal();
      case LONG_TEXT:
        return extraField.getLongTextVal();
      case INTEGER:
        return extraField.getIntVal();
      case FLOAT:
        return extraField.getFloatVal();
      case BOOLEAN:
        return extraField.getBoolVal();
      case DATE:
        return extraField.getDateVal();
      case DATE_TIME:
        return extraField.getDatetimeVal();
      default:
        return null;
    }
  }
}
