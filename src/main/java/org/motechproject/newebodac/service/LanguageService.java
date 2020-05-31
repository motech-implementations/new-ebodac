package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.LanguageDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.RelationViolationException;
import org.motechproject.newebodac.mapper.LanguageMapper;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.motechproject.newebodac.repository.LanguageRepository;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

  private static final LanguageMapper MAPPER = LanguageMapper.INSTANCE;

  @Autowired
  private LanguageRepository languageRepository;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  @Autowired
  private FieldConfigService fieldConfigService;

  public List<LanguageDto> getAll() {
    return MAPPER.toDtos(languageRepository.findAll());
  }

  public LanguageDto findById(UUID id) {
    return MAPPER.toDto(languageRepository.getOne(id));
  }

  /**
  * Creates data from dto to object, saves it and returns its Dto.
  */
  @PreAuthorize(DefaultPermissions.HAS_LANGUAGE_WRITE_ROLE)
  public LanguageDto create(LanguageDto languageDto) {
    Language newLanguage = MAPPER.fromDto(languageDto);
    fieldConfigService.checkIfUnique(EntityType.LANGUAGE, newLanguage);
    return MAPPER.toDto(languageRepository.save(newLanguage));
  }

  /**
   * Updates language from it's dto.
   * @param id id of updated language.
   * @param languageDto dto of updated language.
   * @return Dto of updated language.
   */
  @PreAuthorize(DefaultPermissions.HAS_LANGUAGE_WRITE_ROLE)
  public LanguageDto update(UUID id, LanguageDto languageDto) {
    Language language = languageRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Language with id: {0} not found",
            id.toString()));
    MAPPER.update(languageDto, language);
    fieldConfigService.checkIfUnique(EntityType.LANGUAGE, language);
    return MAPPER.toDto(languageRepository.save(language));
  }

  /**
   * Deletes language with given id.
   * @param id ID of language to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_LANGUAGE_WRITE_ROLE)
  public void delete(UUID id) {
    Language language = languageRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Language with id: {0} not found", id.toString()));
    List<Vaccinee> vaccinees = vaccineeRepository.findByPreferredLanguage(language);
    List<KeyCommunityPerson> keyCommunityPeople = keyCommunityPersonRepository
        .getByLanguage(language);
    if (!vaccinees.isEmpty() || !keyCommunityPeople.isEmpty()) {
      throw new RelationViolationException("Can not delete language with users in it!");
    }
    languageRepository.delete(language);
  }
}
