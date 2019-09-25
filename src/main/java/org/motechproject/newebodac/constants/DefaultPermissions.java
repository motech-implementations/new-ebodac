package org.motechproject.newebodac.constants;

@SuppressWarnings({"PMD.AvoidDuplicateLiterals", "PMD.ClassNamingConventions"})
public class DefaultPermissions {

  public static final String ADMIN = "ROLE_ADMIN";
  public static final String VACCINEE_READ = "ROLE_VACCINEE_READ";
  public static final String VACCINEE_WRITE = "ROLE_VACCINEE_WRITE";
  public static final String MANAGE_USERS = "ROLE_MANAGE_USERS";
  public static final String DISPLAY_REPORTS = "ROLE_DISPLAY_REPORTS";
  public static final String GROUP_READ = "ROLE_GROUP_READ";
  public static final String GROUP_WRITE = "ROLE_GROUP_WRITE";
  public static final String HAS_VACCINEE_READ_ROLE = "hasRole('" + VACCINEE_READ + "')";
  public static final String HAS_VACCINEE_WRITE_ROLE = "hasRole('" + VACCINEE_WRITE + "')";
  public static final String HAS_ADMIN_ROLE = "hasRole('" + ADMIN + "')";
  public static final String HAS_MANAGE_USERS_ROLE = "hasRole('" + MANAGE_USERS + "')";
  public static final String HAS_DISPLAY_REPORTS_ROLE = "hasRole('" + DISPLAY_REPORTS + "')";
  public static final String HAS_GROUP_READ_ROLE = "hasRole('" + GROUP_READ + "')";
  public static final String HAS_GROUP_WRITE_ROLE = "hasRole('" + GROUP_WRITE + "')";
}
