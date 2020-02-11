package org.motechproject.newebodac.repository;

import java.util.Optional;
import java.util.UUID;
import org.motechproject.newebodac.domain.CallConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CallConfigRepository extends JpaRepository<CallConfig, UUID> {

  Optional<CallConfig> findByName(String name);
}
