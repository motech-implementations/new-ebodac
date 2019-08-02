package org.motechproject.newebodac.repository;

import java.util.Optional;
import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.domain.security.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLogRepository extends JpaRepository<UserLog, String> {

  Optional<UserLog> findFirstByUserOrderByLoginDateDesc(User user);
}
