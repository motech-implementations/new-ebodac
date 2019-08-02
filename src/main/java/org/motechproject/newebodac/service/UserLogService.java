package org.motechproject.newebodac.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.domain.security.UserLog;
import org.motechproject.newebodac.repository.UserLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLogService {

  @Autowired
  private UserLogRepository userLogRepository;

  /**
   * Create new User Log.
   * @param user a user that is logging in
   * @param expirationDate access token's expiration date
   */
  public void createNewUserLog(User user, Date expirationDate) {
    UserLog userLog = new UserLog();
    userLog.setUser(user);
    userLog.setLoginDate(LocalDateTime.now());
    userLog.setLogoutDate(expirationDate.toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDateTime());

    userLogRepository.save(userLog);
  }

  /**
   * Create new or update existing User Log.
   * @param user a user that is logging in
   * @param expirationDate access token's expiration date
   */
  public void createOrUpdateUserLog(User user, Date expirationDate) {
    userLogRepository.findFirstByUserOrderByLoginDateDesc(user).ifPresentOrElse(
        userLog -> {
          userLog.setLogoutDate(LocalDateTime.from(expirationDate.toInstant()));
          userLogRepository.save(userLog);
        },
        () -> createNewUserLog(user, expirationDate));
  }
}
