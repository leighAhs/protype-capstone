package com.almeda.optical.controller;

import com.almeda.optical.model.Customer;
import com.almeda.optical.model.InventoryProduct;
import com.almeda.optical.model.Transaction;
import com.almeda.optical.model.TransactionItem;
import com.almeda.optical.model.PendingTransaction;
import com.almeda.optical.model.ForecastMonthly;
import com.almeda.optical.model.TopDemand;
import com.almeda.optical.repository.CustomerRepository;
import com.almeda.optical.repository.InventoryProductRepository;
import com.almeda.optical.repository.TransactionRepository;
import com.almeda.optical.repository.TransactionItemRepository;
import com.almeda.optical.repository.PendingTransactionRepository;
import com.almeda.optical.repository.ForecastMonthlyRepository;
import com.almeda.optical.repository.TopDemandRepository;
import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {
  private final AtomicInteger inventoryId = new AtomicInteger(1000);
  private final CustomerRepository customerRepository;
  private final InventoryProductRepository inventoryProductRepository;
  private final TransactionRepository transactionRepository;
  private final TransactionItemRepository transactionItemRepository;
  private final PendingTransactionRepository pendingTransactionRepository;
  private final ForecastMonthlyRepository forecastMonthlyRepository;
  private final TopDemandRepository topDemandRepository;

  public ApiController(CustomerRepository customerRepository, 
                      InventoryProductRepository inventoryProductRepository,
                      TransactionRepository transactionRepository,
                      TransactionItemRepository transactionItemRepository,
                      PendingTransactionRepository pendingTransactionRepository,
                      ForecastMonthlyRepository forecastMonthlyRepository,
                      TopDemandRepository topDemandRepository) {
    this.customerRepository = customerRepository;
    this.inventoryProductRepository = inventoryProductRepository;
    this.transactionRepository = transactionRepository;
    this.transactionItemRepository = transactionItemRepository;
    this.pendingTransactionRepository = pendingTransactionRepository;
    this.forecastMonthlyRepository = forecastMonthlyRepository;
    this.topDemandRepository = topDemandRepository;
  }

  @GetMapping("/data")
  public Map<String, Object> getData() {
    Map<String, Object> payload = new HashMap<>();
    payload.put("customers", customerRepository.findAll());
    payload.put("inventory", inventoryProductRepository.findAll());
    payload.put("transactions", getTransactions());
    payload.put("forecastMonthly", forecastMonthlyRepository.findAll());
    payload.put("topDemand", topDemandRepository.findAll());
    payload.put("transactionItems", transactionItemRepository.findAll());
    return payload;
  }

  @GetMapping("/inventory")
  public java.util.List<InventoryProduct> getInventory() {
    return inventoryProductRepository.findAll();
  }

  @GetMapping("/transactions")
  public java.util.List<Transaction> getTransactions() {
    java.util.List<Transaction> transactions = new java.util.ArrayList<>(transactionRepository.findAll());
    pendingTransactionRepository.findAll().forEach(pending -> transactions.add(asTransaction(pending)));
    return transactions;
  }

  @PostMapping("/transactions")
  public Transaction addTransaction(@RequestBody TransactionPayload payload) {
    LocalDateTime now = LocalDateTime.now();
    String itemType = payload.itemType() == null ? "" : payload.itemType().trim().toUpperCase();
    if (!java.util.Set.of("PRESCRIPTION", "SUNGLASSES", "ONLY FRAME", "ACCESSORIES").contains(itemType)) {
      throw new IllegalArgumentException("Select a valid transaction item type.");
    }
    if ("PRESCRIPTION".equals(itemType)
        && (isBlank(payload.prescriptionOd()) || isBlank(payload.prescriptionOs()) || isBlank(payload.rxBy()))) {
      throw new IllegalArgumentException("Prescription transactions require OD, OS, and RX BY.");
    }
    Transaction transaction = new Transaction();
    transaction.setTxnId("TXN-" + now.format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")));
    transaction.setTxDate(now.toLocalDate().toString());
    transaction.setTxTime(now.toLocalTime().withNano(0).toString());
    transaction.setCustomerName("ACCESSORIES".equals(itemType) && (payload.customerName() == null || payload.customerName().isBlank())
        ? "Accessory Sale" : payload.customerName());
    transaction.setItems(payload.item());
    transaction.setItemType(itemType);
    transaction.setAmount(payload.amount());
    transaction.setPayment(payload.payment());
    String rxBy = payload.rxBy() == null ? null : payload.rxBy().trim();
    transaction.setRxBy(rxBy == null || rxBy.isBlank() ? null : rxBy);
    transaction.setItemStatus(payload.itemStatus() == null || payload.itemStatus().isBlank() ? "Processing" : payload.itemStatus().trim());
    transaction.setStatus(payload.paymentStatus() == null || payload.paymentStatus().isBlank() ? "Paid" : payload.paymentStatus().trim());
    transaction.setRemainingBalance("Half Paid".equals(transaction.getStatus()) ? transaction.getAmount() : 0.0);
    transaction.setCreatedAt(now);
    return transactionRepository.save(transaction);
  }

  private boolean isBlank(String value) {
    return value == null || value.isBlank();
  }

  @PutMapping("/transactions/{txnId}/item-status")
  public Transaction updateItemStatus(@PathVariable String txnId, @RequestBody ItemStatusPayload payload) {
    String itemStatus = payload.itemStatus() == null ? "" : payload.itemStatus().trim();
    if (!java.util.Set.of("Processing", "Ready", "Completed").contains(itemStatus)) {
      throw new IllegalArgumentException("Invalid item status.");
    }
    java.util.Optional<PendingTransaction> pending = pendingTransactionRepository.findByTxnId(txnId);
    if (pending.isPresent()) {
      if ("Completed".equals(itemStatus) && "Half Paid".equalsIgnoreCase(pending.get().getStatus())) {
        throw new IllegalArgumentException("Payment must be marked Paid before completing this transaction.");
      }
      pending.get().setItemStatus(itemStatus);
      pendingTransactionRepository.save(pending.get());
      return asTransaction(pending.get());
    }
    Transaction transaction = transactionRepository.findByTxnId(txnId)
        .orElseThrow(() -> new IllegalArgumentException("Transaction not found: " + txnId));
    if ("Completed".equals(itemStatus) && "Half Paid".equalsIgnoreCase(transaction.getStatus())) {
      throw new IllegalArgumentException("Payment must be marked Paid before completing this transaction.");
    }
    transaction.setItemStatus(itemStatus);
    return transactionRepository.save(transaction);
  }

  @PutMapping("/transactions/{txnId}/payment-status")
  public Transaction updatePaymentStatus(@PathVariable String txnId, @RequestBody PaymentStatusPayload payload) {
    double paymentAmount = payload.paymentAmount() == null ? 0.0 : payload.paymentAmount();
    if (paymentAmount <= 0) {
      throw new IllegalArgumentException("Payment amount must be greater than zero.");
    }
    java.util.Optional<PendingTransaction> pending = pendingTransactionRepository.findByTxnId(txnId);
    if (pending.isPresent()) {
      applyPayment(pending.get(), paymentAmount);
      pendingTransactionRepository.save(pending.get());
      return asTransaction(pending.get());
    }
    Transaction transaction = transactionRepository.findByTxnId(txnId)
        .orElseThrow(() -> new IllegalArgumentException("Transaction not found: " + txnId));
    applyPayment(transaction, paymentAmount);
    return transactionRepository.save(transaction);
  }

  private void applyPayment(PendingTransaction transaction, double paymentAmount) {
    double remainingBalance = transaction.getRemainingBalance() == null
        ? transaction.getAmount() / 2
        : transaction.getRemainingBalance();
    if (paymentAmount > remainingBalance) {
      throw new IllegalArgumentException("Payment amount cannot exceed the remaining balance.");
    }
    double updatedBalance = Math.max(0.0, remainingBalance - paymentAmount);
    transaction.setRemainingBalance(updatedBalance);
    transaction.setStatus(updatedBalance == 0.0 ? "Paid" : "Half Paid");
  }

  private void applyPayment(Transaction transaction, double paymentAmount) {
    double remainingBalance = transaction.getRemainingBalance() == null
        ? transaction.getAmount() / 2
        : transaction.getRemainingBalance();
    if (paymentAmount > remainingBalance) {
      throw new IllegalArgumentException("Payment amount cannot exceed the remaining balance.");
    }
    double updatedBalance = Math.max(0.0, remainingBalance - paymentAmount);
    transaction.setRemainingBalance(updatedBalance);
    transaction.setStatus(updatedBalance == 0.0 ? "Paid" : "Half Paid");
  }

  private Transaction asTransaction(PendingTransaction pending) {
    Transaction transaction = new Transaction();
    transaction.setId(pending.getId());
    transaction.setTxnId(pending.getTxnId());
    transaction.setTxDate(pending.getTxDate());
    transaction.setCustomerName(pending.getCustomerName());
    transaction.setItems(pending.getItems());
    transaction.setItemType(pending.getItemType());
    transaction.setAmount(pending.getAmount());
    transaction.setPayment(pending.getPayment());
    transaction.setRxBy(pending.getRxBy());
    transaction.setItemStatus(pending.getItemStatus());
    transaction.setRemainingBalance(pending.getRemainingBalance());
    transaction.setStatus(pending.getStatus());
    transaction.setTxTime(pending.getTxTime());
    return transaction;
  }

  @PostMapping("/customers")
  public Customer addCustomer(@RequestBody CustomerPayload payload) {
    String name = payload.name() == null ? "" : payload.name().trim();
    if (name.isBlank()) {
      throw new IllegalArgumentException("Customer name is required.");
    }

    String[] nameParts = name.split("\\s+");
    String initials = nameParts.length == 1
        ? nameParts[0].substring(0, 1).toUpperCase()
        : (nameParts[0].substring(0, 1) + nameParts[nameParts.length - 1].substring(0, 1)).toUpperCase();

    Customer customer = new Customer();
    customer.setInitials(initials);
    customer.setName(name);
    customer.setContactNumber(payload.contactNumber());
    customer.setAge(payload.age());
    customer.setAddress(payload.address());
    customer.setEmail(payload.email());
    customer.setCardNo("ALM-" + System.currentTimeMillis());
    customer.setPoints(0);
    customer.setTotalSpend(payload.totalSpend() == null ? 0.0 : payload.totalSpend());
    customer.setLastVisit(LocalDate.now().toString());
    customer.setStatus("Active");
    customer.setPrescriptionOd(payload.prescriptionOd());
    customer.setPrescriptionOs(payload.prescriptionOs());
    customer.setCreatedAt(LocalDateTime.now());
    return customerRepository.save(customer);
  }

  @PostMapping("/inventory")
  public InventoryProduct addInventory(@RequestBody InventoryPayload payload) {
    String now = LocalDate.now().toString();
    String sku = payload.sku() != null && !payload.sku().isBlank() ? payload.sku() : payload.name().substring(0, Math.min(3, payload.name().length())).toUpperCase() + "-" + inventoryId.incrementAndGet();
    InventoryProduct product = new InventoryProduct();
    product.setName(payload.name());
    product.setSku(sku);
    product.setCategory(payload.category());
    product.setInStock(0);
    product.setReorderPoint(0);
    product.setStockLevelPct(0);
    product.setStockColor("var(--accent-mid)");
    product.setLastUpdated(now);
    product.setStatus("OK");
    product.setCreatedAt(LocalDateTime.now());
    return inventoryProductRepository.save(product);
  }

  private record Credential(String username, String password) {}
  private record InventoryPayload(String name, String sku, String category) {}
  private record CustomerPayload(String name, String contactNumber, Integer age, String address, String email, Double totalSpend, String prescriptionOd, String prescriptionOs) {}
  private record TransactionPayload(String customerName, String item, Double amount, String payment,
                                    @JsonAlias("item_type") String itemType,
                                    @JsonAlias("prescription_od") String prescriptionOd,
                                    @JsonAlias("prescription_os") String prescriptionOs,
                                    @JsonAlias("rx_by") String rxBy,
                                    @JsonAlias("item_status") String itemStatus,
                                    @JsonAlias("payment_status") String paymentStatus) {}
  private record ItemStatusPayload(@JsonAlias("item_status") String itemStatus) {}
  private record PaymentStatusPayload(@JsonAlias({"payment_amount", "remaining_balance"}) Double paymentAmount) {}
}
