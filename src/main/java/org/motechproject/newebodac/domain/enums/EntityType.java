package org.motechproject.newebodac.domain.enums;

import lombok.Getter;
import org.motechproject.newebodac.domain.BaseEntity;
import org.motechproject.newebodac.domain.EnrollmentGroup;
import org.motechproject.newebodac.domain.KeyCommunityPerson;
import org.motechproject.newebodac.domain.Language;
import org.motechproject.newebodac.domain.Site;
import org.motechproject.newebodac.domain.Vaccinee;
import org.motechproject.newebodac.domain.Visit;
import org.motechproject.newebodac.domain.security.UserPermission;
import org.motechproject.newebodac.domain.security.UserRole;

public enum EntityType {
  VACCINEE("vaccinee", Vaccinee.class),
  VISIT("visit", Visit.class),
  SITE("site", Site.class),
  GROUP("group", EnrollmentGroup.class),
  PERSON("keyCommunityPerson", KeyCommunityPerson.class),
  LANGUAGE("language", Language.class),
  VISIT_TYPE("visitType", Visit.class),
  ROLE("role", UserRole.class),
  PERMISSION("permission", UserPermission.class);

  @Getter
  private String name;

  @Getter
  private Class<? extends BaseEntity> entityClass;

  EntityType(String name, Class<? extends BaseEntity> entityClass) {
    this.name = name;
    this.entityClass = entityClass;
  }

  /**
   * Get entity type by name.
   * @param name name of the entity type
   * @return entity type with given name
   */
  public static EntityType getByName(String name) {
    for (EntityType entityType : EntityType.values()) {
      if (entityType.getName().equalsIgnoreCase(name)) {
        return entityType;
      }
    }

    return null;
  }
}
