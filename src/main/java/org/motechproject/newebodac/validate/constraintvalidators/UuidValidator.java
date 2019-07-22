package org.motechproject.newebodac.validate.constraintvalidators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.validate.Uuid;
import org.motechproject.newebodac.validate.ValidationUtils;

public class UuidValidator implements ConstraintValidator<Uuid, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return StringUtils.isEmpty(value) || ValidationUtils.isValidUuidString(value);
  }

  @Override
  public void initialize(Uuid parameters) {
    // we don't need any passed parameters
  }
}
