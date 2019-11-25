package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.JsonConfig;
import org.motechproject.newebodac.dto.JsonConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.JsonConfigMapper;
import org.motechproject.newebodac.repository.JsonConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class JsonConfigService {

  private static final JsonConfigMapper MAPPER = JsonConfigMapper.INSTANCE;

  @Autowired
  private JsonConfigRepository jsonConfigRepository;

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public List<JsonConfigDto> getAll() {
    return MAPPER.toDtos(jsonConfigRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public JsonConfigDto findById(UUID id) {
    return MAPPER.toDto(jsonConfigRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public JsonConfigDto create(JsonConfigDto jsonConfigDto) {
    return MAPPER.toDto(jsonConfigRepository.save(MAPPER.fromDto(jsonConfigDto)));
  }

  /**
   * Updates json config with given id.
   * @param id ID of json config to update.
   * @param jsonConfigDto Dto of json config to update.
   * @return the updated json config
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public JsonConfigDto update(UUID id, JsonConfigDto jsonConfigDto) {
    JsonConfig jsonConfig = jsonConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Json config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(jsonConfigDto, jsonConfig);
    return MAPPER.toDto(jsonConfigRepository.save(jsonConfig));
  }

  /**
   * Deletes config with given id.
   * @param id ID of json config to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public void delete(UUID id) {
    JsonConfig jsonConfig = jsonConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Json config with id: {0} not found", id.toString()));
    jsonConfigRepository.delete(jsonConfig);
  }
}
