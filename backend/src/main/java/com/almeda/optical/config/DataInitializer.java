package com.almeda.optical.config;

import com.almeda.optical.model.Role;
import com.almeda.optical.model.User;
import com.almeda.optical.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
  private final UserRepository userRepository;

  public DataInitializer(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostConstruct
  public void init() {
    if (userRepository.count() == 0) {
      userRepository.save(new User(null, "admin", "admin", "Admin User", Role.ADMIN));
    }
  }
}
