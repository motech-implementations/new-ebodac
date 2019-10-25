package org.motechproject.newebodac.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.motechproject.newebodac.exception.NewEbodacException;

@AllArgsConstructor
public class ErrorResponse {

  @Getter
  private String message;

  @Getter
  private String details;

  /**
   * Creates new error response with message.
   * @param message message displayed to the user
   */
  public ErrorResponse(String message) {
    this.message = message;
  }

  /**
   * Creates new error response with message and stacktrace.
   * @param message message displayed to the user
   * @param ex cause of the error
   */
  public ErrorResponse(String message, Exception ex) {
    this.message = message;
    this.details = ex.getMessage();
  }

  /**
   * Creates new error response with message, details and stacktrace.
   * @param ex cause of the error
   */
  public ErrorResponse(NewEbodacException ex) {
    this.message = ex.getDisplayMessage();
    this.details = ex.getDetails();
  }
}
