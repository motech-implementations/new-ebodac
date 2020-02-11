package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.IvrCall;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IvrCallRepository extends JpaRepository<IvrCall, UUID> {

  IvrCall findByProviderCallId(String providerCallId);
}
