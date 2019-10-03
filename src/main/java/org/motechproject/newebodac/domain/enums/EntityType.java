package org.motechproject.newebodac.domain.enums;

import lombok.Getter;

public enum EntityType {
  VACCINEE("vaccinee"),
  VISIT("visit"),
  SITE("site"),
  GROUP("group"),
  PERSON("keyCommunityPerson"),
  LANGUAGE("language"),
  VISIT_TYPE("visitType"),
  ROLE("role"),
  PERMISSION("permission");

  @Getter
  private String name;

  EntityType(String name) {
    this.name = name;
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
