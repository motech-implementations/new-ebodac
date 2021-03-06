package org.motechproject.newebodac.repository;

import java.util.Optional;
import java.util.UUID;
import org.motechproject.newebodac.domain.security.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findOneByUsername(String username);
}
