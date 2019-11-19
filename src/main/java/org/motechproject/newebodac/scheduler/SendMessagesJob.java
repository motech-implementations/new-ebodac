package org.motechproject.newebodac.scheduler;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SendMessagesJob extends BaseJob {

  private static final String NAME = "Send Message job";

  private static final String DESCRIPTION = "This is a stub of a future task for sending messages";

  @Value("${scheduled-tasks.send-messages.interval}")
  private int intervalInSeconds;

  @Override
  protected void executeInternal(JobExecutionContext context) {
    log.info(getFullName() + " is being executed at: " + Instant.now());
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
  public Trigger getInitTrigger() {
    return TriggerBuilder
        .newTrigger()
        .withDescription(getDescription())
        .forJob(getJobDetail())
        .withIdentity(getFullName() + BaseJob.TRIGGER)
        .withSchedule(getSchedule())
        .startAt(startAt9AmNextDay())
        .build();
  }

  private Date startAt9AmNextDay() {
    ZonedDateTime startLocalDateTime = ZonedDateTime.now().plusDays(1).withHour(9).withMinute(0);
    return Date.from(startLocalDateTime.toInstant());
  }
}
