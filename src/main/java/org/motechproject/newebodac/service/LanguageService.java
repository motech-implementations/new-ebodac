package org.motechproject.newebodac.service;

import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

  @Autowired
  private LanguageRepository languageRepository;

  public Iterable<Language> getLanguages() {
    return languageRepository.findAll();
  }

  public Language createLanguage(Language language) {
    return languageRepository.save(language);
  }
}
