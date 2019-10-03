package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.security.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<UserPermission, UUID> {

}
