package org.motechproject.newebodac.validate;

import java.util.regex.Pattern;

public final class ValidationUtils {

  private static final String UUID_PATTERN =
      "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$";

  public static boolean isValidUuidString(String string) {
    return matchPattern(UUID_PATTERN, string);
  }

  public static boolean matchPattern(String stringPattern, String value) {
    Pattern pattern = Pattern.compile(stringPattern);
    return pattern.matcher(value).matches();
  }

  /**
   * Add the custom violation message as the error message for a inner field.
   *
   * @param context is the validation context
   * @param fieldName is the name of the field inner the object to which the annotation was applied
   * @param message is the violation message that will be reported as the error message
   */
}
