-- Run this against the current database: almeda_optical
-- This adds any missing customer and transaction fields needed by the POS app.

ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS age INT NULL AFTER contact_number,
  ADD COLUMN IF NOT EXISTS address VARCHAR(255) NULL AFTER age;

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS rx_by VARCHAR(255) NULL AFTER payment;

-- Optional sanity checks:
SELECT column_name
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND table_name IN ('customers', 'transactions')
  AND column_name IN ('age', 'address', 'rx_by')
ORDER BY table_name, column_name;
