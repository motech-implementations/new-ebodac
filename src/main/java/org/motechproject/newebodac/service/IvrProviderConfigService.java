package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.IvrProviderConfig;
import org.motechproject.newebodac.dto.IvrProviderConfigDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.mapper.IvrProviderConfigMapper;
import org.motechproject.newebodac.repository.IvrProviderConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class IvrProviderConfigService {

  private static final IvrProviderConfigMapper MAPPER = IvrProviderConfigMapper.INSTANCE;

  @Autowired
  private IvrProviderConfigRepository ivrProviderConfigRepository;

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_IVR_PROVIDER_CONFIG_ROLE)
  public List<IvrProviderConfigDto> getAll() {
    return MAPPER.toDtos(ivrProviderConfigRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_IVR_PROVIDER_CONFIG_ROLE)
  public IvrProviderConfigDto findById(UUID id) {
    return MAPPER.toDto(ivrProviderConfigRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_IVR_PROVIDER_CONFIG_ROLE)
  public IvrProviderConfigDto create(IvrProviderConfigDto ivrProviderConfigDto) {
    return MAPPER.toDto(ivrProviderConfigRepository.save(MAPPER.fromDto(ivrProviderConfigDto)));
  }

  /**
   * Updates IVR provider config with given id.
   * @param id ID of IVR provider config to update.
   * @param ivrProviderConfigDto Dto of IVR provider config to update.
   * @return the updated IVR provider config
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_IVR_PROVIDER_CONFIG_ROLE)
  public IvrProviderConfigDto update(UUID id, IvrProviderConfigDto ivrProviderConfigDto) {
    IvrProviderConfig ivrProviderConfig = ivrProviderConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("IVR provider config with id: {0} not found", id.toString()));
    MAPPER.updateFromDto(ivrProviderConfigDto, ivrProviderConfig);
    return MAPPER.toDto(ivrProviderConfigRepository.save(ivrProviderConfig));
  }

  /**
   * Deletes config with given id.
   * @param id ID of IVR provider config to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_IVR_PROVIDER_CONFIG_ROLE)
  public void delete(UUID id) {
    IvrProviderConfig ivrProviderConfig = ivrProviderConfigRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("IVR provider config with id: {0} not found", id.toString()));
    ivrProviderConfigRepository.delete(ivrProviderConfig);
  }
}
