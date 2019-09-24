package org.motechproject.newebodac.scheduler;

import java.time.Instant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ScheduledTasks {

  @Scheduled(cron = "${scheduled-tasks.demo-task.cron-expression}")
  public void scheduleDemoCronTask() {
    log.info(
        "scheduleDemoCronTask has been run at: " + Instant.now());
  }

}
