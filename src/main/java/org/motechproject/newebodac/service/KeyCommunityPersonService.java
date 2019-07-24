package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.mapper.KeyCommunityPersonMapper;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KeyCommunityPersonService {

  @Autowired
  KeyCommunityPersonRepository keyCommunityPersonRepository;

  public static final KeyCommunityPersonMapper KEY_COMMUNITY_PERSON_MAPPER =
      KeyCommunityPersonMapper.INSTANCE;

  public KeyCommunityPersonDto getKeyCommunityPersonDto(
      KeyCommunityPerson keyCommunityPerson) {
    return KEY_COMMUNITY_PERSON_MAPPER.toDto(keyCommunityPerson);
  }

  public KeyCommunityPerson getKeyCommunityPersonFromDto(
      KeyCommunityPersonDto keyCommunityPersonDto) {
    return KEY_COMMUNITY_PERSON_MAPPER.fromDto(keyCommunityPersonDto);
  }

  public List<KeyCommunityPerson> getKeyCommunityPeople() {
    return keyCommunityPersonRepository.findAll();
  }

  public List<KeyCommunityPersonDto> getKeyCommunityPeopleDtos(
      Iterable<KeyCommunityPerson> keyCommunityPeople) {
    return KEY_COMMUNITY_PERSON_MAPPER.toDtos(keyCommunityPeople);
  }

  public KeyCommunityPerson findById(UUID id) {
    return keyCommunityPersonRepository.getOne(id);
  }

  public KeyCommunityPersonDto findByIdDto(UUID id) {
    return KEY_COMMUNITY_PERSON_MAPPER.toDto(keyCommunityPersonRepository.getOne(id));
  }
}
