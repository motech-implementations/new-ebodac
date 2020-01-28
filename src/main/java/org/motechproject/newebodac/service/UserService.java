package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.dto.UserDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
import org.motechproject.newebodac.exception.RelationViolationException;
import org.motechproject.newebodac.exception.UserAlreadyExistsException;
import org.motechproject.newebodac.mapper.UserMapper;
import org.motechproject.newebodac.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  private static final UserMapper MAPPER = UserMapper.INSTANCE;

  private static final String ADMIN_USER = "admin";

  public User getUserByUserName(String userName) {
    return userRepository.findOneByUsername(userName).orElseThrow(() ->
        new EntityNotFoundException("User with username: {0} not found", userName));
  }

  @PreAuthorize(DefaultPermissions.HAS_USER_READ_ROLE)
  public List<UserDto> getAll() {
    return MAPPER.toDtos(userRepository.findAll());
  }

  @PreAuthorize(DefaultPermissions.HAS_USER_READ_ROLE)
  public UserDto findById(UUID id) {
    return MAPPER.toDto(userRepository.getOne(id));
  }

  @PreAuthorize(DefaultPermissions.HAS_USER_WRITE_ROLE)
  public UserDto create(UserDto user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return MAPPER.toDto(userRepository.save(MAPPER.fromDto(user)));
  }

  /**
   * Create user from register form.
   * @param user Dto of user user to register.
   * @throws UserAlreadyExistsException if user with this username already exists.
   */
  public void register(UserDto user) {
    userRepository.findOneByUsername(user.getUsername()).ifPresent(u -> {
      throw new UserAlreadyExistsException("User with username: {0} already exists.",
          u.getUsername());
    });
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setEnabled(false);
    userRepository.save(MAPPER.fromDto(user));
  }

  /**
   * Deletes user with given id.
   * @param id ID of user to delete.
   * @throws RelationViolationException if Admin user is attempt to be deleted
   */
  @PreAuthorize(DefaultPermissions.HAS_USER_WRITE_ROLE)
  public void delete(UUID id) {
    User user = userRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("User with id: {0} not found", id.toString()));
    if (user.getUsername().equals(ADMIN_USER)) {
      throw new RelationViolationException("User with username: {0} can not be deleted",
          user.getUsername());
    } else {
      userRepository.delete(user);
    }
  }

  /**
   * Updates user with given id.
   * @param id ID of user to update.
   * @param userDto Dto of user to update.
   * @return the updated user
   */
  @PreAuthorize(DefaultPermissions.HAS_USER_WRITE_ROLE)
  public UserDto update(UUID id, UserDto userDto) {
    User user = userRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("User with id: {0} not found", id.toString()));
    if (user.getUsername().equals(ADMIN_USER)) {
      MAPPER.adminUpdate(userDto, user);
    } else {
      MAPPER.update(userDto, user);
    }
    if (StringUtils.isNotBlank(userDto.getPassword())) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
    return MAPPER.toDto(userRepository.save(user));
  }
}
