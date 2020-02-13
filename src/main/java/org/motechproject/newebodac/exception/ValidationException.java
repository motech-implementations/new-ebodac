package org.motechproject.newebodac.exception;

public class ValidationException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public ValidationException(String displayMessage) {
    super(displayMessage);
  }

  public ValidationException(String format, Object... parameters) {
    super(format, parameters);
  }
}
