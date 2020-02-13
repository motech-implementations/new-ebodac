package org.motechproject.newebodac.repository.custom;

import java.util.UUID;

import org.motechproject.newebodac.domain.enums.EntityType;

public interface FieldConfigRepositoryCustom {

  Boolean checkIfUnique(EntityType entityType, UUID id,
      String fieldName, Object fieldValue);
}
