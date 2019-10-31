package org.motechproject.newebodac.service;

import java.util.List;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;
import org.motechproject.newebodac.constants.DefaultPermissions;
import org.motechproject.newebodac.domain.security.User;
import org.motechproject.newebodac.dto.UserDto;
import org.motechproject.newebodac.exception.EntityNotFoundException;
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

  @PreAuthorize(DefaultPermissions.HAS_USER_READ_ROLE)
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
   * Deletes user with given id.
   * @param id ID of user to delete.
   */
  @PreAuthorize(DefaultPermissions.HAS_USER_WRITE_ROLE)
  public void delete(UUID id) {
    User fieldConfig = userRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("User with id: {0} not found", id.toString()));
    userRepository.delete(fieldConfig);
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
    MAPPER.update(userDto, user);
    if (StringUtils.isNotBlank(userDto.getPassword())) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
    return MAPPER.toDto(userRepository.save(user));
  }
}
