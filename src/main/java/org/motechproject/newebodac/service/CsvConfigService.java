package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.CsvConfig;
import org.motechproject.newebodac.dto.CsvConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.CsvConfigMapper;
import org.motechproject.newebodac.repository.CsvConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class CsvConfigService {

  private static final CsvConfigMapper MAPPER = CsvConfigMapper.INSTANCE;

  @Autowired
  private CsvConfigRepository csvConfigRepository;

  public List<CsvConfigDto> getAll() {
    return MAPPER.toDtos(csvConfigRepository.findAll());
  }

  public CsvConfigDto findById(UUID id) {
    return MAPPER.toDto(csvConfigRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CSV_CONFIG_ROLE)
  public CsvConfigDto create(CsvConfigDto csvConfigDto) {
    return MAPPER.toDto(csvConfigRepository.save(MAPPER.fromDto(csvConfigDto)));
  }

  /**
   * Updates csv config with given id.
   * @param id ID of csv config to update.
   * @param csvConfigDto Dto of csv config to update.
   * @return the updated csv config
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CSV_CONFIG_ROLE)
  public CsvConfigDto update(UUID id, CsvConfigDto csvConfigDto) {
    CsvConfig csvConfig = csvConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Csv config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(csvConfigDto, csvConfig);
    return MAPPER.toDto(csvConfigRepository.save(csvConfig));
  }

  /**
   * Deletes config with given id.
   * @param id ID of csv config to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CSV_CONFIG_ROLE)
  public void delete(UUID id) {
    CsvConfig csvConfig = csvConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Csv config with id: {0} not found", id.toString()));
    csvConfigRepository.delete(csvConfig);
  }
}
