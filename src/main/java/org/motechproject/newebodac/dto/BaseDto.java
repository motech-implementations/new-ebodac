package org.motechproject.newebodac.dto;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseDto {

  private UUID id;

  private LocalDateTime createDate;

  private LocalDateTime updateDate;
}
