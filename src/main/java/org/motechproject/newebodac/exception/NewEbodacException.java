package org.motechproject.newebodac.exception;

import lombok.Getter;

public class NewEbodacException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  @Getter
  private String displayMessage;

  @Getter
  private String details;

  /**
   * Creates new exception with display message.
   * @param displayMessage message that will be displayed to the user
   */
  public NewEbodacException(String displayMessage) {
    super(displayMessage);
    this.displayMessage = displayMessage;
  }

  /**
   * Creates new exception with display message and cause.
   * @param displayMessage message that will be displayed to the user
   * @param cause cause of this exception
   */
  public NewEbodacException(String displayMessage, Throwable cause) {
    super(getMessage(displayMessage, cause), cause);

    this.displayMessage = displayMessage;
    this.details = getCauseMessage(cause);
  }

  private static String getMessage(String displayMessage, Throwable cause) {
    return displayMessage + "\n" + getCauseMessage(cause);
  }

  private static String getCauseMessage(Throwable cause) {
    return "Caused by: " + cause.getMessage();
  }
}
