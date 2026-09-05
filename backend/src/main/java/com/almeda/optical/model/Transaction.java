package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "txn_id", nullable = false, unique = true)
  private String txnId;

  @Column(name = "tx_date", nullable = false)
  private String txDate;

  @Column(name = "customer_name", nullable = false)
  private String customerName;

  @Column(nullable = false)
  private String items;

  @Column(nullable = false)
  private Double amount;

  @Column(nullable = false)
  private String payment;

  @Column(nullable = false)
  private String status;

  @Column(name = "tx_time", nullable = false)
  private String txTime;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public Transaction() {}

  public Transaction(Integer id, String txnId, String txDate, String customerName, String items,
                    Double amount, String payment, String status, String txTime, LocalDateTime createdAt) {
    this.id = id;
    this.txnId = txnId;
    this.txDate = txDate;
    this.customerName = customerName;
    this.items = items;
    this.amount = amount;
    this.payment = payment;
    this.status = status;
    this.txTime = txTime;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getTxnId() {
    return txnId;
  }

  public void setTxnId(String txnId) {
    this.txnId = txnId;
  }

  public String getTxDate() {
    return txDate;
  }

  public void setTxDate(String txDate) {
    this.txDate = txDate;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getItems() {
    return items;
  }

  public void setItems(String items) {
    this.items = items;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public String getPayment() {
    return payment;
  }

  public void setPayment(String payment) {
    this.payment = payment;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getTxTime() {
    return txTime;
  }

  public void setTxTime(String txTime) {
    this.txTime = txTime;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
