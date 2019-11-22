package org.motechproject.newebodac.exception;

public class UserAlreadyExistsException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public UserAlreadyExistsException(String displayMessage) {
    super(displayMessage);
  }

  public UserAlreadyExistsException(String format, Object... parameters) {
    super(format, parameters);
  }
}
