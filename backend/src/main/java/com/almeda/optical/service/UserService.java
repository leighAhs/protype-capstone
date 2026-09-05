package com.almeda.optical.service;

import com.almeda.optical.model.Role;
import com.almeda.optical.model.User;
import com.almeda.optical.model.UserActivityLog;
import com.almeda.optical.repository.UserActivityLogRepository;
import com.almeda.optical.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final UserActivityLogRepository activityLogRepository;

  public UserService(UserRepository userRepository, UserActivityLogRepository activityLogRepository) {
    this.userRepository = userRepository;
    this.activityLogRepository = activityLogRepository;
  }

  public List<User> getUsers() {
    return userRepository.findAll();
  }

  public Optional<User> findByCredentials(String username, String password) {
    return userRepository.findByUsername(username)
      .filter(user -> user.getPassword().equals(password));
  }

  public Optional<User> getUserById(int id) {
    return userRepository.findById(id);
  }

  public User createUser(String username, String password, String fullName, Role role) {
    return userRepository.save(new User(null, username, password, fullName, role));
  }

  public Optional<User> updateUser(int id, String username, String password, String fullName, Role role) {
    return userRepository.findById(id).map(existing -> {
      String updatedPassword = password == null || password.isBlank() ? existing.getPassword() : password;
      existing.setUsername(username);
      existing.setPassword(updatedPassword);
      existing.setFullName(fullName);
      existing.setRole(role);
      return userRepository.save(existing);
    });
  }

  public boolean deleteUser(int id) {
    if (!userRepository.existsById(id)) {
      return false;
    }
    userRepository.deleteById(id);
    return true;
  }

  public List<UserActivityLog> getActivityHistory(int userId) {
    return activityLogRepository.findByUserIdOrderByEventTimestampDesc(userId);
  }

  public UserActivityLog logActivity(int userId, String description) {
    return activityLogRepository.save(new UserActivityLog(null, userId, description, "SYSTEM", LocalDateTime.now()));
  }
}
