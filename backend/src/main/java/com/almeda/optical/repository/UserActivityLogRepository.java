package com.almeda.optical.repository;

import com.almeda.optical.model.UserActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserActivityLogRepository extends JpaRepository<UserActivityLog, Integer> {
  List<UserActivityLog> findByUserIdOrderByEventTimestampDesc(int userId);
}
