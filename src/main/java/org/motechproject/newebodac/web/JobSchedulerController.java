package org.motechproject.newebodac.web;

import java.util.List;
import org.motechproject.newebodac.dto.JobDto;
import org.motechproject.newebodac.service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class JobSchedulerController extends BaseController {

  @Autowired
  private SchedulerService schedulerService;

  /**
   * Triggers (reschedules) a single Quartz Scheduler job.
   * @param jobName a name of the job to be triggered
   */
  @RequestMapping(value = "/job/trigger/{jobName}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public void rescheduleJob(@PathVariable("jobName") String jobName) {
    schedulerService.triggerJob(jobName);
  }

  @RequestMapping(value = "/job/", method = RequestMethod.GET)
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public List<JobDto> getAllJobs() {
    return schedulerService.getAllJobsDetails();
  }

  /**
   * Pauses as specific job.
   * @param jobName a name of the job to be paused
   */
  @RequestMapping(value = "/job/pause/{jobName}", method = RequestMethod.POST)
  @ResponseStatus(HttpStatus.OK)
  public void pauseJob(@PathVariable("jobName") String jobName) {
    schedulerService.pauseJob(jobName);
  }
}
