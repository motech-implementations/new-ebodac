package org.motechproject.newebodac.validate.constraintvalidators;

import java.util.Set;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.motechproject.newebodac.dto.CsvFieldDto;
import org.motechproject.newebodac.validate.annotations.CsvConfigHasKeyField;

public class CsvFieldValidator implements ConstraintValidator<CsvConfigHasKeyField,
    Set<CsvFieldDto>> {

  @Override
  public boolean isValid(Set<CsvFieldDto> csvFieldDtos, ConstraintValidatorContext context) {
    for (CsvFieldDto csvFieldDto : csvFieldDtos) {
      if (csvFieldDto.getKeyField()) {
        return true;
      }
    }
    return false;
  }

  @Override
  public void initialize(CsvConfigHasKeyField parameters) {
    // we don't need any passed parameters
  }
}
