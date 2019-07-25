package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.mapper.KeyCommunityPersonMapper;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KeyCommunityPersonService {

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  public static final KeyCommunityPersonMapper KEY_COMMUNITY_PERSON_MAPPER =
      KeyCommunityPersonMapper.INSTANCE;

  public List<KeyCommunityPersonDto> getKeyCommunityPeopleDtos() {
    return KEY_COMMUNITY_PERSON_MAPPER.toDtos(
        keyCommunityPersonRepository.findAll()
    );
  }

  public KeyCommunityPersonDto findByIdDto(UUID id) {
    return KEY_COMMUNITY_PERSON_MAPPER.toDto(
        keyCommunityPersonRepository.getOne(id)
    );
  }

  public KeyCommunityPersonDto createKeyCommunityPerson(
      KeyCommunityPersonDto keyCommunityPersonDto) {
    return KEY_COMMUNITY_PERSON_MAPPER.toDto(
        keyCommunityPersonRepository.save(
            KEY_COMMUNITY_PERSON_MAPPER.fromDto(keyCommunityPersonDto)
        )
    );
  }
}
