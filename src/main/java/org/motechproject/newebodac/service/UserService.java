package org.motechproject.newebodac.service;

import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User getUserByUserName(String userName) {
    return userRepository.findOneByUsername(userName).orElseThrow(() ->
        new EntityNotFoundException("User with username: {0} not found", userName));
  }
}
