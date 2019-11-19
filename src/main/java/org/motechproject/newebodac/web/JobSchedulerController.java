package org.motechproject.newebodac.web;

import java.util.List;
import org.motechproject.newebodac.dto.JobDto;
import org.motechproject.newebodac.service.SchedulerService;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class JobSchedulerController {

  @Autowired
  private SchedulerService schedulerService;

  /**
   * Triggers (reschedules) a single Quartz Scheduler job.
   * @param jobName a name of the job to be triggered
   * @throws SchedulerException throws exception in case any issues with scheduling
   */
  @RequestMapping(value = "/job/trigger/{jobName}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public void triggerJob(@PathVariable("jobName") String jobName) throws SchedulerException {
    schedulerService.triggerJob(jobName);
  }

  @RequestMapping(value = "/job/{csvConfigId}", method = RequestMethod.GET)
  public List<JobDto> getAllJobs() throws SchedulerException {
    return schedulerService.getAllJobsDetails();
  }

  /**
   * Pauses as specific job.
   * @param jobName a name of the job to be paused
   * @throws SchedulerException throws exception in case any issues with scheduling
   */
  @PostMapping("/job/pause/{jobName}")
  @ResponseStatus(HttpStatus.OK)
  public void pauseJob(@PathVariable("jobName") String jobName) throws SchedulerException {
    schedulerService.pauseJob(jobName);
  }
}
