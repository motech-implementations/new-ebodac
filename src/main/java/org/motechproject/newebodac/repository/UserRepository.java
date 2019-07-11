package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.security.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {
}
