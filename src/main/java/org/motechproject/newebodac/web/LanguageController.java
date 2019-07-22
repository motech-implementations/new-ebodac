package org.motechproject.newebodac.web;

import java.util.List;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.mapper.LanguageMapper;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class LanguageController extends BaseController{

  @Autowired
  private LanguageService languageService;

  private LanguageMapper languageMapper = LanguageMapper.INSTANCE;

  @RequestMapping(value = "/languages", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<LanguageDto> getLanguages() {

    Iterable<Language> languages = languageService.getLanguages();

    return languageMapper.toDtos(languages);
  }
  @RequestMapping(value = "/languages/create", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  public List<LanguageDto> createLanguage(@RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "code", required = false) String code) {

    Language language = new Language();

    language.setCode(code);

    language.setName(name);

    languageService.createLanguage(language);

    Iterable<Language> languages = languageService.getLanguages();

    return languageMapper.toDtos(languages);
  }
}
