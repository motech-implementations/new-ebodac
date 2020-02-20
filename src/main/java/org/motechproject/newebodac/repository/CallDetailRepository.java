package org.motechproject.newebodac.repository;

import java.util.UUID;
import org.motechproject.newebodac.domain.CallDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CallDetailRepository extends JpaRepository<CallDetail, UUID> {

}
