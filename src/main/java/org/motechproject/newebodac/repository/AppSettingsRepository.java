package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.AppSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppSettingsRepository extends JpaRepository<AppSettings, UUID> {

  AppSettings findFirstByOrderByIdAsc();
}
