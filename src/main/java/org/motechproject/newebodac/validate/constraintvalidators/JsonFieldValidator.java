package org.motechproject.newebodac.validate.constraintvalidators;

import java.util.Set;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.motechproject.newebodac.dto.JsonFieldDto;
import org.motechproject.newebodac.validate.annotations.JsonConfigHasKeyField;

public class JsonFieldValidator  implements ConstraintValidator<JsonConfigHasKeyField,
    Set<JsonFieldDto>> {

  @Override
  public boolean isValid(Set<JsonFieldDto> jsonFieldDtos, ConstraintValidatorContext context) {
    for (JsonFieldDto jsonFieldDto : jsonFieldDtos) {
      if (jsonFieldDto.getKeyField()) {
        return true;
      }
    }
    return false;
  }

  @Override
  public void initialize(JsonConfigHasKeyField parameters) {
    // we don't need any passed parameters
  }
}
