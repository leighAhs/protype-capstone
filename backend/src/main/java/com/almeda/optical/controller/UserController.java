package com.almeda.optical.controller;

import com.almeda.optical.model.Role;
import com.almeda.optical.model.User;
import com.almeda.optical.model.UserActivityLog;
import com.almeda.optical.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<?> getUsers(@RequestHeader(value = "X-User-Role", defaultValue = "STAFF") String callerRole) {
    if (!callerRole.equalsIgnoreCase("ADMIN")) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Admin access required"));
    }

    List<Map<String, Object>> users = userService.getUsers().stream()
      .map(this::toResponse)
      .collect(Collectors.toList());
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{userId}/activity")
  public ResponseEntity<?> getUserActivity(@RequestHeader(value = "X-User-Role", defaultValue = "STAFF") String callerRole,
                                           @RequestHeader(value = "X-User-Id", defaultValue = "-1") int callerId,
                                           @PathVariable int userId) {
    if (!callerRole.equalsIgnoreCase("ADMIN") && callerId != userId) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Not authorized to view this activity log"));
    }

    List<Map<String, Object>> logs = userService.getActivityHistory(userId).stream()
      .map(this::toActivityResponse)
      .collect(Collectors.toList());

    return ResponseEntity.ok(logs);
  }

  @PostMapping
  public ResponseEntity<?> createUser(@RequestHeader(value = "X-User-Role", defaultValue = "STAFF") String callerRole,
                                      @RequestHeader(value = "X-User-Id", defaultValue = "-1") int callerId,
                                      @RequestBody UserPayload payload) {
    if (!callerRole.equalsIgnoreCase("ADMIN")) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Admin access required"));
    }

    Role role = parseRole(payload.role());
    if (role == null) {
      return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
    }

    User created = userService.createUser(payload.username(), payload.password(), payload.displayName(), role);
    userService.logActivity(created.getId(), "Account created by admin #" + callerId);
    return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(created));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@RequestHeader(value = "X-User-Role", defaultValue = "STAFF") String callerRole,
                                      @RequestHeader(value = "X-User-Id", defaultValue = "-1") int callerId,
                                      @PathVariable int id,
                                      @RequestBody UserPayload payload) {
    if (!callerRole.equalsIgnoreCase("ADMIN") && callerId != id) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Not authorized to update this user"));
    }

    Role role = parseRole(payload.role());
    if (role == null) {
      return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
    }

    Optional<User> updated = userService.updateUser(id, payload.username(), payload.password(), payload.displayName(), role);
    return updated
      .map(user -> {
        userService.logActivity(id, callerId == id ? "Profile updated" : "Updated by admin #" + callerId);
        return ResponseEntity.ok(toResponse(user));
      })
      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found")));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@RequestHeader(value = "X-User-Role", defaultValue = "STAFF") String callerRole,
                                      @RequestHeader(value = "X-User-Id", defaultValue = "-1") int callerId,
                                      @PathVariable int id) {
    if (!callerRole.equalsIgnoreCase("ADMIN")) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Admin access required"));
    }

    boolean removed = userService.deleteUser(id);
    if (removed) {
      userService.logActivity(callerId, "Deleted user account #" + id);
      return ResponseEntity.ok(Map.of("success", true));
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
  }

  private Map<String, Object> toResponse(User user) {
    return Map.of(
      "id", user.getId(),
      "username", user.getUsername(),
      "displayName", user.getFullName(),
      "role", user.getRole().name()
    );
  }

  private Map<String, Object> toActivityResponse(UserActivityLog log) {
    return Map.of(
      "id", log.getId(),
      "description", log.getActivityDescription(),
      "type", log.getActivityType(),
      "timestamp", log.getEventTimestamp().toString()
    );
  }

  private Role parseRole(String role) {
    if (role == null) return null;
    try {
      return Role.valueOf(role.toUpperCase());
    } catch (IllegalArgumentException e) {
      return null;
    }
  }

  private record UserPayload(String username, String password, String displayName, String role) {}
}
