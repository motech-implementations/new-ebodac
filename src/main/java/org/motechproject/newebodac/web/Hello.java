package org.motechproject.newebodac.web;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/api")
public class Hello {

  @GetMapping("/hello")
  @ResponseStatus(HttpStatus.OK)
  public void hello() {
  }
}
