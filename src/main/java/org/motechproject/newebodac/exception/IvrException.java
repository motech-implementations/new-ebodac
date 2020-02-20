package org.motechproject.newebodac.exception;

public class IvrException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public IvrException(String message) {
    super(message);
  }

  public IvrException(Throwable cause, String message) {
    super(cause, message);
  }
}
