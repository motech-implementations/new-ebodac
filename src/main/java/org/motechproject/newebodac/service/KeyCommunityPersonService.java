package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;

import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.KeyCommunityPersonMapper;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KeyCommunityPersonService {

  private static final KeyCommunityPersonMapper MAPPER = KeyCommunityPersonMapper.INSTANCE;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  public List<KeyCommunityPersonDto> getAll() {
    return MAPPER.toDtos(keyCommunityPersonRepository.findAll());
  }

  public KeyCommunityPersonDto findById(UUID id) {
    return MAPPER.toDto(keyCommunityPersonRepository.getOne(id));
  }

  public KeyCommunityPersonDto create(KeyCommunityPersonDto keyCommunityPersonDto) {
    return MAPPER.toDto(keyCommunityPersonRepository.save(MAPPER.fromDto(keyCommunityPersonDto)));
  }

  /**
   * Updates data from dto to object, saves it and returns its Dto.
   * 
   * @param id      ID of object to update.
   * @param keyCommunityPersonDto Dto of role to update.
   * @return Dto of of updated object
   */
  public KeyCommunityPersonDto update(UUID id, KeyCommunityPersonDto keyCommunityPersonDto) {
    
    KeyCommunityPerson existingKeyCommunityPerson = keyCommunityPersonRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(
            "Key Community Person with id: {0} not found", id.toString()));
    MAPPER.update(keyCommunityPersonDto, existingKeyCommunityPerson);

    return MAPPER.toDto(keyCommunityPersonRepository.save(existingKeyCommunityPerson));
  }
}
