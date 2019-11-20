package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;

import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.dto.KeyCommunityPersonDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.KeyCommunityPersonMapper;
import org.motechproject.newebodac.repository.KeyCommunityPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class KeyCommunityPersonService {

  @Autowired
  private KeyCommunityPersonMapper mapper;

  @Autowired
  private KeyCommunityPersonRepository keyCommunityPersonRepository;

  @PreAuthorize(DefaultPermissions.HAS_KCP_READ_ROLE)
  public List<KeyCommunityPersonDto> getAll() {
    return mapper.toDtos(keyCommunityPersonRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_KCP_READ_ROLE)
  public KeyCommunityPersonDto findById(UUID id) {
    return mapper.toDto(keyCommunityPersonRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_KCP_WRITE_ROLE)
  public KeyCommunityPersonDto create(KeyCommunityPersonDto keyCommunityPersonDto) {
    return mapper.toDto(keyCommunityPersonRepository.save(mapper.fromDto(keyCommunityPersonDto)));
  }

  /**
   * Updates data from dto to object, saves it and returns its Dto.
   * 
   * @param id      ID of object to update.
   * @param keyCommunityPersonDto Dto of object to update.
   * @return Dto of of updated object
   */
  @PreAuthorize(DefaultPermissions.HAS_KCP_WRITE_ROLE)
  public KeyCommunityPersonDto update(UUID id, KeyCommunityPersonDto keyCommunityPersonDto) {
    
    KeyCommunityPerson existingKeyCommunityPerson = keyCommunityPersonRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(
            "Key Community Person with id: {0} not found", id.toString()));
    mapper.update(keyCommunityPersonDto, existingKeyCommunityPerson);

    return mapper.toDto(keyCommunityPersonRepository.save(existingKeyCommunityPerson));
  }

  /**
   * Deletes key community person with given id.
   * @param id ID of key community person to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_KCP_WRITE_ROLE)
  public void delete(UUID id) {
    KeyCommunityPerson kcp = keyCommunityPersonRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Key community person with id: {0} not found", id.toString()));
    keyCommunityPersonRepository.delete(kcp);
  }
}
