package com.almeda.optical.controller;

import com.almeda.optical.model.Customer;
import com.almeda.optical.model.InventoryProduct;
import com.almeda.optical.model.Transaction;
import com.almeda.optical.model.TransactionItem;
import com.almeda.optical.model.ForecastMonthly;
import com.almeda.optical.model.TopDemand;
import com.almeda.optical.repository.CustomerRepository;
import com.almeda.optical.repository.InventoryProductRepository;
import com.almeda.optical.repository.TransactionRepository;
import com.almeda.optical.repository.TransactionItemRepository;
import com.almeda.optical.repository.ForecastMonthlyRepository;
import com.almeda.optical.repository.TopDemandRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
  private final ForecastMonthlyRepository forecastMonthlyRepository;
  private final TopDemandRepository topDemandRepository;

  public ApiController(CustomerRepository customerRepository, 
                      InventoryProductRepository inventoryProductRepository,
                      TransactionRepository transactionRepository,
                      TransactionItemRepository transactionItemRepository,
                      ForecastMonthlyRepository forecastMonthlyRepository,
                      TopDemandRepository topDemandRepository) {
    this.customerRepository = customerRepository;
    this.inventoryProductRepository = inventoryProductRepository;
    this.transactionRepository = transactionRepository;
    this.transactionItemRepository = transactionItemRepository;
    this.forecastMonthlyRepository = forecastMonthlyRepository;
    this.topDemandRepository = topDemandRepository;
  }

  @GetMapping("/data")
  public Map<String, Object> getData() {
    Map<String, Object> payload = new HashMap<>();
    payload.put("customers", customerRepository.findAll());
    payload.put("inventory", inventoryProductRepository.findAll());
    payload.put("transactions", transactionRepository.findAll());
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
    return transactionRepository.findAll();
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
}
