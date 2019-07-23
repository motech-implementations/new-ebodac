package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.ExtraField;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtraFieldRepository extends JpaRepository<ExtraField, UUID> {

}
