package org.motechproject.newebodac.repository;

import java.util.Optional;
import java.util.UUID;
import org.motechproject.newebodac.domain.JsonConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JsonConfigRepository extends JpaRepository<JsonConfig, UUID> {
  Optional<JsonConfig> findByName(String name);
}
