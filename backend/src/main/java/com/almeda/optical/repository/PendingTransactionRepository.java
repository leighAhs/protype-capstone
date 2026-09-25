package com.almeda.optical.repository;

import com.almeda.optical.model.PendingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PendingTransactionRepository extends JpaRepository<PendingTransaction, Integer> {
  Optional<PendingTransaction> findByTxnId(String txnId);
}
