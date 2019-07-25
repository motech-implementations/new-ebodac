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
}
