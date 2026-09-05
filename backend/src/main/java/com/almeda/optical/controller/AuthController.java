package com.almeda.optical.controller;

import com.almeda.optical.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {
  private final UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    return userService.findByCredentials(request.username(), request.password())
      .map(user -> {
        userService.logActivity(user.getId(), "Logged in");
        return ResponseEntity.ok(Map.of(
          "id", user.getId(),
          "username", user.getUsername(),
          "displayName", user.getFullName(),
          "role", user.getRole().name()
        ));
      })
      .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password")));
  }

  private record AuthRequest(String username, String password) {}
}
