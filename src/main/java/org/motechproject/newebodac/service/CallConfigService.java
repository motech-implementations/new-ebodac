package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.CallConfig;
import org.motechproject.newebodac.dto.CallConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.CallConfigMapper;
import org.motechproject.newebodac.repository.CallConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class CallConfigService {

  private static final CallConfigMapper MAPPER = CallConfigMapper.INSTANCE;

  @Autowired
  private CallConfigRepository callConfigRepository;

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CALL_CONFIG_ROLE)
  public List<CallConfigDto> getAll() {
    return MAPPER.toDtos(callConfigRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CALL_CONFIG_ROLE)
  public CallConfigDto findById(UUID id) {
    return MAPPER.toDto(callConfigRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CALL_CONFIG_ROLE)
  public CallConfigDto create(CallConfigDto callConfigDto) {
    return MAPPER.toDto(callConfigRepository.save(MAPPER.fromDto(callConfigDto)));
  }

  /**
   * Updates call config with given id.
   * @param id ID of call config to update.
   * @param callConfigDto Dto of call config to update.
   * @return the updated call config
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CALL_CONFIG_ROLE)
  public CallConfigDto update(UUID id, CallConfigDto callConfigDto) {
    CallConfig callConfig = callConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Call config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(callConfigDto, callConfig);
    return MAPPER.toDto(callConfigRepository.save(callConfig));
  }

  /**
   * Deletes config with given id.
   * @param id ID of call config to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_CALL_CONFIG_ROLE)
  public void delete(UUID id) {
    CallConfig callConfig = callConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("Call config with id: {0} not found", id.toString()));
    callConfigRepository.delete(callConfig);
  }
}
