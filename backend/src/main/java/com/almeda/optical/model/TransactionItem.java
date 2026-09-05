package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_items")
public class TransactionItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "txn_id", nullable = false)
  private String txnId;

  @Column(name = "item_name", nullable = false)
  private String itemName;

  @Column(nullable = false)
  private Integer quantity;

  @Column(name = "unit_price", nullable = false)
  private Double unitPrice;

  @Column(name = "line_total", nullable = false)
  private Double lineTotal;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public TransactionItem() {}

  public TransactionItem(Integer id, String txnId, String itemName, Integer quantity, Double unitPrice, Double lineTotal, LocalDateTime createdAt) {
    this.id = id;
    this.txnId = txnId;
    this.itemName = itemName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.lineTotal = lineTotal;
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

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Double getUnitPrice() {
    return unitPrice;
  }

  public void setUnitPrice(Double unitPrice) {
    this.unitPrice = unitPrice;
  }

  public Double getLineTotal() {
    return lineTotal;
  }

  public void setLineTotal(Double lineTotal) {
    this.lineTotal = lineTotal;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
