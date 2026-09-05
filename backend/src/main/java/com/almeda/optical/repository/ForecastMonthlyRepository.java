package com.almeda.optical.repository;

import com.almeda.optical.model.ForecastMonthly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForecastMonthlyRepository extends JpaRepository<ForecastMonthly, Integer> {
}
