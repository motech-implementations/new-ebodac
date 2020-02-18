package org.motechproject.newebodac.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.motechproject.newebodac.domain.VaccineeCallStatusReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineeCallStatusReportRepository
    extends JpaRepository<VaccineeCallStatusReport, UUID> {

  Optional<VaccineeCallStatusReport> findByProviderCallIdAndReceiverId(String providerCallId,
      UUID receiverId);

  List<VaccineeCallStatusReport> findAllBySmsNotReceivedAndSendDateBefore(Boolean smsNotReceived,
      LocalDateTime sendDate);
}
