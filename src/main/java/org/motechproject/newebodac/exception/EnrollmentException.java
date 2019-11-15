package org.motechproject.newebodac.exception;

public class EnrollmentException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public EnrollmentException(String message) {
    super(message);
  }

  public EnrollmentException(String format, Object... parameters) {
    super(format, parameters);
  }
}
