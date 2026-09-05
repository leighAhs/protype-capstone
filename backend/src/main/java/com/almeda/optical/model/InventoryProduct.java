package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_products")
public class InventoryProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String sku;

  @Column(nullable = false)
  private String category;

  @Column(name = "in_stock", nullable = false)
  private Integer inStock;

  @Column(name = "reorder_point", nullable = false)
  private Integer reorderPoint;

  @Column(name = "stock_level_pct", nullable = false)
  private Integer stockLevelPct;

  @Column(name = "stock_color")
  private String stockColor;

  @Column(name = "last_updated")
  private String lastUpdated;

  @Column(nullable = false)
  private String status;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public InventoryProduct() {}

  public InventoryProduct(Integer id, String name, String sku, String category, Integer inStock,
                         Integer reorderPoint, Integer stockLevelPct, String stockColor,
                         String lastUpdated, String status, LocalDateTime createdAt) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.category = category;
    this.inStock = inStock;
    this.reorderPoint = reorderPoint;
    this.stockLevelPct = stockLevelPct;
    this.stockColor = stockColor;
    this.lastUpdated = lastUpdated;
    this.status = status;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSku() {
    return sku;
  }

  public void setSku(String sku) {
    this.sku = sku;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public Integer getInStock() {
    return inStock;
  }

  public void setInStock(Integer inStock) {
    this.inStock = inStock;
  }

  public Integer getReorderPoint() {
    return reorderPoint;
  }

  public void setReorderPoint(Integer reorderPoint) {
    this.reorderPoint = reorderPoint;
  }

  public Integer getStockLevelPct() {
    return stockLevelPct;
  }

  public void setStockLevelPct(Integer stockLevelPct) {
    this.stockLevelPct = stockLevelPct;
  }

  public String getStockColor() {
    return stockColor;
  }

  public void setStockColor(String stockColor) {
    this.stockColor = stockColor;
  }

  public String getLastUpdated() {
    return lastUpdated;
  }

  public void setLastUpdated(String lastUpdated) {
    this.lastUpdated = lastUpdated;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
