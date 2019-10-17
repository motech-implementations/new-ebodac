package org.motechproject.newebodac.repository;

import java.util.List;
import java.util.UUID;
import org.motechproject.newebodac.domain.ExtraField;
import org.motechproject.newebodac.domain.enums.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtraFieldRepository extends JpaRepository<ExtraField, UUID> {

  List<ExtraField> findByNameAndEntity(String name, EntityType entity);
}
