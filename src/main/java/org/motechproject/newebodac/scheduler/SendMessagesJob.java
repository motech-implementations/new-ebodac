package org.motechproject.newebodac.scheduler;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.motechproject.newebodac.service.AppSettingsService;
import org.motechproject.newebodac.service.EnrollmentService;
import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SendMessagesJob extends BaseJob {

  public static final String NAME = "Send Message job";

  private static final String DESCRIPTION = "This is a stub of a future task for sending messages";

  private static final LocalTime DEFAULT_IVR_MESSAGE_TIME = LocalTime.of(9, 0);

  @Value("${scheduled-tasks.send-messages.interval}")
  private int intervalInSeconds;

  @Autowired
  private EnrollmentService enrollmentService;

  @Autowired
  private AppSettingsService appSettingsService;

  @Override
  protected void executeInternal(JobExecutionContext context) {
    log.info(getFullName() + " is being executed at: " + Instant.now());

    enrollmentService.sendMessagesToVaccinees();
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
    LocalTime ivrMessageTime = appSettingsService.getAppSettings().getIvrMessageTime();

    if (ivrMessageTime == null) {
      ivrMessageTime = DEFAULT_IVR_MESSAGE_TIME;
    }

    ZonedDateTime startDate = ZonedDateTime.of(LocalDate.now(),
        ivrMessageTime, ZoneId.systemDefault());

    if (startDate.isBefore(ZonedDateTime.now())) {
      startDate = startDate.plusDays(1);
    }

    return Date.from(startDate.toInstant());
  }
}
