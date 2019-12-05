package org.motechproject.newebodac.constants;

@SuppressWarnings({"PMD.ClassNamingConventions"})
public final class ValidationMessages {

  public static final String CSV_OR_JSON_CONFIG_HAS_NO_KEY_FIELD = "You must add at least "
      + "one unique field (or combination of fields) that can be used to identify and update"
      + " the entity";

  private ValidationMessages() {
  }
}
