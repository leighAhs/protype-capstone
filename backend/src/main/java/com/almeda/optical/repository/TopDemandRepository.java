package com.almeda.optical.repository;

import com.almeda.optical.model.TopDemand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopDemandRepository extends JpaRepository<TopDemand, Integer> {
}
