package org.motechproject.newebodac.service;

import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.AppSettings;
import org.motechproject.newebodac.dto.AppSettingsDto;
import org.motechproject.newebodac.mapper.AppSettingsMapper;
import org.motechproject.newebodac.repository.AppSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class AppSettingsService {

  private static final AppSettingsMapper MAPPER = AppSettingsMapper.INSTANCE;

  @Autowired
  private AppSettingsRepository appSettingsRepository;

  @PreAuthorize(DefaultPermissions.HAS_MANAGE_APP_SETTINGS_ROLE)
  public AppSettingsDto get() {
    return MAPPER.toDto(getAppSettings());
  }

  /**
   * Updates app settings.
   * @param appSettingsDto Dto of app settings.
   * @return Dto of updated app settings.
   */
  @PreAuthorize(DefaultPermissions.HAS_MANAGE_APP_SETTINGS_ROLE)
  public AppSettingsDto update(AppSettingsDto appSettingsDto) {
    AppSettings appSettings = getAppSettings();
    MAPPER.update(appSettingsDto, appSettings);
    return MAPPER.toDto(appSettingsRepository.save(appSettings));
  }

  public AppSettings getAppSettings() {
    return appSettingsRepository.findFirstByOrderByIdAsc();
  }
}
