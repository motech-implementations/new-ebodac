package org.motechproject.newebodac.scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.quartz.QuartzProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

@Configuration
public class SchedulerQuartzConfig {

  @Autowired
  private ApplicationContext applicationContext;

  @Autowired
  private QuartzProperties quartzProperties;

  @Autowired
  private SendMessagesJob sendMessagesJob;

  @Autowired
  private GenerateReportsJob generateReportsJob;

  /**
   * This method configures custom schedulerFactoryBean. It loads Quartz properties
   * from application.properties, and sets AutowiringBeanJobFactory which enables
   * autowiring of jobs. This makes possible to schedule Quartz jobs dynamically.
   * @return configured SchedulerFactoryBean for whole context
   */
  @Bean
  public SchedulerFactoryBean schedulerFactoryBean() {
    SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();

    AutowiringBeanJobFactory jobFactory = new AutowiringBeanJobFactory();
    jobFactory.setApplicationContext(applicationContext);
    schedulerFactoryBean.setJobFactory(jobFactory);
    Properties quartzApplicationProperties = new Properties();
    quartzApplicationProperties.putAll(quartzProperties.getProperties());

    schedulerFactoryBean.setQuartzProperties(quartzApplicationProperties);

    List<BaseJob> jobs = new ArrayList<>();
    jobs.add(sendMessagesJob);
    jobs.add(generateReportsJob);

    schedulerFactoryBean.setTriggers(mapToTriggers(jobs));
    schedulerFactoryBean.setJobDetails(mapToJobDetails(jobs));

    return schedulerFactoryBean;
  }

  private JobDetail[] mapToJobDetails(List<BaseJob> jobs) {
    JobDetail[] array = new JobDetail[jobs.size()];
    return jobs.stream().map(BaseJob::getJobDetail).collect(Collectors.toList()).toArray(array);
  }

  private Trigger[] mapToTriggers(List<BaseJob> jobs) {
    Trigger[] array = new Trigger[jobs.size()];
    return jobs.stream().map(BaseJob::getInitTrigger).collect(Collectors.toList()).toArray(array);
  }
}
