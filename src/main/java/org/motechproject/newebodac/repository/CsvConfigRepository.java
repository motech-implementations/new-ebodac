package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.CsvConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface CsvConfigRepository extends JpaRepository<CsvConfig, UUID> {

  CsvConfig findByEntity(@Param("entityType") EntityType entityType);
}
