package org.motechproject.newebodac.mapper;

import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class UuidMapper {

  /**
   * Create UUID object form String.
   * @param id String representation of UUID
   * @return UUID created from String
   */
  public UUID toUuid(String id) {
    if (StringUtils.isBlank(id)) {
      return null;
    }

    return UUID.fromString(id);
  }

  /**
   * Save UUID as String.
   * @param id UUID
   * @return String representation of UUID
   */
  public String fromUuid(UUID id) {
    if (id == null) {
      return null;
    }

    return id.toString();
  }
}
