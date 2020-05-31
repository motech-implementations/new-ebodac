package org.motechproject.newebodac.errorhandling;

import org.motechproject.newebodac.exception.EnrollmentException;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.NewEbodacException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalErrorHandling extends AbstractErrorHandling {

  @ExceptionHandler(EnrollmentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorResponse handleEnrollmentException(EnrollmentException ex) {
    return logAndGetErrorResponse(ex);
  }

  @ExceptionHandler(NewEbodacException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ResponseBody
  public ErrorResponse handleNewEbodacException(NewEbodacException ex) {
    return logAndGetErrorResponse(ex);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ResponseBody
  public ErrorResponse handleException(Exception ex) {
    String message = "Unexpected error occurred, check the log for more details";
    return logAndGetErrorResponse(message, ex);
  }

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ResponseBody
  public ErrorResponse entityNotFoundException(EntityNotFoundException ex) {
    return logAndGetErrorResponse(ex);
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  @ResponseBody
  public ErrorResponse handleAccessDeniedException(AccessDeniedException ex) {
    return logAndGetErrorResponse("Access denied", ex);
  }
}
