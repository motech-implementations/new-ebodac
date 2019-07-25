package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.FieldConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldConfigRepository extends JpaRepository<FieldConfig, UUID> {

}
