package org.motechproject.newebodac.scheduler;

import java.util.Calendar;
import java.util.Date;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.scheduling.quartz.QuartzJobBean;

public abstract class BaseJob extends QuartzJobBean {

  protected static final String TRIGGER = "Trigger";

  public abstract String getDescription();

  public abstract String getFullName();

  public abstract int getIntervalInSeconds();

  /**
   * Default build JobDetail method. Uses full name as an identity.
   *
   * @return built JobDetails
   */
  public JobDetail getJobDetail() {
    return JobBuilder.newJob(getClass())
        .withIdentity(getFullName())
        .storeDurably()
        .build();
  }

  /**
   * Default build Trigger method. Uses description, job details, full name, and schedule.
   * It will be used with scheduling jobs from Services.
   *
   * @return built JobDetails
   */
  public Trigger getTrigger() {
    return TriggerBuilder
        .newTrigger()
        .withDescription(getDescription())
        .forJob(getJobDetail())
        .withIdentity(getFullName() + TRIGGER)
        .withSchedule(getSchedule())
        .startNow()
        .build();
  }

  /**
   * Default build initial Trigger method. Uses description, job details, full name, and schedule.
   * It is being used for initial job scheduling.
   *
   * @return built JobDetails
   */
  public Trigger getInitTrigger() {
    return TriggerBuilder
        .newTrigger()
        .withDescription(getDescription())
        .forJob(getJobDetail())
        .withIdentity(getFullName() + TRIGGER)
        .withSchedule(getSchedule())
        .startAt(startAnHourFromNow())
        .build();
  }

  protected SimpleScheduleBuilder getSchedule() {
    return SimpleScheduleBuilder
        .simpleSchedule()
        .withIntervalInSeconds(getIntervalInSeconds())
        .repeatForever();
  }

  private Date startAnHourFromNow() {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(new Date());
    calendar.add(Calendar.HOUR_OF_DAY, 1);
    return calendar.getTime();
  }
}
