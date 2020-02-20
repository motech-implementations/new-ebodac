package org.motechproject.newebodac.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.domain.AppSettings;
import org.motechproject.newebodac.domain.CallDetail;
import org.motechproject.newebodac.domain.IvrCall;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.VaccineeCallStatusReport;
import org.motechproject.newebodac.domain.enums.CallStatus;
import org.motechproject.newebodac.domain.enums.SmsStatus;
import org.motechproject.newebodac.dto.VaccineeCallStatusReportDto;
import org.motechproject.newebodac.mapper.VaccineeCallStatusReportMapper;
import org.motechproject.newebodac.repository.IvrCallRepository;
import org.motechproject.newebodac.repository.VaccineeCallStatusReportRepository;
import org.motechproject.newebodac.repository.VaccineeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VaccineeCallStatusReportService {

  private static final Logger LOGGER =
      LoggerFactory.getLogger(VaccineeCallStatusReportService.class);

  private static final VaccineeCallStatusReportMapper MAPPER =
      VaccineeCallStatusReportMapper.INSTANCE;

  @Autowired
  private VaccineeCallStatusReportRepository vaccineeCallStatusReportRepository;

  @Autowired
  private IvrCallRepository ivrCallRepository;

  @Autowired
  private VaccineeRepository vaccineeRepository;

  @Autowired
  private AppSettingsService appSettingsService;

  public List<VaccineeCallStatusReportDto> getAll() {
    return MAPPER.toDtos(vaccineeCallStatusReportRepository.findAll());
  }

  public VaccineeCallStatusReportDto findById(UUID id) {
    return MAPPER.toDto(vaccineeCallStatusReportRepository.getOne(id));
  }

  /**
   * Generate Vaccinee Call Status Reports starting last generation date.
   */
  @Transactional
  public void generateVaccineeCallStatusReports() {
    AppSettings appSettings = appSettingsService.getAppSettings();
    LocalDate lastReportGenerationDate = appSettings.getLastReportGenerationDate();

    generateVaccineeCallStatusReports(lastReportGenerationDate);

    appSettings.setLastReportGenerationDate(LocalDate.now());
    appSettingsService.saveAppSettings(appSettings);
  }

  /**
   * Generate Vaccinee Call Status Reports starting from given date.
   * @param fromDate report generation will start from this date
   */
  @Transactional
  public void generateVaccineeCallStatusReports(LocalDate fromDate) {
    List<IvrCall> calls;
    List<VaccineeCallStatusReport> reportsToUpdate = new ArrayList<>();

    if (fromDate == null) {
      calls = ivrCallRepository.findAll();
    } else {
      LocalDateTime date = LocalDateTime.of(fromDate, LocalTime.MIN);
      calls = ivrCallRepository.findByCreateDateGreaterThanEqual(date);
      reportsToUpdate = vaccineeCallStatusReportRepository
          .findAllBySmsNotReceivedAndSendDateBefore(true, date);
    }

    calls.forEach(this::generateVaccineeCallStatusReport);
    reportsToUpdate.forEach(this::updateVaccineeCallStatusReport);
  }

  private void updateVaccineeCallStatusReport(VaccineeCallStatusReport report) {
    IvrCall ivrCall = ivrCallRepository.findByProviderCallId(report.getProviderCallId());

    generateVaccineeCallStatusReport(ivrCall, report);
  }

  private void generateVaccineeCallStatusReport(IvrCall ivrCall) {
    if (StringUtils.isBlank(ivrCall.getReceiverId())) {
      LOGGER.error("Could not generate report for call with id: " + ivrCall.getProviderCallId()
          + ", because receiver id is empty");
      return;
    }

    Vaccinee receiver = vaccineeRepository.findByVaccineeId(ivrCall.getReceiverId());

    if (receiver == null) {
      LOGGER.error("Could not generate report for call with id: " + ivrCall.getProviderCallId()
          + ", because no receiver found for this call");
      return;
    }

    VaccineeCallStatusReport report =
        vaccineeCallStatusReportRepository.findByProviderCallIdAndReceiverId(
            ivrCall.getProviderCallId(), receiver.getId())
            .orElse(new VaccineeCallStatusReport(receiver, ivrCall.getProviderCallId()));

    generateVaccineeCallStatusReport(ivrCall, report);
  }

  private void generateVaccineeCallStatusReport(IvrCall ivrCall, VaccineeCallStatusReport report) {
    Map<String, List<CallDetail>> detailsGroup = ivrCall.getCallDetails().stream()
        .collect(Collectors.groupingBy(CallDetail::getCallDetailId));

    String callDetailsId = findCallDetailsId(detailsGroup);

    if (callDetailsId == null) {
      LOGGER.error("Could not generate report for call with id: " + ivrCall.getProviderCallId()
          + ", because no call details found for this call");
      return;
    }

    List<CallDetail> smsDetails = null;

    if (detailsGroup.size() > 1) {
      for (String detailsId : detailsGroup.keySet()) {
        if (!callDetailsId.equals(detailsId)) {
          smsDetails = detailsGroup.get(detailsId);
        }
      }
    }

    report.setMessageKey(ivrCall.getMessageKey());
    report.setSendDate(ivrCall.getCreateDate());

    setSmsDetails(report, smsDetails);

    List<CallDetail> callDetails = detailsGroup.get(callDetailsId);
    CallDetail callEndRecord = findEndRecord(callDetails);

    Double messagePercentListened = null;
    Double messageTimeListened = null;

    if (CallStatus.FINISHED_COMPLETE.equals(callEndRecord.getCallStatus())
        || CallStatus.FINISHED_INCOMPLETE.equals(callEndRecord.getCallStatus())) {
      messagePercentListened = callEndRecord.getMessagePercentListened();
      messageTimeListened = callEndRecord.getMessageTimeListened();
      report.setCallDuration(callEndRecord.getCallDuration());
      report.setReceivedDate(callEndRecord.getStartTimestamp());
    }

    Double expectedDuration = null;

    if (messagePercentListened != null && messageTimeListened != null) {
      expectedDuration = messageTimeListened * 100 / messagePercentListened;
    }

    report.setMessagePercentListened(messagePercentListened);
    report.setMessageTimeListened(messageTimeListened);
    report.setExpectedDuration(expectedDuration);

    report.setNumberOfAttempts(callEndRecord.getNumberOfAttempts());

    vaccineeCallStatusReportRepository.save(report);
  }

  private void setSmsDetails(VaccineeCallStatusReport report, List<CallDetail> smsDetails) {
    CallDetail smsEndRecord = findEndRecord(smsDetails);

    SmsStatus smsStatus = SmsStatus.YES;
    boolean smsNotReceived = false;

    if (smsDetails == null) {
      smsStatus = SmsStatus.NO;
    } else if (smsEndRecord == null) {
      smsNotReceived = true;
    } else {
      if (CallStatus.FAILED.equals(smsEndRecord.getCallStatus())) {
        smsStatus = SmsStatus.FAIL;
      } else {
        report.setSmsReceivedDate(smsEndRecord.getEndTimestamp());
      }
    }

    report.setSmsStatus(smsStatus);
    report.setSmsNotReceived(smsNotReceived);
  }

  private CallDetail findEndRecord(List<CallDetail> details) {
    if (details == null) {
      return null;
    }

    return details.stream()
        .filter(callDetail -> CallStatus.FAILED.equals(callDetail.getCallStatus())
        || CallStatus.FINISHED_COMPLETE.equals(callDetail.getCallStatus())
            || CallStatus.FINISHED_INCOMPLETE.equals(callDetail.getCallStatus()))
        .findFirst().orElse(null);
  }

  @SuppressWarnings("PMD.CyclomaticComplexity")
  private String findCallDetailsId(Map<String, List<CallDetail>> detailsGroup) {
    if (detailsGroup.isEmpty()) {
      return null;
    }

    if (detailsGroup.size() == 1) {
      return detailsGroup.keySet().iterator().next();
    }

    String smsDetailsId = null;

    for (Entry<String, List<CallDetail>> entry : detailsGroup.entrySet()) {
      for (CallDetail detail : entry.getValue()) {
        if (CallStatus.IN_PROGRESS.equals(detail.getCallStatus())
            || detail.getCallDuration() != null || detail.getMessageTimeListened() != null
            || detail.getMessagePercentListened() != null) {
          return entry.getKey();
        }

        if (CallStatus.SMS_SENT.equals(detail.getCallStatus())) {
          smsDetailsId = entry.getKey();
          break;
        }
      }
    }

    if (smsDetailsId != null) {
      for (String detailsId : detailsGroup.keySet()) {
        if (!smsDetailsId.equals(detailsId)) {
          return detailsId;
        }
      }
    }

    return detailsGroup.keySet().iterator().next();
  }
}
