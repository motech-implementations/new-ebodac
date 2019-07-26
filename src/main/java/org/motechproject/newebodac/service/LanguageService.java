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

  private static final LanguageMapper MAPPER = LanguageMapper.INSTANCE;

  @Autowired
  private LanguageRepository languageRepository;

  public List<LanguageDto> getAll() {
    return MAPPER.toDtos(languageRepository.findAll());
  }

  public LanguageDto findById(UUID id) {
    return MAPPER.toDto(languageRepository.getOne(id));
  }

  public LanguageDto create(LanguageDto languageDto) {
    return MAPPER.toDto(languageRepository.save(MAPPER.fromDto(languageDto)));
  }
}
