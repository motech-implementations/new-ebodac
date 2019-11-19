package org.motechproject.newebodac.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobDto extends BaseDto {

  private String name;

  private String description;

  private Date nextFireDate;

  private Date prevFireDate;

  private String state;
}
