package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "top_demand")
public class TopDemand {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String product;

  @Column(nullable = false)
  private String units;

  @Column(nullable = false)
  private String restock;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public TopDemand() {}

  public TopDemand(Integer id, String product, String units, String restock, LocalDateTime createdAt) {
    this.id = id;
    this.product = product;
    this.units = units;
    this.restock = restock;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getProduct() {
    return product;
  }

  public void setProduct(String product) {
    this.product = product;
  }

  public String getUnits() {
    return units;
  }

  public void setUnits(String units) {
    this.units = units;
  }

  public String getRestock() {
    return restock;
  }

  public void setRestock(String restock) {
    this.restock = restock;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
