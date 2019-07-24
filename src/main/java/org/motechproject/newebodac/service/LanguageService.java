package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.mapper.LanguageMapper;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

  @Autowired
  private LanguageRepository languageRepository;

  private static final LanguageMapper LANGUAGE_MAPPER = LanguageMapper.INSTANCE;

  public Iterable<Language> getLanguages() {
    return languageRepository.findAll();
  }

  public Language createLanguage(Language language) {
    return languageRepository.save(language);
  }

  public Language findById(UUID id) {
    return languageRepository.getOne(id);
  }

  public LanguageDto getLanguageDto(Language language) {
    return LANGUAGE_MAPPER.toDto(language);
  }

  public List<LanguageDto> getLanguagesDtos(Iterable<Language> languages) {
    return LANGUAGE_MAPPER.toDtos(languages);
  }
}
