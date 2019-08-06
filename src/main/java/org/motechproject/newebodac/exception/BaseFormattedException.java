package org.motechproject.newebodac.exception;

import java.text.MessageFormat;

public abstract class BaseFormattedException extends NewEbodacException {

  private static final long serialVersionUID = 1L;

  public BaseFormattedException(String message) {
    super(message);
  }

  public BaseFormattedException(Throwable cause, String message) {
    super(message, cause);
  }

  public BaseFormattedException(String format, final Object... parameters) {
    super(MessageFormat.format(format, parameters));
  }

  public BaseFormattedException(Throwable cause, String format, final Object... parameters) {
    super(MessageFormat.format(format, parameters), cause);
  }
}
