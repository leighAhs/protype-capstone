package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "forecast_monthly")
public class ForecastMonthly {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String month;

  @Column(nullable = false)
  private String type;

  @Column(nullable = false)
  private Double revenue;

  @Column(nullable = false)
  private String units;

  @Column(name = "change_pct", nullable = false)
  private String changePct;

  @Column(nullable = false)
  private String action;

  @Column(nullable = false)
  private String confidence;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public ForecastMonthly() {}

  public ForecastMonthly(Integer id, String month, String type, Double revenue, String units,
                        String changePct, String action, String confidence, LocalDateTime createdAt) {
    this.id = id;
    this.month = month;
    this.type = type;
    this.revenue = revenue;
    this.units = units;
    this.changePct = changePct;
    this.action = action;
    this.confidence = confidence;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getMonth() {
    return month;
  }

  public void setMonth(String month) {
    this.month = month;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Double getRevenue() {
    return revenue;
  }

  public void setRevenue(Double revenue) {
    this.revenue = revenue;
  }

  public String getUnits() {
    return units;
  }

  public void setUnits(String units) {
    this.units = units;
  }

  public String getChangePct() {
    return changePct;
  }

  public void setChangePct(String changePct) {
    this.changePct = changePct;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public String getConfidence() {
    return confidence;
  }

  public void setConfidence(String confidence) {
    this.confidence = confidence;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
