package org.motechproject.newebodac.service;

import java.util.UUID;
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

  public Language findById(UUID id) { return languageRepository.getOne(id); }
}
