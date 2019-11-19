package org.motechproject.newebodac.constants;

@SuppressWarnings({"PMD.AvoidDuplicateLiterals", "PMD.ClassNamingConventions"})
public class DefaultPermissions {

  private static final String ADMIN = "ROLE_ADMIN";
  private static final String VACCINEE_READ = "ROLE_vaccinee_READ";
  private static final String VACCINEE_WRITE = "ROLE_vaccinee_WRITE";
  private static final String MESSAGE_READ = "ROLE_campaignMessage_READ";
  private static final String MESSAGE_WRITE = "ROLE_campaignMessage_WRITE";
  private static final String GROUP_READ = "ROLE_group_READ";
  private static final String GROUP_WRITE = "ROLE_group_WRITE";
  private static final String KEY_COMMUNITY_PERSON_READ = "ROLE_keyCommunityPerson_READ";
  private static final String KEY_COMMUNITY_PERSON_WRITE = "ROLE_keyCommunityPerson_WRITE";
  private static final String LANGUAGE_READ = "ROLE_language_READ";
  private static final String LANGUAGE_WRITE = "ROLE_language_WRITE";
  private static final String SITE_READ = "ROLE_site_READ";
  private static final String SITE_WRITE = "ROLE_site_WRITE";
  private static final String VISIT_READ = "ROLE_visit_READ";
  private static final String VISIT_WRITE = "ROLE_visit_WRITE";
  private static final String ROLE_READ = "ROLE_role_READ";
  private static final String ROLE_WRITE = "ROLE_role_WRITE";
  private static final String USER_READ = "ROLE_user_READ";
  private static final String USER_WRITE = "ROLE_user_WRITE";
  private static final String VISIT_TYPE_READ = "ROLE_visitType_READ";
  private static final String VISIT_TYPE_WRITE = "ROLE_visitType_WRITE";
  private static final String MANAGE_FIELD_CONFIG = "ROLE_fieldConfig_MANAGE";
  private static final String MANAGE_CSV_CONFIG = "ROLE_csvConfig_MANAGE";
  private static final String MANAGE_JSON_CONFIG = "ROLE_jsonConfig_MANAGE";
  private static final String MANAGE_APP_SETTINGS = "ROLE_appSettings_MANAGE";

  public static final String DISPLAY_REPORTS = "ROLE_DISPLAY_REPORTS";
  public static final String HAS_VACCINEE_READ_ROLE = "hasRole('" + VACCINEE_READ + "')";
  public static final String HAS_VACCINEE_WRITE_ROLE = "hasRole('" + VACCINEE_WRITE + "')";
  public static final String HAS_ADMIN_ROLE = "hasRole('" + ADMIN + "')";
  public static final String HAS_DISPLAY_REPORTS_ROLE = "hasRole('" + DISPLAY_REPORTS + "')";
  public static final String HAS_GROUP_READ_ROLE = "hasRole('" + GROUP_READ + "')";
  public static final String HAS_GROUP_WRITE_ROLE = "hasRole('" + GROUP_WRITE + "')";
  public static final String HAS_MESSAGE_READ_ROLE = "hasRole('" + MESSAGE_READ + "')";
  public static final String HAS_MESSAGE_WRITE_ROLE = "hasRole('" + MESSAGE_WRITE + "')";
  public static final String HAS_KCP_READ_ROLE = "hasRole('" + KEY_COMMUNITY_PERSON_READ + "')";
  public static final String HAS_KCP_WRITE_ROLE = "hasRole('" + KEY_COMMUNITY_PERSON_WRITE + "')";
  public static final String HAS_LANGUAGE_READ_ROLE = "hasRole('" + LANGUAGE_READ + "')";
  public static final String HAS_LANGUAGE_WRITE_ROLE = "hasRole('" + LANGUAGE_WRITE + "')";
  public static final String HAS_SITE_READ_ROLE = "hasRole('" + SITE_READ + "')";
  public static final String HAS_SITE_WRITE_ROLE = "hasRole('" + SITE_WRITE + "')";
  public static final String HAS_VISIT_READ_ROLE = "hasRole('" + VISIT_READ + "')";
  public static final String HAS_VISIT_WRITE_ROLE = "hasRole('" + VISIT_WRITE + "')";
  public static final String HAS_ROLE_READ_ROLE = "hasRole('" + ROLE_READ + "')";
  public static final String HAS_ROLE_WRITE_ROLE = "hasRole('" + ROLE_WRITE + "')";
  public static final String HAS_USER_READ_ROLE = "hasRole('" + USER_READ + "')";
  public static final String HAS_USER_WRITE_ROLE = "hasRole('" + USER_WRITE + "')";
  public static final String HAS_VISIT_TYPE_READ_ROLE = "hasRole('" + VISIT_TYPE_READ + "')";
  public static final String HAS_VISIT_TYPE_WRITE_ROLE = "hasRole('" + VISIT_TYPE_WRITE + "')";
  public static final String HAS_MANAGE_FIELD_CONFIG_ROLE =
      "hasRole('" + MANAGE_FIELD_CONFIG + "')";
  public static final String HAS_MANAGE_CSV_CONFIG_ROLE = "hasRole('" + MANAGE_CSV_CONFIG + "')";
  public static final String HAS_MANAGE_JSON_CONFIG_ROLE = "hasRole('" + MANAGE_JSON_CONFIG + "')";
  public static final String HAS_MANAGE_APP_SETTINGS_ROLE =
      "hasRole('" + MANAGE_APP_SETTINGS + "')";
}
