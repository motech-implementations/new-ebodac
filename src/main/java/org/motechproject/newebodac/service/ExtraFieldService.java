package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.dto.ExtraFieldDto;
import org.motechproject.newebodac.mapper.ExtraFieldMapper;
import org.motechproject.newebodac.repository.ExtraFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtraFieldService {

  @Autowired
  private ExtraFieldRepository extraFieldRepository;

  public static final ExtraFieldMapper EXTRA_FIELD_MAPPER = ExtraFieldMapper.INSTANCE;

  public List<ExtraFieldDto> getExtraFieldsDtos() {
    return EXTRA_FIELD_MAPPER.toDtos(extraFieldRepository.findAll());
  }

  public ExtraFieldDto createExtraField(ExtraFieldDto extraFieldDto) {
    return EXTRA_FIELD_MAPPER.toDto(
        extraFieldRepository.save(EXTRA_FIELD_MAPPER.fromDto(extraFieldDto)));
  }

  public ExtraFieldDto findByIdDto(UUID id) {
    return EXTRA_FIELD_MAPPER.toDto(extraFieldRepository.getOne(id));
  }
}
