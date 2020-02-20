package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.IvrProviderConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IvrProviderConfigRepository extends JpaRepository<IvrProviderConfig, UUID> {

}
