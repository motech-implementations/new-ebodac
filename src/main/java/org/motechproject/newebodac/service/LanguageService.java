package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.mapper.LanguageMapper;
import org.motechproject.newebodac.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

  @Autowired
  private LanguageRepository languageRepository;

  private static final LanguageMapper LANGUAGE_MAPPER = LanguageMapper.INSTANCE;

  public LanguageDto createLanguage(LanguageDto languageDto) {
    return LANGUAGE_MAPPER.toDto(
        languageRepository.save(LANGUAGE_MAPPER.fromDto(languageDto))
    );
  }

  public LanguageDto findById(UUID id) {
    return LANGUAGE_MAPPER.toDto(languageRepository.getOne(id));
  }

  public List<LanguageDto> getLanguagesDtos() {
    return LANGUAGE_MAPPER.toDtos(languageRepository.findAll());
  }
}
