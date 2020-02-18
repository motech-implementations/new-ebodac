package org.motechproject.newebodac.scheduler;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.motechproject.newebodac.service.AppSettingsService;
import org.motechproject.newebodac.service.VaccineeCallStatusReportService;
import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class GenerateReportsJob extends BaseJob {

  public static final String NAME = "Generate Reports job";

  private static final String DESCRIPTION = "This is a task for generating reports";

  private static final LocalTime DEFAULT_REPORTS_GENERATION_TIME = LocalTime.MIDNIGHT;

  @Value("${scheduled-tasks.generate-reports.interval}")
  private int intervalInSeconds;

  @Autowired
  private AppSettingsService appSettingsService;

  @Autowired
  private VaccineeCallStatusReportService vaccineeCallStatusReportService;

  @Override
  protected void executeInternal(JobExecutionContext context) {
    log.info(getFullName() + " is being executed at: " + Instant.now());

    vaccineeCallStatusReportService.generateVaccineeCallStatusReports();
  }

  @Override
  public String getDescription() {
    return DESCRIPTION;
  }

  @Override
  public String getFullName() {
    return NAME;
  }

  @Override
  public int getIntervalInSeconds() {
    return intervalInSeconds;
  }

  @Override
  public Trigger getTrigger() {
    return TriggerBuilder
        .newTrigger()
        .withDescription(getDescription())
        .forJob(getJobDetail())
        .withIdentity(getFullName() + BaseJob.TRIGGER)
        .withSchedule(getSchedule())
        .startAt(getStartDate())
        .build();
  }

  @Override
  public Trigger getInitTrigger() {
    return getTrigger();
  }

  private Date getStartDate() {
    LocalTime reportsGenerationTime =
        appSettingsService.getAppSettings().getReportsGenerationTime();

    if (reportsGenerationTime == null) {
      reportsGenerationTime = DEFAULT_REPORTS_GENERATION_TIME;
    }

    ZonedDateTime startDate = ZonedDateTime.of(LocalDate.now(),
        reportsGenerationTime, ZoneId.systemDefault());

    if (startDate.isBefore(ZonedDateTime.now())) {
      startDate = startDate.plusDays(1);
    }

    return Date.from(startDate.toInstant());
  }
}
