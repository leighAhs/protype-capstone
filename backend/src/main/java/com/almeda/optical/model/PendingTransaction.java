package com.almeda.optical.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pending_transactions")
public class PendingTransaction {
  @Id
  private Integer id;

  @Column(name = "txn_id")
  private String txnId;

  @Column(name = "tx_date")
  private String txDate;

  @Column(name = "customer_name")
  private String customerName;

  private String items;

  @Column(name = "item_type")
  private String itemType;

  private Double amount;
  private String payment;

  @Column(name = "rx_by")
  private String rxBy;

  @Column(name = "item_status")
  private String itemStatus;

  @Column(name = "remaining_balance")
  private Double remainingBalance;

  private String status;

  @Column(name = "tx_time")
  private String txTime;

  public Integer getId() {
    return id;
  }

  public String getTxnId() {
    return txnId;
  }

  public String getTxDate() {
    return txDate;
  }

  public String getCustomerName() {
    return customerName;
  }

  public String getItems() {
    return items;
  }

  public String getItemType() {
    return itemType;
  }

  public Double getAmount() {
    return amount;
  }

  public String getPayment() {
    return payment;
  }

  public String getRxBy() {
    return rxBy;
  }

  public String getItemStatus() {
    return itemStatus;
  }

  public Double getRemainingBalance() {
    return remainingBalance;
  }

  public void setRemainingBalance(Double remainingBalance) {
    this.remainingBalance = remainingBalance;
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

  public void setItemStatus(String itemStatus) {
    this.itemStatus = itemStatus;
  }
}
