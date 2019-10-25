package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class LanguageController extends BaseController {

  @Autowired
  private LanguageService languageService;

  /**
   * Returns List of language Dtos loaded from the database.
   * @return List of language Dtos.
   */
  @RequestMapping(value = "/language", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<LanguageDto> getAll() {
    return languageService.getAll();
  }

  @RequestMapping(value = "/language/{id}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public LanguageDto findById(@PathVariable("id") UUID id) {
    return languageService.findById(id);
  }

  /**
   * Creates language with given name and code and saves it into the database.
   * @param languageDto Dto of created language.
   * @return Dto of created language.
   */
  @RequestMapping(value = "/language", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public LanguageDto create(@RequestBody @Valid LanguageDto languageDto) {
    return languageService.create(languageDto);
  }

  @RequestMapping(value = "/language/{id}", method = RequestMethod.PUT)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public LanguageDto update(@PathVariable("id") UUID id,
      @RequestBody @Valid LanguageDto languageDto) {
    return languageService.update(id, languageDto);
  }

  @RequestMapping(value = "/language/{id}", method = RequestMethod.DELETE)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public void delete(@PathVariable("id") UUID id) {
    languageService.delete(id);
  }
}
