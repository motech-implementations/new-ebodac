package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.FieldConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.FieldConfigMapper;
import org.motechproject.newebodac.repository.FieldConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FieldConfigService {

  private static final FieldConfigMapper MAPPER = FieldConfigMapper.INSTANCE;

  @Autowired
  private FieldConfigRepository fieldConfigRepository;

  public List<FieldConfigDto> getByEntityName(String entityName) {
    return MAPPER.toDtos(fieldConfigRepository.findByEntity(EntityType.valueOf(entityName)));
  }

  public FieldConfigDto findById(UUID id) {
    return MAPPER.toDto(fieldConfigRepository.getOne(id));
  }

  public FieldConfigDto create(FieldConfigDto fieldConfigDto) {
    return MAPPER.toDto(fieldConfigRepository.save(MAPPER.fromDto(fieldConfigDto)));
  }

  /**
   * Updates data from dto to config object, saves it and returns dto of it.
   * @param id ID of object to update.
   * @param fieldConfigDto Dto of config to update.
   * @return Dto of of updated config
   */
  public FieldConfigDto updateFromDto(UUID id, FieldConfigDto fieldConfigDto) {
    FieldConfig fieldConfig = fieldConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Field config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(fieldConfigDto, fieldConfig);
    return MAPPER.toDto(fieldConfigRepository.save(fieldConfig));
  }

  /**
   * Deletes config with given id.
   * @param id ID of config to delete.
   */
  public void delete(UUID id) {
    FieldConfig fieldConfig = fieldConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Field config with id: {0} not found", id.toString()));
    fieldConfigRepository.delete(fieldConfig);
  }
}
