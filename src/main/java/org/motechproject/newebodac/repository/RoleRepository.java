package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.security.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<UserRole, UUID> {

}
