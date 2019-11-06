package org.motechproject.newebodac.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.FieldConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.FieldConfigMapper;
import org.motechproject.newebodac.repository.ExtraFieldRepository;
import org.motechproject.newebodac.repository.FieldConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class FieldConfigService {

  private static final FieldConfigMapper MAPPER = FieldConfigMapper.INSTANCE;

  @Autowired
  private FieldConfigRepository fieldConfigRepository;

  @Autowired
  private ExtraFieldRepository extraFieldRepository;

  public List<FieldConfigDto> getAll() {
    return MAPPER.toDtos(fieldConfigRepository.findAll());
  }

  public List<FieldConfigDto> getByEntityName(String entityName) {
    return MAPPER.toDtos(fieldConfigRepository.findByEntity(EntityType.getByName(entityName)));
  }

  public FieldConfigDto findById(UUID id) {
    return MAPPER.toDto(fieldConfigRepository.getOne(id));
  }

  public FieldConfigDto create(FieldConfigDto fieldConfigDto) {
    return MAPPER.toDto(fieldConfigRepository.save(MAPPER.fromDto(fieldConfigDto)));
  }

  /**
   * Updates config with given id.
   * @param id ID of config to update.
   * @param fieldConfigDto Dto of config to update.
   * @return the updated config
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public FieldConfigDto update(UUID id, FieldConfigDto fieldConfigDto) {
    FieldConfig fieldConfig = fieldConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Field config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(fieldConfigDto, fieldConfig);
    return MAPPER.toDto(fieldConfigRepository.save(fieldConfig));
  }

  /**
   * Update list of field configs.
   * @param fieldConfigDtos list of field configs to update
   * @return updated field configs
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public List<FieldConfigDto> saveOrder(List<FieldConfigDto> fieldConfigDtos) {
    List<FieldConfig> fieldConfigs = new ArrayList<>();

    fieldConfigDtos.forEach(fieldConfigDto -> {
      FieldConfig fieldConfig = fieldConfigRepository.findById(fieldConfigDto.getId())
          .orElseThrow(() -> new EntityNotFoundException("Field config with id: {0} not found",
              fieldConfigDto.getId().toString()));

      MAPPER.updateOrderFromDto(fieldConfigDto, fieldConfig);
      fieldConfigs.add(fieldConfigRepository.save(fieldConfig));
    });

    return MAPPER.toDtos(fieldConfigs);
  }

  /**
   * Deletes config with given id and deletes extra field related data.
   * @param id ID of config to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_FIELD_CONFIG_ROLE)
  public void delete(UUID id) {
    FieldConfig fieldConfig = fieldConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Field config with id: {0} not found", id.toString()));

    List<ExtraField> extraFields = extraFieldRepository
        .findByNameAndEntity(fieldConfig.getName(), fieldConfig.getEntity());

    extraFieldRepository.deleteAll(extraFields);

    fieldConfigRepository.delete(fieldConfig);
  }
}
