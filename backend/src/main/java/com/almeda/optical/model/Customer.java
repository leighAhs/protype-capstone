package com.almeda.optical.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String initials;

  @Column(nullable = false)
  private String name;

  @Column(name = "contact_number")
  private String contactNumber;

  @Column
  private Integer age;

  @Column
  private String address;

  @Column
  private String email;

  @Column(name = "card_no", nullable = false, unique = true)
  private String cardNo;

  @Column(nullable = false)
  private Integer points;

  @Column(name = "total_spend", nullable = false)
  private Double totalSpend;

  @Column(name = "last_visit")
  private String lastVisit;

  @Column(nullable = false)
  private String status;

  @Column(name = "prescription_od")
  private String prescriptionOd;

  @Column(name = "prescription_os")
  private String prescriptionOs;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  public Customer() {}

  public Customer(Integer id, String initials, String name, String cardNo, Integer points,
                  Double totalSpend, String lastVisit, String status, LocalDateTime createdAt) {
    this.id = id;
    this.initials = initials;
    this.name = name;
    this.cardNo = cardNo;
    this.points = points;
    this.totalSpend = totalSpend;
    this.lastVisit = lastVisit;
    this.status = status;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getInitials() {
    return initials;
  }

  public void setInitials(String initials) {
    this.initials = initials;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getContactNumber() {
    return contactNumber;
  }

  public void setContactNumber(String contactNumber) {
    this.contactNumber = contactNumber;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCardNo() {
    return cardNo;
  }

  public void setCardNo(String cardNo) {
    this.cardNo = cardNo;
  }

  public Integer getPoints() {
    return points;
  }

  public void setPoints(Integer points) {
    this.points = points;
  }

  public Double getTotalSpend() {
    return totalSpend;
  }

  public void setTotalSpend(Double totalSpend) {
    this.totalSpend = totalSpend;
  }

  public String getLastVisit() {
    return lastVisit;
  }

  public void setLastVisit(String lastVisit) {
    this.lastVisit = lastVisit;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getPrescriptionOd() {
    return prescriptionOd;
  }

  public void setPrescriptionOd(String prescriptionOd) {
    this.prescriptionOd = prescriptionOd;
  }

  public String getPrescriptionOs() {
    return prescriptionOs;
  }

  public void setPrescriptionOs(String prescriptionOs) {
    this.prescriptionOs = prescriptionOs;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
