package org.motechproject.newebodac.web;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
  public List<LanguageDto> getLanguages() {

    Iterable<Language> languages = languageService.getLanguages();

    return languageService.getLanguagesDtos(languages);
  }

  @RequestMapping(value = "/language/{languageId}", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public LanguageDto findById(@PathVariable(value = "languageId") UUID languageId) {

    return languageService.getLanguageDto(languageService.findById(languageId));
  }

  /**
   * Creates language with given name and code and saves it into the database.
   * @param name Name of language.
   * @param code Code of language.
   * @return Dto of created language.
   */
  @RequestMapping(value = "/language/create", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public LanguageDto createLanguage(@RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "code", required = false) String code) {

    Language language = new Language();
    language.setCode(code);
    language.setName(name);

    return languageService.getLanguageDto(languageService.createLanguage(language));
  }
}
