package org.motechproject.newebodac.exception;

public class RelationViolationException extends BaseFormattedException {

  private static final long serialVersionUID = 1L;

  public RelationViolationException(String displayMessage) {
    super(displayMessage);
  }

  public RelationViolationException(String format, Object... parameters) {
    super(format, parameters);
  }
}
