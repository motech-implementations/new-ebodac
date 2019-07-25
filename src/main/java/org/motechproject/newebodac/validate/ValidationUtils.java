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
}
