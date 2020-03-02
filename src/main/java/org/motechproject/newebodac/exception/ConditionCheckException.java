package org.motechproject.newebodac.exception;

public class ConditionCheckException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public ConditionCheckException(String message) {
    super(message);
  }

  public ConditionCheckException(Throwable cause, String message) {
    super(cause, message);
  }

  public ConditionCheckException(String format, Object... parameters) {
    super(format, parameters);
  }

  public ConditionCheckException(Throwable cause, String format, Object... parameters) {
    super(cause, format, parameters);
  }
}
