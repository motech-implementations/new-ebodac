package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.motechproject.newebodac.dto.FieldConfigDto;
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
}
