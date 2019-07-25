package org.motechproject.newebodac.repository;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.FieldConfig;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface FieldConfigRepository extends JpaRepository<FieldConfig, UUID> {

  List<FieldConfig> findByEntity(@Param("entityType") EntityType entityType);
}
