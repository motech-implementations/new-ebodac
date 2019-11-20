package org.motechproject.newebodac.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.motechproject.newebodac.dto.JobDto;
import org.motechproject.newebodac.scheduler.BaseJob;
import org.motechproject.newebodac.scheduler.SendMessagesJob;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

  @Autowired
  private SchedulerFactoryBean schedulerFactoryBean;

  @Autowired
  private SendMessagesJob sendMessagesJob;

  public List<JobDto> getAllJobsDetails() throws SchedulerException {
    return getAllTriggers().stream().map(this::mapToJobDto).collect(Collectors.toList());
  }

  public void triggerJob(String name) throws SchedulerException {
    getTriggersByName(name).forEach(this::rescheduleJob);
  }

  public void pauseJob(String name) throws SchedulerException {
    getTriggersByName(name).forEach(this::pauseJob);
  }

  private void pauseJob(Trigger trigger) {
    try {
      Scheduler scheduler = schedulerFactoryBean.getScheduler();
      scheduler.pauseTrigger(trigger.getKey());
      scheduler.pauseJob(trigger.getJobKey());
    } catch (SchedulerException e) {
      throw new IllegalStateException("Cannot pause job " + trigger.getJobKey().getName(), e);
    }
  }

  private List<Trigger> getTriggersByName(String name) throws SchedulerException {
    return getAllTriggers().stream().filter(t -> t.getJobKey().getName().equals(name)).collect(
        Collectors.toList());
  }

  private void rescheduleJob(Trigger trigger) {
    try {
      Scheduler scheduler = schedulerFactoryBean.getScheduler();

      scheduler.rescheduleJob(trigger.getKey(), getBeanTrigger(trigger.getJobKey().getName()));
    } catch (SchedulerException e) {
      throw new IllegalStateException("Cannot reschedule job " + trigger.getJobKey().getName(), e);
    }
  }

  private List<Trigger> getAllTriggers() throws SchedulerException {
    List<Trigger> result = new ArrayList<>();
    Scheduler scheduler = schedulerFactoryBean.getScheduler();
    for (String groupName : scheduler.getJobGroupNames()) {
      for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
        result.addAll(scheduler.getTriggersOfJob(jobKey));
      }
    }
    return result;
  }

  private JobDto mapToJobDto(Trigger trigger) {
    try {
      Trigger.TriggerState state = schedulerFactoryBean.getScheduler()
          .getTriggerState(trigger.getKey());
      return new JobDto(trigger.getJobKey().getName(), trigger.getDescription(),
          trigger.getNextFireTime(), trigger.getPreviousFireTime(), state.name());
    } catch (SchedulerException e) {
      throw new IllegalStateException("Cannot get details of " + trigger.getJobKey(), e);
    }
  }

  private Trigger getBeanTrigger(String name) {
    List<BaseJob> allBeans = new ArrayList<>();
    allBeans.add(sendMessagesJob);

    return allBeans.stream()
        .filter(b -> b.getFullName().equals(name))
        .map(BaseJob::getTrigger)
        .findFirst().orElseThrow();
  }

}
