package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
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

  /**
   * Deletes language with given id.
   * @param id ID of language to delete.
   */
  public void delete(UUID id) {
    Language language = languageRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Language with id: {0} not found", id.toString()));
    languageRepository.delete(language);
  }
}
