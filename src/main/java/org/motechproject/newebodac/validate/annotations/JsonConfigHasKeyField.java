package org.motechproject.newebodac.validate.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import org.motechproject.newebodac.constants.ValidationMessages;
import org.motechproject.newebodac.validate.constraintvalidators.JsonFieldValidator;

@Documented
@Constraint(validatedBy = JsonFieldValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface JsonConfigHasKeyField {

  /**
   * Specify the message in case of a validation error.
   *
   * @return the message about the error.
   */
  String message() default ValidationMessages.CSV_OR_JSON_CONFIG_HAS_NO_KEY_FIELD;

  /**
   * Specify validation groups, to which this constraint belongs.
   *
   * @return array with group classes
   */
  Class<?>[] groups() default { };

  /**
   * Specify custom payload objects.
   *
   * @return array with payload classes.
   */
  Class<? extends Payload>[] payload() default { };
}
