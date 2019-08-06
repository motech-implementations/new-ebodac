package org.motechproject.newebodac.repository;

import java.util.Optional;
import org.motechproject.newebodac.domain.security.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {

  Optional<Client> findOneByClientId(String clientId);
}
