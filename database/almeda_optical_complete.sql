-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2026 at 07:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `almeda_optical`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `initials` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `card_no` varchar(50) NOT NULL,
  `points` int(11) NOT NULL,
  `total_spend` double NOT NULL,
  `last_visit` varchar(30) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `prescription_od` varchar(100) DEFAULT NULL,
  `prescription_os` varchar(100) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `initials`, `name`, `card_no`, `points`, `total_spend`, `last_visit`, `status`, `created_at`, `prescription_od`, `prescription_os`, `contact_number`, `age`, `address`, `email`) VALUES
(1, 'AJ', 'Amelia Johnson', 'ALM-0001', 1240, 24800, '2026-09-04', 'Active', '2026-01-05 09:10:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(2, 'BS', 'Benjamin Santos', 'ALM-0002', 680, 13600, '2026-08-29', 'Active', '2026-01-07 10:25:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(3, 'CM', 'Carla Mendoza', 'ALM-0003', 2420, 48400, '2026-09-06', 'Active', '2026-01-09 11:40:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(4, 'DL', 'Daniel Lee', 'ALM-0004', 180, 3600, '2026-07-18', 'Inactive', '2026-01-12 14:05:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(5, 'ER', 'Elena Rivera', 'ALM-0005', 1100, 22000, '2026-08-25', 'Active', '2026-01-15 15:20:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(6, 'FP', 'Felix Perez', 'ALM-0006', 520, 10400, '2026-08-11', 'Active', '2026-01-18 09:35:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(7, 'GH', 'Grace Hernandez', 'ALM-0007', 980, 19600, '2026-09-01', 'Active', '2026-01-20 13:10:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(8, 'HW', 'Hannah Williams', 'ALM-0008', 210, 4200, '2026-06-22', 'Inactive', '2026-01-22 16:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(9, 'IS', 'Ian Smith', 'ALM-0009', 740, 14800, '2026-08-30', 'Active', '2026-01-25 10:45:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(10, 'JC', 'Julia Cruz', 'ALM-0010', 2860, 57200, '2026-09-05', 'Active', '2026-01-28 12:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(11, 'KM', 'Kevin Morgan', 'ALM-0011', 1320, 26400, '2026-08-16', 'Active', '2026-02-01 09:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(12, 'LN', 'Lara Navarro', 'ALM-0012', 610, 12200, '2026-08-04', 'Active', '2026-02-03 11:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(13, 'MB', 'Marcus Brown', 'ALM-0013', 95, 1900, '2026-05-19', 'Inactive', '2026-02-05 14:40:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(14, 'NS', 'Nina Scott', 'ALM-0014', 1050, 21000, '2026-08-27', 'Active', '2026-02-08 15:55:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(15, 'OT', 'Oscar Torres', 'ALM-0015', 430, 8600, '2026-07-30', 'Active', '2026-02-10 10:20:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(16, 'PK', 'Paula Kim', 'ALM-0016', 3100, 62000, '2026-09-02', 'Active', '2026-02-13 13:35:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(17, 'QR', 'Quinn Reyes', 'ALM-0017', 160, 3200, '2026-06-10', 'Inactive', '2026-02-16 16:50:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(18, 'RA', 'Rafael Aquino', 'ALM-0018', 870, 17400, '2026-08-20', 'Active', '2026-02-19 09:25:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(19, 'SW', 'Sophia Wong', 'ALM-0019', 560, 11200, '2026-08-13', 'Active', '2026-02-22 11:40:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(20, 'TD', 'Thomas Diaz', 'ALM-0020', 1190, 23800, '2026-08-31', 'Active', '2026-02-25 14:55:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(21, 'UA', 'Uma Alvarez', 'ALM-0021', 225, 4500, '2026-07-05', 'Active', '2026-02-28 15:10:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(22, 'VB', 'Victor Bennett', 'ALM-0022', 700, 14000, '2026-08-18', 'Active', '2026-03-02 10:35:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(23, 'WC', 'Wendy Cooper', 'ALM-0023', 1010, 20200, '2026-08-24', 'Active', '2026-03-05 12:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(24, 'XY', 'Xavier Young', 'ALM-0024', 130, 2600, '2026-05-28', 'Inactive', '2026-03-08 13:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(25, 'YZ', 'Yasmin Zahra', 'ALM-0025', 2680, 53600, '2026-09-03', 'Active', '2026-03-11 16:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(26, 'AD', 'Aaron Delgado', 'ALM-0026', 480, 9600, '2026-07-26', 'Active', '2026-03-14 09:45:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(27, 'BK', 'Bianca King', 'ALM-0027', 920, 18400, '2026-08-09', 'Active', '2026-03-17 11:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(28, 'CN', 'Caleb Nguyen', 'ALM-0028', 260, 5200, '2026-07-12', 'Active', '2026-03-20 14:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(29, 'DS', 'Diana Silva', 'ALM-0029', 630, 12600, '2026-08-22', 'Active', '2026-03-23 15:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(30, 'EG', 'Ethan Garcia', 'ALM-0030', 1150, 23000, '2026-09-01', 'Active', '2026-03-26 10:05:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(31, 'FH', 'Fiona Hall', 'ALM-0031', 2250, 45000, '2026-08-28', 'Active', '2026-03-29 12:20:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(32, 'GM', 'George Miller', 'ALM-0032', 145, 2900, '2026-06-30', 'Inactive', '2026-04-01 13:35:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(33, 'HS', 'Hazel Stone', 'ALM-0033', 590, 11800, '2026-08-15', 'Active', '2026-04-04 16:50:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(34, 'IR', 'Iris Ramos', 'ALM-0034', 890, 17800, '2026-08-26', 'Active', '2026-04-07 09:05:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(35, 'JB', 'Jacob Brooks', 'ALM-0035', 315, 6300, '2026-07-21', 'Active', '2026-04-10 11:20:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(36, 'KC', 'Kara Castillo', 'ALM-0036', 760, 15200, '2026-08-19', 'Active', '2026-04-13 14:35:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(37, 'LM', 'Leo Martin', 'ALM-0037', 1280, 25600, '2026-09-06', 'Active', '2026-04-16 15:50:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(38, 'MR', 'Maya Robinson', 'ALM-0038', 3040, 60800, '2026-09-04', 'Active', '2026-04-19 10:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(39, 'NT', 'Noah Tan', 'ALM-0039', 200, 4000, '2026-06-17', 'Inactive', '2026-04-22 12:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(40, 'OW', 'Olivia White', 'ALM-0040', 680, 13600, '2026-08-07', 'Active', '2026-04-25 13:45:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(41, 'PC', 'Peter Collins', 'ALM-0041', 990, 19800, '2026-08-23', 'Active', '2026-04-28 17:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(42, 'RM', 'Ruby Morales', 'ALM-0042', 540, 10800, '2026-07-29', 'Active', '2026-05-01 09:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(43, 'SA', 'Samuel Adams', 'ALM-0043', 110, 2200, '2026-05-31', 'Inactive', '2026-05-04 11:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(44, 'TC', 'Tessa Chua', 'ALM-0044', 1080, 21600, '2026-08-17', 'Active', '2026-05-07 14:45:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(45, 'VG', 'Vanessa Gomez', 'ALM-0045', 2470, 49400, '2026-09-05', 'Active', '2026-05-10 16:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(46, 'WH', 'William Hayes', 'ALM-0046', 455, 9100, '2026-07-14', 'Active', '2026-05-13 10:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(47, 'XC', 'Xenia Castro', 'ALM-0047', 830, 16600, '2026-08-10', 'Active', '2026-05-16 12:30:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(48, 'YD', 'Yuri Dominguez', 'ALM-0048', 175, 3500, '2026-06-24', 'Inactive', '2026-05-19 13:45:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(49, 'ZS', 'Zoe Sullivan', 'ALM-0049', 615, 12300, '2026-08-21', 'Active', '2026-05-22 15:00:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(50, 'AA', 'Andrea Anderson', 'ALM-0050', 1160, 23200, '2026-09-02', 'Active', '2026-05-25 16:15:00', NULL, NULL, NULL, 0, 'N/A', NULL),
(51, 'JD', 'Juan Dela Cruz', 'ALM-0051', 0, 0, '2026-09-13', 'Active', '2026-09-13 22:22:09', '-1.50 / -0.25 x 180', '-1.25 / -0.50 x 175', NULL, 0, 'N/A', NULL),
(52, 'MS', 'Maria Santos', 'ALM-1789310389999', 0, 3500, '2026-09-13', 'Active', '2026-09-13 14:39:50', NULL, NULL, '09171234567', 0, 'N/A', NULL),
(53, 'JC', 'Juan Dela Cruz', 'ALM-1789310594633', 0, 3500, '2026-09-13', 'Active', '2026-09-13 14:43:14', NULL, NULL, '09171234567', 0, 'N/A', NULL),
(54, 'LG', 'Leigh Gadoc', 'ALM-1789311819720', 0, 3500, '2026-09-13', 'Active', '2026-09-13 15:03:39', NULL, NULL, '09171234567', 0, 'N/A', NULL),
(55, 'LG', 'Leigh Gadoc', 'ALM-1789311828831', 0, 3500, '2026-09-13', 'Active', '2026-09-13 15:03:48', NULL, NULL, '09171234567', 0, 'N/A', 'leigh00545@gmail.com'),
(56, 'LG', 'Leigh Gadoc', 'ALM-1789311837535', 0, 3500, '2026-09-13', 'Active', '2026-09-13 15:03:57', '120', '120', '09171234567', 0, 'N/A', 'leigh00545@gmail.com'),
(57, 'LG', 'Leigh Gadoc', 'ALM-1789311962151', 0, 3500, '2026-09-13', 'Active', '2026-09-13 15:06:02', '120', '120', '09171234567', 0, 'N/A', 'leigh00545@gmail.com'),
(58, 'JC', 'John Cruz', 'ALM-1790167509727', 0, 3500, '2026-09-23', 'Active', '2026-09-23 12:45:09', '120', '120', '0912762135', NULL, NULL, NULL),
(59, 'MS', 'Maria Santos', 'ALM-1790167851909', 0, 3500, '2026-09-23', 'Active', '2026-09-23 12:50:51', '120', '120', '09171234567', NULL, NULL, NULL),
(60, 'IF', 'Ivan F', 'ALM-1790168246284', 0, 3500, '2026-09-23', 'Active', '2026-09-23 12:57:26', '120', '120', '09171234567', NULL, NULL, NULL),
(61, 'MS', 'Maria Santos', 'ALM-1790168739134', 0, 3500, '2026-09-23', 'Active', '2026-09-23 13:05:39', '120', '120', '09171234567', 34, '123 San Miguel St., Mandaluyong', NULL),
(62, 'MS', 'Maria Santos', 'ALM-1790168751794', 0, 3500, '2026-09-23', 'Active', '2026-09-23 13:05:51', '120', '120', '09171234567', 34, '123 San Miguel St., Mandaluyong', NULL),
(63, 'MS', 'Mariz Santos', 'ALM-1790168957564', 0, 3500, '2026-09-23', 'Active', '2026-09-23 13:09:17', '120', '120', '09171234567', 21, '123 San Miguel St., Mandaluyong', NULL),
(64, 'MS', 'Mariz Santos', 'ALM-1790171008102', 0, 0, '2026-09-23', 'Active', '2026-09-23 13:43:28', '120', '120', '09171234567', 21, '123 San Miguel St., Mandaluyong', NULL),
(65, 'LG', 'Leigh Ahsley Gadoc', 'ALM-1790177145901', 0, 0, '2026-09-23', 'Active', '2026-09-23 15:25:45', '120', '120', '09171234567', 21, '62 A Sampaguita st. Pasay City', 'danishterante06@gmail.com'),
(66, 'LG', 'Leigh Ahsley Gadoc', 'ALM-1790177200841', 0, 3500, '2026-09-23', 'Active', '2026-09-23 15:26:40', '120', '120', '09171234567', 21, '62 A Sampaguita st. Pasay City', 'danishterante06@gmail.com'),
(67, 'SN', 'SAMPLE NAME', 'ALM-1790182989950', 0, 3500, '2026-09-24', 'Active', '2026-09-23 17:03:09', '120', '120', '09959735812', 12, '123 San Miguel St., Mandaluyong', 'danishterante06@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `forecast_monthly`
--

CREATE TABLE `forecast_monthly` (
  `id` int(11) NOT NULL,
  `month` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `revenue` double NOT NULL,
  `units` varchar(50) NOT NULL,
  `change_pct` varchar(50) NOT NULL,
  `action` varchar(255) NOT NULL,
  `confidence` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forecast_monthly`
--

INSERT INTO `forecast_monthly` (`id`, `month`, `type`, `revenue`, `units`, `change_pct`, `action`, `confidence`, `created_at`) VALUES
(1, 'October 2026', 'Revenue Forecast', 186500, '148 units', '+8.4%', 'Increase lens stock', 'High', '2026-09-01 08:00:00'),
(2, 'November 2026', 'Revenue Forecast', 201200, '159 units', '+7.9%', 'Prepare holiday bundles', 'High', '2026-09-01 08:00:00'),
(3, 'December 2026', 'Revenue Forecast', 238900, '188 units', '+18.7%', 'Increase frame orders', 'Medium', '2026-09-01 08:00:00'),
(4, 'January 2027', 'Revenue Forecast', 172400, '136 units', '-27.0%', 'Reduce seasonal orders', 'Medium', '2026-09-01 08:00:00'),
(5, 'February 2027', 'Revenue Forecast', 179800, '141 units', '+4.3%', 'Maintain current stock', 'Medium', '2026-09-01 08:00:00'),
(6, 'March 2027', 'Revenue Forecast', 194600, '153 units', '+8.2%', 'Order blue light lenses', 'High', '2026-09-01 08:00:00'),
(7, 'April 2027', 'Revenue Forecast', 207300, '163 units', '+6.5%', 'Review premium frames', 'Medium', '2026-09-01 08:00:00'),
(8, 'May 2027', 'Revenue Forecast', 215900, '170 units', '+4.1%', 'Maintain current stock', 'Medium', '2026-09-01 08:00:00'),
(9, 'June 2027', 'Revenue Forecast', 229400, '181 units', '+6.3%', 'Restock sunglasses', 'High', '2026-09-01 08:00:00'),
(10, 'July 2027', 'Revenue Forecast', 221700, '175 units', '-3.4%', 'Monitor demand', 'Low', '2026-09-01 08:00:00'),
(11, 'August 2027', 'Revenue Forecast', 244100, '192 units', '+10.1%', 'Increase lens orders', 'High', '2026-09-01 08:00:00'),
(12, 'September 2027', 'Revenue Forecast', 251800, '198 units', '+3.2%', 'Prepare anniversary sale', 'Medium', '2026-09-01 08:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_movements`
--

CREATE TABLE `inventory_movements` (
  `id` int(11) NOT NULL,
  `inventory_product_id` int(11) NOT NULL,
  `transaction_item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `movement_type` enum('PURCHASE','SALE','RESTOCK','ADJUSTMENT','RETURN','DAMAGE') NOT NULL,
  `quantity` int(11) NOT NULL,
  `quantity_before` int(11) DEFAULT NULL,
  `quantity_after` int(11) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_products`
--

CREATE TABLE `inventory_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `reorder_point` int(11) NOT NULL,
  `stock_level_pct` int(11) NOT NULL,
  `stock_color` varchar(100) DEFAULT NULL,
  `last_updated` varchar(30) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_products`
--

INSERT INTO `inventory_products` (`id`, `name`, `sku`, `category`, `in_stock`, `reorder_point`, `stock_level_pct`, `stock_color`, `last_updated`, `status`, `created_at`) VALUES
(1, 'Classic Black Acetate Frame', 'FRM-1001', 'Frames', 42, 15, 84, 'green', '2026-09-08', 'OK', '2026-01-05 09:00:00'),
(2, 'Clear Crystal Acetate Frame', 'FRM-1002', 'Frames', 28, 12, 70, 'green', '2026-09-08', 'OK', '2026-01-06 09:00:00'),
(3, 'Tortoise Round Frame', 'FRM-1003', 'Frames', 9, 12, 30, 'red', '2026-09-07', 'Low Stock', '2026-01-07 09:00:00'),
(4, 'Midnight Blue Metal Frame', 'FRM-1004', 'Frames', 18, 10, 60, 'gold', '2026-09-07', 'OK', '2026-01-08 09:00:00'),
(5, 'Rose Gold Cat-Eye Frame', 'FRM-1005', 'Frames', 6, 10, 20, 'red', '2026-09-06', 'Low Stock', '2026-01-09 09:00:00'),
(6, 'Progressive Lens 1.56', 'LNS-2001', 'Lenses', 65, 20, 81, 'green', '2026-09-08', 'OK', '2026-01-10 09:00:00'),
(7, 'Blue Light Lens 1.56', 'LNS-2002', 'Lenses', 34, 15, 68, 'green', '2026-09-08', 'OK', '2026-01-11 09:00:00'),
(8, 'Photochromic Lens 1.60', 'LNS-2003', 'Lenses', 14, 18, 35, 'red', '2026-09-07', 'Low Stock', '2026-01-12 09:00:00'),
(9, 'Single Vision Lens 1.67', 'LNS-2004', 'Lenses', 50, 18, 78, 'green', '2026-09-08', 'OK', '2026-01-13 09:00:00'),
(10, 'Polarized Sun Lens', 'LNS-2005', 'Lenses', 22, 12, 55, 'gold', '2026-09-06', 'OK', '2026-01-14 09:00:00'),
(11, 'Anti-Reflective Coating', 'ACC-3001', 'Accessories', 75, 25, 75, 'green', '2026-09-08', 'OK', '2026-01-15 09:00:00'),
(12, 'Microfiber Cleaning Cloth', 'ACC-3002', 'Accessories', 120, 40, 80, 'green', '2026-09-08', 'OK', '2026-01-16 09:00:00'),
(13, 'Lens Cleaning Spray', 'ACC-3003', 'Accessories', 19, 25, 38, 'red', '2026-09-07', 'Low Stock', '2026-01-17 09:00:00'),
(14, 'Hard Shell Eyewear Case', 'ACC-3004', 'Accessories', 46, 20, 77, 'green', '2026-09-08', 'OK', '2026-01-18 09:00:00'),
(15, 'Silicone Nose Pads', 'ACC-3005', 'Accessories', 8, 20, 16, 'red', '2026-09-06', 'Low Stock', '2026-01-19 09:00:00'),
(16, 'Kids Flexible Frame', 'KID-4001', 'Kids', 24, 10, 80, 'green', '2026-09-08', 'OK', '2026-01-20 09:00:00'),
(17, 'Sports Wrap Frame', 'SPT-5001', 'Sports', 5, 8, 25, 'red', '2026-09-07', 'Low Stock', '2026-01-21 09:00:00'),
(18, 'Reading Glasses +1.50', 'RDG-6001', 'Readers', 31, 15, 62, 'gold', '2026-09-08', 'OK', '2026-01-22 09:00:00'),
(19, 'Reading Glasses +2.00', 'RDG-6002', 'Readers', 27, 15, 54, 'gold', '2026-09-08', 'OK', '2026-01-23 09:00:00'),
(20, 'Contact Lens Solution', 'ACC-3006', 'Accessories', 58, 20, 72, 'green', '2026-09-08', 'OK', '2026-01-24 09:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_stock`
--

CREATE TABLE `inventory_stock` (
  `id` int(11) NOT NULL,
  `inventory_product_id` int(11) NOT NULL,
  `quantity_on_hand` int(11) NOT NULL DEFAULT 0,
  `reorder_point` int(11) NOT NULL DEFAULT 0,
  `stock_level_pct` int(11) NOT NULL DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'OK',
  `last_counted_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_stock`
--

INSERT INTO `inventory_stock` (`id`, `inventory_product_id`, `quantity_on_hand`, `reorder_point`, `stock_level_pct`, `status`, `last_counted_at`, `updated_at`) VALUES
(1, 1, 42, 15, 84, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(2, 2, 28, 12, 70, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(3, 3, 9, 12, 30, 'Low Stock', '2026-09-07 00:00:00', '2026-09-25 04:48:55'),
(4, 4, 18, 10, 60, 'OK', '2026-09-07 00:00:00', '2026-09-25 04:48:55'),
(5, 5, 6, 10, 20, 'Low Stock', '2026-09-06 00:00:00', '2026-09-25 04:48:55'),
(6, 6, 65, 20, 81, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(7, 7, 34, 15, 68, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(8, 8, 14, 18, 35, 'Low Stock', '2026-09-07 00:00:00', '2026-09-25 04:48:55'),
(9, 9, 50, 18, 78, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(10, 10, 22, 12, 55, 'OK', '2026-09-06 00:00:00', '2026-09-25 04:48:55'),
(11, 11, 75, 25, 75, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(12, 12, 120, 40, 80, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(13, 13, 19, 25, 38, 'Low Stock', '2026-09-07 00:00:00', '2026-09-25 04:48:55'),
(14, 14, 46, 20, 77, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(15, 15, 8, 20, 16, 'Low Stock', '2026-09-06 00:00:00', '2026-09-25 04:48:55'),
(16, 16, 24, 10, 80, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(17, 17, 5, 8, 25, 'Low Stock', '2026-09-07 00:00:00', '2026-09-25 04:48:55'),
(18, 18, 31, 15, 62, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(19, 19, 27, 15, 54, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55'),
(20, 20, 58, 20, 72, 'OK', '2026-09-08 00:00:00', '2026-09-25 04:48:55');

-- --------------------------------------------------------

--
-- Table structure for table `pending_transactions`
--

CREATE TABLE `pending_transactions` (
  `id` int(11) NOT NULL,
  `txn_id` varchar(50) NOT NULL,
  `tx_date` varchar(30) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `items` varchar(500) NOT NULL,
  `amount` double NOT NULL,
  `payment` varchar(50) NOT NULL,
  `rx_by` varchar(255) DEFAULT NULL,
  `item_status` varchar(50) DEFAULT NULL,
  `remaining_balance` double DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `tx_time` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `item_type` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pending_transactions`
--

INSERT INTO `pending_transactions` (`id`, `txn_id`, `tx_date`, `customer_name`, `items`, `amount`, `payment`, `rx_by`, `item_status`, `remaining_balance`, `status`, `tx_time`, `created_at`, `item_type`, `customer_id`) VALUES
(56, 'TXN-NEW-001', '2026-09-25', 'Customer Name', 'Product Name', 3500, 'Cash', 'Dr Almeda', 'Processing', 0, 'Paid', '10:00:00', '2026-09-25 08:58:48', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `top_demand`
--

CREATE TABLE `top_demand` (
  `id` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `units` varchar(50) NOT NULL,
  `restock` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `top_demand`
--

INSERT INTO `top_demand` (`id`, `product`, `units`, `restock`, `created_at`) VALUES
(1, 'Progressive Lens 1.56', '38 sold', 'Order 20', '2026-09-08 08:00:00'),
(2, 'Classic Black Acetate Frame', '31 sold', 'Order 15', '2026-09-08 08:00:00'),
(3, 'Blue Light Lens 1.56', '27 sold', 'Order 15', '2026-09-08 08:00:00'),
(4, 'Single Vision Lens 1.67', '24 sold', 'Order 18', '2026-09-08 08:00:00'),
(5, 'Clear Crystal Acetate Frame', '22 sold', 'Order 12', '2026-09-08 08:00:00'),
(6, 'Anti-Reflective Coating', '20 sold', 'Order 25', '2026-09-08 08:00:00'),
(7, 'Photochromic Lens 1.60', '18 sold', 'Order 18', '2026-09-08 08:00:00'),
(8, 'Reading Glasses +1.50', '16 sold', 'Order 15', '2026-09-08 08:00:00'),
(9, 'Rose Gold Cat-Eye Frame', '14 sold', 'Order 10', '2026-09-08 08:00:00'),
(10, 'Polarized Sun Lens', '12 sold', 'Order 12', '2026-09-08 08:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `txn_id` varchar(50) NOT NULL,
  `tx_date` varchar(30) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `items` varchar(500) NOT NULL,
  `amount` double NOT NULL,
  `payment` varchar(50) NOT NULL,
  `rx_by` varchar(255) DEFAULT NULL,
  `item_status` varchar(50) DEFAULT NULL,
  `remaining_balance` double DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `tx_time` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `item_type` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `txn_id`, `tx_date`, `customer_name`, `items`, `amount`, `payment`, `rx_by`, `item_status`, `remaining_balance`, `status`, `tx_time`, `created_at`, `item_type`, `customer_id`) VALUES
(3, 'TXN-260903', '2026-09-01', 'Carla Mendoza', 'Rose Gold Cat-Eye Frame, Photochromic Lens 1.60', 6200, 'Card', 'N/A', NULL, NULL, 'Paid', '11:44:00', '2026-09-01 11:44:00', NULL, 3),
(4, 'TXN-260904', '2026-09-01', 'Daniel Lee', 'Reading Glasses +1.50', 650, 'Cash', 'N/A', 'Completed', NULL, 'Paid', '13:20:00', '2026-09-01 13:20:00', NULL, 4),
(5, 'TXN-260905', '2026-09-02', 'Elena Rivera', 'Tortoise Round Frame, Single Vision Lens 1.67', 5350, 'GCash', 'N/A', NULL, NULL, 'Paid', '09:18:00', '2026-09-02 09:18:00', NULL, 5),
(6, 'TXN-260906', '2026-09-02', 'Felix Perez', 'Microfiber Cleaning Cloth, Lens Cleaning Spray', 480, 'Cash', 'N/A', NULL, NULL, 'Paid', '10:27:00', '2026-09-02 10:27:00', NULL, 6),
(7, 'TXN-260907', '2026-09-02', 'Grace Hernandez', 'Midnight Blue Metal Frame, Anti-Reflective Coating', 4100, 'Card', 'N/A', NULL, NULL, 'Paid', '12:06:00', '2026-09-02 12:06:00', NULL, 7),
(8, 'TXN-260908', '2026-09-02', 'Hannah Williams', 'Kids Flexible Frame', 2200, 'Cash', 'N/A', NULL, NULL, 'Paid', '14:15:00', '2026-09-02 14:15:00', NULL, 8),
(9, 'TXN-260909', '2026-09-03', 'Ian Smith', 'Classic Black Acetate Frame, Blue Light Lens 1.56', 3950, 'GCash', 'N/A', NULL, NULL, 'Paid', '09:40:00', '2026-09-03 09:40:00', NULL, 9),
(10, 'TXN-260910', '2026-09-03', 'Julia Cruz', 'Progressive Lens 1.56, Anti-Reflective Coating', 3650, 'Card', 'N/A', NULL, NULL, 'Paid', '11:11:00', '2026-09-03 11:11:00', NULL, 10),
(11, 'TXN-260911', '2026-09-03', 'Kevin Morgan', 'Clear Crystal Acetate Frame, Single Vision Lens 1.67', 4750, 'GCash', 'N/A', 'Completed', NULL, 'Paid', '13:35:00', '2026-09-03 13:35:00', NULL, 11),
(12, 'TXN-260912', '2026-09-03', 'Lara Navarro', 'Hard Shell Eyewear Case', 550, 'Cash', 'N/A', NULL, NULL, 'Paid', '15:22:00', '2026-09-03 15:22:00', NULL, 12),
(13, 'TXN-260913', '2026-09-04', 'Marcus Brown', 'Reading Glasses +2.00', 650, 'Cash', 'N/A', NULL, NULL, 'Paid', '09:07:00', '2026-09-04 09:07:00', NULL, 13),
(14, 'TXN-260914', '2026-09-04', 'Nina Scott', 'Rose Gold Cat-Eye Frame, Progressive Lens 1.56', 5850, 'Card', 'N/A', NULL, NULL, 'Paid', '10:48:00', '2026-09-04 10:48:00', NULL, 14),
(15, 'TXN-260915', '2026-09-04', 'Oscar Torres', 'Polarized Sun Lens', 2400, 'GCash', 'N/A', NULL, NULL, 'Paid', '12:29:00', '2026-09-04 12:29:00', NULL, 15),
(16, 'TXN-260916', '2026-09-04', 'Paula Kim', 'Clear Crystal Acetate Frame, Photochromic Lens 1.60', 6100, 'Card', 'N/A', NULL, NULL, 'Paid', '14:02:00', '2026-09-04 14:02:00', NULL, 16),
(17, 'TXN-260917', '2026-09-05', 'Rafael Aquino', 'Sports Wrap Frame, Polarized Sun Lens', 3300, 'Cash', 'N/A', 'Completed', NULL, 'Paid', '09:55:00', '2026-09-05 09:55:00', NULL, 18),
(18, 'TXN-260918', '2026-09-05', 'Sophia Wong', 'Lens Cleaning Spray, Microfiber Cleaning Cloth', 500, 'GCash', 'N/A', NULL, NULL, 'Paid', '11:26:00', '2026-09-05 11:26:00', NULL, 19),
(19, 'TXN-260919', '2026-09-05', 'Thomas Diaz', 'Midnight Blue Metal Frame, Progressive Lens 1.56', 4950, 'Card', 'N/A', NULL, NULL, 'Paid', '13:17:00', '2026-09-05 13:17:00', NULL, 20),
(20, 'TXN-260920', '2026-09-05', 'Uma Alvarez', 'Reading Glasses +1.50, Hard Shell Eyewear Case', 1200, 'Cash', 'N/A', NULL, NULL, 'Paid', '16:08:00', '2026-09-05 16:08:00', NULL, 21),
(21, 'TXN-260921', '2026-09-06', 'Victor Bennett', 'Classic Black Acetate Frame, Single Vision Lens 1.67', 5050, 'Card', 'N/A', NULL, NULL, 'Paid', '09:21:00', '2026-09-06 09:21:00', NULL, 22),
(22, 'TXN-260922', '2026-09-06', 'Wendy Cooper', 'Blue Light Lens 1.56, Anti-Reflective Coating', 2800, 'GCash', 'N/A', 'Completed', NULL, 'Paid', '10:39:00', '2026-09-06 10:39:00', NULL, 23),
(23, 'TXN-260923', '2026-09-06', 'Xavier Young', 'Kids Flexible Frame', 2200, 'Cash', 'N/A', NULL, NULL, 'Paid', '12:12:00', '2026-09-06 12:12:00', NULL, 24),
(24, 'TXN-260924', '2026-09-06', 'Yasmin Zahra', 'Tortoise Round Frame, Progressive Lens 1.56', 5050, 'Card', 'N/A', NULL, NULL, 'Paid', '14:44:00', '2026-09-06 14:44:00', NULL, 25),
(25, 'TXN-260925', '2026-09-06', 'Aaron Delgado', 'Contact Lens Solution, Silicone Nose Pads', 650, 'Cash', 'N/A', NULL, NULL, 'Paid', '16:25:00', '2026-09-06 16:25:00', NULL, 26),
(26, 'TXN-260926', '2026-09-07', 'Bianca King', 'Rose Gold Cat-Eye Frame, Single Vision Lens 1.67', 5400, 'GCash', 'N/A', NULL, NULL, 'Paid', '09:08:00', '2026-09-07 09:08:00', NULL, 27),
(27, 'TXN-260927', '2026-09-07', 'Caleb Nguyen', 'Reading Glasses +2.00, Microfiber Cleaning Cloth', 800, 'Cash', 'N/A', NULL, NULL, 'Paid', '10:16:00', '2026-09-07 10:16:00', NULL, 28),
(28, 'TXN-260928', '2026-09-07', 'Diana Silva', 'Clear Crystal Acetate Frame, Blue Light Lens 1.56', 4050, 'Card', 'N/A', NULL, NULL, 'Paid', '11:53:00', '2026-09-07 11:53:00', NULL, 29),
(29, 'TXN-260929', '2026-09-07', 'Ethan Garcia', 'Photochromic Lens 1.60, Anti-Reflective Coating', 3200, 'GCash', 'N/A', NULL, NULL, 'Paid', '13:31:00', '2026-09-07 13:31:00', NULL, 30),
(30, 'TXN-260930', '2026-09-07', 'Fiona Hall', 'Classic Black Acetate Frame, Progressive Lens 1.56', 4850, 'Card', 'N/A', NULL, NULL, 'Paid', '15:47:00', '2026-09-07 15:47:00', NULL, 31),
(31, 'TXN-260931', '2026-09-08', 'George Miller', 'Lens Cleaning Spray, Hard Shell Eyewear Case', 950, 'Cash', 'N/A', NULL, NULL, 'Paid', '09:34:00', '2026-09-08 09:34:00', NULL, 32),
(32, 'TXN-260932', '2026-09-08', 'Hazel Stone', 'Midnight Blue Metal Frame, Single Vision Lens 1.67', 5000, 'GCash', 'N/A', NULL, NULL, 'Paid', '10:58:00', '2026-09-08 10:58:00', NULL, 33),
(33, 'TXN-260933', '2026-09-08', 'Iris Ramos', 'Polarized Sun Lens, Sports Wrap Frame', 3300, 'Card', 'N/A', NULL, NULL, 'Paid', '12:40:00', '2026-09-08 12:40:00', NULL, 34),
(34, 'TXN-260934', '2026-09-08', 'Jacob Brooks', 'Reading Glasses +1.50', 650, 'Cash', 'N/A', NULL, NULL, 'Paid', '14:19:00', '2026-09-08 14:19:00', NULL, 35),
(35, 'TXN-260935', '2026-09-08', 'Kara Castillo', 'Tortoise Round Frame, Photochromic Lens 1.60', 6200, 'Card', 'N/A', NULL, NULL, 'Paid', '16:01:00', '2026-09-08 16:01:00', NULL, 36),
(36, 'TXN-260936', '2026-09-09', 'Leo Martin', 'Blue Light Lens 1.56, Contact Lens Solution', 2200, 'GCash', 'N/A', NULL, NULL, 'Paid', '09:42:00', '2026-09-09 09:42:00', NULL, 37),
(37, 'TXN-260937', '2026-09-09', 'Maya Robinson', 'Rose Gold Cat-Eye Frame, Progressive Lens 1.56', 5850, 'Card', 'N/A', NULL, NULL, 'Paid', '11:24:00', '2026-09-09 11:24:00', NULL, 38),
(38, 'TXN-260938', '2026-09-09', 'Noah Tan', 'Kids Flexible Frame, Hard Shell Eyewear Case', 2750, 'Cash', 'N/A', NULL, NULL, 'Paid', '13:12:00', '2026-09-09 13:12:00', NULL, 39),
(39, 'TXN-260939', '2026-09-09', 'Olivia White', 'Clear Crystal Acetate Frame, Anti-Reflective Coating', 3350, 'GCash', 'N/A', NULL, NULL, 'Paid', '14:56:00', '2026-09-09 14:56:00', NULL, 40),
(40, 'TXN-260940', '2026-09-09', 'Peter Collins', 'Classic Black Acetate Frame, Photochromic Lens 1.60', 6200, 'Card', 'N/A', NULL, NULL, 'Paid', '16:33:00', '2026-09-09 16:33:00', NULL, 41),
(42, 'TXN-20260913230602181', '2026-09-13', 'Leigh Gadoc', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', 'N/A', NULL, NULL, 'Paid', '23:06:02', '2026-09-13 15:06:02', NULL, 54),
(43, 'TXN-20260923204509766', '2026-09-23', 'John Cruz', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', NULL, NULL, NULL, 'Paid', '20:45:09', '2026-09-23 12:45:09', NULL, 58),
(44, 'TXN-20260923205051930', '2026-09-23', 'Maria Santos', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', NULL, NULL, NULL, 'Paid', '20:50:51', '2026-09-23 12:50:51', NULL, 52),
(45, 'TXN-20260923205726312', '2026-09-23', 'Ivan F', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', NULL, NULL, NULL, 'Paid', '20:57:26', '2026-09-23 12:57:26', NULL, 60),
(46, 'TXN-20260923210139753', '2026-09-23', 'API Test', 'Test Frame', 1, 'Cash', NULL, NULL, NULL, 'Paid', '21:01:39', '2026-09-23 13:01:39', NULL, NULL),
(47, 'TXN-20260923210209311', '2026-09-23', 'API Test 2', 'Test Frame', 1, 'Cash', NULL, NULL, NULL, 'Paid', '21:02:09', '2026-09-23 13:02:09', NULL, NULL),
(48, 'TXN-20260923210300300', '2026-09-23', 'API Test 4', 'Test Frame', 1, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '21:03', '2026-09-23 13:03:00', NULL, NULL),
(49, 'TXN-20260923210539171', '2026-09-23', 'Maria Santos', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '21:05:39', '2026-09-23 13:05:39', NULL, 52),
(50, 'TXN-20260923210551823', '2026-09-23', 'Maria Santos', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '21:05:51', '2026-09-23 13:05:51', NULL, 52),
(51, 'TXN-20260923210917581', '2026-09-23', 'Mariz Santos', 'Eyeglasses Frame â€” Ray-Ban RB5154', 3500, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '21:09:17', '2026-09-23 13:09:17', NULL, 63),
(52, 'TXN-20260923214328143', '2026-09-23', 'Mariz Santos', '', 0, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '21:43:28', '2026-09-23 13:43:28', NULL, 63),
(53, 'TXN-20260923232545932', '2026-09-23', 'Leigh Ahsley Gadoc', '', 0, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '23:25:45', '2026-09-23 15:25:45', NULL, 65),
(54, 'TXN-20260923232640879', '2026-09-23', 'Leigh Ahsley Gadoc', '', 3500, 'Cash', 'Dr Almeda', NULL, NULL, 'Paid', '23:26:40', '2026-09-23 15:26:40', NULL, 65),
(55, 'TXN-20260924010309993', '2026-09-24', 'SAMPLE NAME', 'Clear Crystal Acetate Frame', 3500, 'Cash', 'Dr Almeda', 'Completed', NULL, 'Paid', '01:03:09', '2026-09-23 17:03:09', NULL, 67);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `id` int(11) NOT NULL,
  `txn_id` varchar(50) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` double NOT NULL,
  `line_total` double NOT NULL,
  `created_at` datetime NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `pending_transaction_id` int(11) DEFAULT NULL,
  `inventory_product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`id`, `txn_id`, `item_name`, `quantity`, `unit_price`, `line_total`, `created_at`, `transaction_id`, `pending_transaction_id`, `inventory_product_id`) VALUES
(1, 'TXN-260901', 'Classic Black Acetate Frame', 1, 3492, 3492, '2026-09-01 09:12:00', NULL, NULL, 1),
(2, 'TXN-260902', 'Blue Light Lens 1.56', 1, 1332, 1332, '2026-09-01 10:05:00', NULL, NULL, 7),
(3, 'TXN-260903', 'Rose Gold Cat-Eye Frame', 1, 4464, 4464, '2026-09-01 11:44:00', 3, NULL, 5),
(4, 'TXN-260904', 'Reading Glasses +1.50', 1, 468, 468, '2026-09-01 13:20:00', 4, NULL, 18),
(5, 'TXN-260905', 'Tortoise Round Frame', 1, 3852, 3852, '2026-09-02 09:18:00', 5, NULL, 3),
(6, 'TXN-260906', 'Microfiber Cleaning Cloth', 1, 345.6, 345.6, '2026-09-02 10:27:00', 6, NULL, 12),
(7, 'TXN-260907', 'Midnight Blue Metal Frame', 1, 2952, 2952, '2026-09-02 12:06:00', 7, NULL, 4),
(8, 'TXN-260908', 'Kids Flexible Frame', 1, 1584, 1584, '2026-09-02 14:15:00', 8, NULL, 16),
(9, 'TXN-260909', 'Classic Black Acetate Frame', 1, 2844, 2844, '2026-09-03 09:40:00', 9, NULL, 1),
(10, 'TXN-260910', 'Progressive Lens 1.56', 1, 2628, 2628, '2026-09-03 11:11:00', 10, NULL, 6),
(11, 'TXN-260911', 'Clear Crystal Acetate Frame', 1, 3420, 3420, '2026-09-03 13:35:00', 11, NULL, 2),
(12, 'TXN-260912', 'Hard Shell Eyewear Case', 1, 396, 396, '2026-09-03 15:22:00', 12, NULL, 14),
(13, 'TXN-260913', 'Reading Glasses +2.00', 1, 468, 468, '2026-09-04 09:07:00', 13, NULL, 19),
(14, 'TXN-260914', 'Rose Gold Cat-Eye Frame', 1, 4212, 4212, '2026-09-04 10:48:00', 14, NULL, 5),
(15, 'TXN-260915', 'Polarized Sun Lens', 1, 1728, 1728, '2026-09-04 12:29:00', 15, NULL, 10),
(16, 'TXN-260916', 'Clear Crystal Acetate Frame', 1, 4392, 4392, '2026-09-04 14:02:00', 16, NULL, 2),
(17, 'TXN-260917', 'Sports Wrap Frame', 1, 2376, 2376, '2026-09-05 09:55:00', 17, NULL, 17),
(18, 'TXN-260918', 'Lens Cleaning Spray', 1, 360, 360, '2026-09-05 11:26:00', 18, NULL, 13),
(19, 'TXN-260919', 'Midnight Blue Metal Frame', 1, 3564, 3564, '2026-09-05 13:17:00', 19, NULL, 4),
(20, 'TXN-260920', 'Reading Glasses +1.50', 1, 864, 864, '2026-09-05 16:08:00', 20, NULL, 18),
(21, 'TXN-260921', 'Classic Black Acetate Frame', 1, 3636, 3636, '2026-09-06 09:21:00', 21, NULL, 1),
(22, 'TXN-260922', 'Blue Light Lens 1.56', 1, 2016, 2016, '2026-09-06 10:39:00', 22, NULL, 7),
(23, 'TXN-260923', 'Kids Flexible Frame', 1, 1584, 1584, '2026-09-06 12:12:00', 23, NULL, 16),
(24, 'TXN-260924', 'Tortoise Round Frame', 1, 3636, 3636, '2026-09-06 14:44:00', 24, NULL, 3),
(25, 'TXN-260925', 'Contact Lens Solution', 1, 468, 468, '2026-09-06 16:25:00', 25, NULL, 20),
(26, 'TXN-260926', 'Rose Gold Cat-Eye Frame', 1, 3888, 3888, '2026-09-07 09:08:00', 26, NULL, 5),
(27, 'TXN-260927', 'Reading Glasses +2.00', 1, 576, 576, '2026-09-07 10:16:00', 27, NULL, 19),
(28, 'TXN-260928', 'Clear Crystal Acetate Frame', 1, 2916, 2916, '2026-09-07 11:53:00', 28, NULL, 2),
(29, 'TXN-260929', 'Photochromic Lens 1.60', 1, 2304, 2304, '2026-09-07 13:31:00', 29, NULL, 8),
(30, 'TXN-260930', 'Classic Black Acetate Frame', 1, 3492, 3492, '2026-09-07 15:47:00', 30, NULL, 1),
(31, 'TXN-260931', 'Lens Cleaning Spray', 1, 684, 684, '2026-09-08 09:34:00', 31, NULL, 13),
(32, 'TXN-260932', 'Midnight Blue Metal Frame', 1, 3600, 3600, '2026-09-08 10:58:00', 32, NULL, 4),
(33, 'TXN-260933', 'Polarized Sun Lens', 1, 2376, 2376, '2026-09-08 12:40:00', 33, NULL, 10),
(34, 'TXN-260934', 'Reading Glasses +1.50', 1, 468, 468, '2026-09-08 14:19:00', 34, NULL, 18),
(35, 'TXN-260935', 'Tortoise Round Frame', 1, 4464, 4464, '2026-09-08 16:01:00', 35, NULL, 3),
(36, 'TXN-260936', 'Blue Light Lens 1.56', 1, 1584, 1584, '2026-09-09 09:42:00', 36, NULL, 7),
(37, 'TXN-260937', 'Rose Gold Cat-Eye Frame', 1, 4212, 4212, '2026-09-09 11:24:00', 37, NULL, 5),
(38, 'TXN-260938', 'Kids Flexible Frame', 1, 1980, 1980, '2026-09-09 13:12:00', 38, NULL, 16),
(39, 'TXN-260939', 'Clear Crystal Acetate Frame', 1, 2412, 2412, '2026-09-09 14:56:00', 39, NULL, 2),
(40, 'TXN-260940', 'Classic Black Acetate Frame', 1, 4464, 4464, '2026-09-09 16:33:00', 40, NULL, 1),
(64, 'TXN-260901', 'Progressive Lens 1.56', 1, 1358, 1358, '2026-09-01 09:12:00', NULL, NULL, 6),
(65, 'TXN-260902', 'Blue Light Lens 1.56', 1, 518, 518, '2026-09-01 10:05:00', NULL, NULL, 7),
(66, 'TXN-260903', 'Photochromic Lens 1.60', 1, 1736, 1736, '2026-09-01 11:44:00', 3, NULL, 8),
(67, 'TXN-260904', 'Reading Glasses +1.50', 1, 182, 182, '2026-09-01 13:20:00', 4, NULL, 18),
(68, 'TXN-260905', 'Single Vision Lens 1.67', 1, 1498, 1498, '2026-09-02 09:18:00', 5, NULL, 9),
(69, 'TXN-260906', 'Lens Cleaning Spray', 1, 134.4, 134.4, '2026-09-02 10:27:00', 6, NULL, 13),
(70, 'TXN-260907', 'Anti-Reflective Coating', 1, 1148, 1148, '2026-09-02 12:06:00', 7, NULL, 11),
(71, 'TXN-260908', 'Kids Flexible Frame', 1, 616, 616, '2026-09-02 14:15:00', 8, NULL, 16),
(72, 'TXN-260909', 'Blue Light Lens 1.56', 1, 1106, 1106, '2026-09-03 09:40:00', 9, NULL, 7),
(73, 'TXN-260910', 'Anti-Reflective Coating', 1, 1022, 1022, '2026-09-03 11:11:00', 10, NULL, 11),
(74, 'TXN-260911', 'Single Vision Lens 1.67', 1, 1330, 1330, '2026-09-03 13:35:00', 11, NULL, 9),
(75, 'TXN-260912', 'Hard Shell Eyewear Case', 1, 154, 154, '2026-09-03 15:22:00', 12, NULL, 14),
(76, 'TXN-260913', 'Reading Glasses +2.00', 1, 182, 182, '2026-09-04 09:07:00', 13, NULL, 19),
(77, 'TXN-260914', 'Progressive Lens 1.56', 1, 1638, 1638, '2026-09-04 10:48:00', 14, NULL, 6),
(78, 'TXN-260915', 'Polarized Sun Lens', 1, 672, 672, '2026-09-04 12:29:00', 15, NULL, 10),
(79, 'TXN-260916', 'Photochromic Lens 1.60', 1, 1708, 1708, '2026-09-04 14:02:00', 16, NULL, 8),
(80, 'TXN-260917', 'Polarized Sun Lens', 1, 924, 924, '2026-09-05 09:55:00', 17, NULL, 10),
(81, 'TXN-260918', 'Microfiber Cleaning Cloth', 1, 140, 140, '2026-09-05 11:26:00', 18, NULL, 12),
(82, 'TXN-260919', 'Progressive Lens 1.56', 1, 1386, 1386, '2026-09-05 13:17:00', 19, NULL, 6),
(83, 'TXN-260920', 'Hard Shell Eyewear Case', 1, 336, 336, '2026-09-05 16:08:00', 20, NULL, 14),
(84, 'TXN-260921', 'Single Vision Lens 1.67', 1, 1414, 1414, '2026-09-06 09:21:00', 21, NULL, 9),
(85, 'TXN-260922', 'Anti-Reflective Coating', 1, 784, 784, '2026-09-06 10:39:00', 22, NULL, 11),
(86, 'TXN-260923', 'Kids Flexible Frame', 1, 616, 616, '2026-09-06 12:12:00', 23, NULL, 16),
(87, 'TXN-260924', 'Progressive Lens 1.56', 1, 1414, 1414, '2026-09-06 14:44:00', 24, NULL, 6),
(88, 'TXN-260925', 'Silicone Nose Pads', 1, 182, 182, '2026-09-06 16:25:00', 25, NULL, 15),
(89, 'TXN-260926', 'Single Vision Lens 1.67', 1, 1512, 1512, '2026-09-07 09:08:00', 26, NULL, 9),
(90, 'TXN-260927', 'Microfiber Cleaning Cloth', 1, 224, 224, '2026-09-07 10:16:00', 27, NULL, 12),
(91, 'TXN-260928', 'Blue Light Lens 1.56', 1, 1134, 1134, '2026-09-07 11:53:00', 28, NULL, 7),
(92, 'TXN-260929', 'Anti-Reflective Coating', 1, 896, 896, '2026-09-07 13:31:00', 29, NULL, 11),
(93, 'TXN-260930', 'Progressive Lens 1.56', 1, 1358, 1358, '2026-09-07 15:47:00', 30, NULL, 6),
(94, 'TXN-260931', 'Hard Shell Eyewear Case', 1, 266, 266, '2026-09-08 09:34:00', 31, NULL, 14),
(95, 'TXN-260932', 'Single Vision Lens 1.67', 1, 1400, 1400, '2026-09-08 10:58:00', 32, NULL, 9),
(96, 'TXN-260933', 'Sports Wrap Frame', 1, 924, 924, '2026-09-08 12:40:00', 33, NULL, 17),
(97, 'TXN-260934', 'Reading Glasses +1.50', 1, 182, 182, '2026-09-08 14:19:00', 34, NULL, 18),
(98, 'TXN-260935', 'Photochromic Lens 1.60', 1, 1736, 1736, '2026-09-08 16:01:00', 35, NULL, 8),
(99, 'TXN-260936', 'Contact Lens Solution', 1, 616, 616, '2026-09-09 09:42:00', 36, NULL, 20),
(100, 'TXN-260937', 'Progressive Lens 1.56', 1, 1638, 1638, '2026-09-09 11:24:00', 37, NULL, 6),
(101, 'TXN-260938', 'Hard Shell Eyewear Case', 1, 770, 770, '2026-09-09 13:12:00', 38, NULL, 14),
(102, 'TXN-260939', 'Anti-Reflective Coating', 1, 938, 938, '2026-09-09 14:56:00', 39, NULL, 11),
(103, 'TXN-260940', 'Photochromic Lens 1.60', 1, 1736, 1736, '2026-09-09 16:33:00', 40, NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `role`) VALUES
(1, 'Admin', 'admin', 'Admin', 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity_log`
--

CREATE TABLE `user_activity_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_description` varchar(500) NOT NULL,
  `activity_type` varchar(100) NOT NULL,
  `event_timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_activity_log`
--

INSERT INTO `user_activity_log` (`id`, `user_id`, `activity_description`, `activity_type`, `event_timestamp`) VALUES
(1, 1, 'Initial administrator account created', 'SYSTEM', '2026-09-01 08:00:00'),
(2, 1, 'Demo database restored', 'SYSTEM', '2026-09-01 08:01:00'),
(3, 1, 'Viewed dashboard data', 'VIEW', '2026-09-09 08:30:00'),
(4, 1, 'Logged in', 'SYSTEM', '2026-09-12 15:09:40'),
(5, 1, 'Logged in', 'SYSTEM', '2026-09-13 13:45:07'),
(6, 2, 'Account created by admin #1', 'SYSTEM', '2026-09-13 13:45:33'),
(7, 2, 'Logged in', 'SYSTEM', '2026-09-13 13:46:54'),
(8, 1, 'Logged in', 'SYSTEM', '2026-09-13 13:53:28'),
(9, 1, 'Deleted user account #2', 'SYSTEM', '2026-09-13 13:53:48'),
(10, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:22:33'),
(11, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:27:52'),
(12, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:34:49'),
(13, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:39:40'),
(14, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:46:26'),
(15, 1, 'Logged in', 'SYSTEM', '2026-09-13 14:58:59'),
(16, 1, 'Logged in', 'SYSTEM', '2026-09-16 04:36:33'),
(17, 1, 'Logged in', 'SYSTEM', '2026-09-23 12:15:57'),
(18, 1, 'Logged in', 'SYSTEM', '2026-09-23 12:44:32'),
(19, 1, 'Logged in', 'SYSTEM', '2026-09-23 13:08:04'),
(20, 1, 'Logged in', 'SYSTEM', '2026-09-23 13:15:51'),
(21, 1, 'Logged in', 'SYSTEM', '2026-09-23 13:16:51'),
(22, 1, 'Logged in', 'SYSTEM', '2026-09-23 13:42:06'),
(23, 1, 'Logged in', 'SYSTEM', '2026-09-23 15:25:12'),
(24, 1, 'Logged in', 'SYSTEM', '2026-09-23 15:52:28'),
(25, 1, 'Logged in', 'SYSTEM', '2026-09-23 16:03:06'),
(26, 1, 'Logged in', 'SYSTEM', '2026-09-23 16:55:44'),
(27, 1, 'Logged in', 'SYSTEM', '2026-09-23 17:25:39'),
(28, 1, 'Logged in', 'SYSTEM', '2026-09-25 00:44:12'),
(29, 1, 'Logged in', 'SYSTEM', '2026-09-25 00:50:03'),
(30, 1, 'Logged in', 'SYSTEM', '2026-09-25 01:08:57'),
(31, 1, 'Logged in', 'SYSTEM', '2026-09-25 01:16:38'),
(32, 1, 'Logged in', 'SYSTEM', '2026-09-25 01:39:20'),
(33, 1, 'Logged in', 'SYSTEM', '2026-09-25 01:47:54'),
(34, 1, 'Logged in', 'SYSTEM', '2026-09-25 02:30:08'),
(35, 1, 'Logged in', 'SYSTEM', '2026-09-25 02:33:18'),
(36, 1, 'Logged in', 'SYSTEM', '2026-09-25 02:36:43'),
(37, 1, 'Logged in', 'SYSTEM', '2026-09-25 02:55:13'),
(38, 1, 'Logged in', 'SYSTEM', '2026-09-25 03:45:43'),
(39, 1, 'Logged in', 'SYSTEM', '2026-09-25 03:49:44'),
(40, 1, 'Logged in', 'SYSTEM', '2026-09-25 04:11:24'),
(41, 1, 'Logged in', 'SYSTEM', '2026-09-25 04:55:06'),
(42, 1, 'Logged in', 'SYSTEM', '2026-09-25 04:59:11');

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_inventory_status`
-- (See below for the actual view)
--
CREATE TABLE `v_inventory_status` (
`inventory_product_id` int(11)
,`sku` varchar(100)
,`name` varchar(255)
,`category` varchar(100)
,`quantity_on_hand` int(11)
,`reorder_point` int(11)
,`stock_level_pct` int(11)
,`status` varchar(50)
,`last_counted_at` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_transaction_items`
-- (See below for the actual view)
--
CREATE TABLE `v_transaction_items` (
`transaction_item_id` int(11)
,`txn_id` varchar(50)
,`item_name` varchar(255)
,`quantity` int(11)
,`unit_price` double
,`line_total` double
,`sku` varchar(100)
,`category` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_unlinked_transaction_items`
-- (See below for the actual view)
--
CREATE TABLE `v_unlinked_transaction_items` (
`id` int(11)
,`txn_id` varchar(50)
,`item_name` varchar(255)
,`quantity` int(11)
,`unit_price` double
,`line_total` double
,`created_at` datetime
,`transaction_id` int(11)
,`pending_transaction_id` int(11)
,`inventory_product_id` int(11)
);

-- --------------------------------------------------------

--
-- Structure for view `v_inventory_status`
--
DROP TABLE IF EXISTS `v_inventory_status`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_inventory_status`  AS SELECT `ip`.`id` AS `inventory_product_id`, `ip`.`sku` AS `sku`, `ip`.`name` AS `name`, `ip`.`category` AS `category`, `s`.`quantity_on_hand` AS `quantity_on_hand`, `s`.`reorder_point` AS `reorder_point`, `s`.`stock_level_pct` AS `stock_level_pct`, `s`.`status` AS `status`, `s`.`last_counted_at` AS `last_counted_at` FROM (`inventory_products` `ip` join `inventory_stock` `s` on(`s`.`inventory_product_id` = `ip`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `v_transaction_items`
--
DROP TABLE IF EXISTS `v_transaction_items`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_transaction_items`  AS SELECT `ti`.`id` AS `transaction_item_id`, coalesce(`t`.`txn_id`,`p`.`txn_id`) AS `txn_id`, `ti`.`item_name` AS `item_name`, `ti`.`quantity` AS `quantity`, `ti`.`unit_price` AS `unit_price`, `ti`.`line_total` AS `line_total`, `ip`.`sku` AS `sku`, `ip`.`category` AS `category` FROM (((`transaction_items` `ti` left join `transactions` `t` on(`t`.`id` = `ti`.`transaction_id`)) left join `pending_transactions` `p` on(`p`.`id` = `ti`.`pending_transaction_id`)) left join `inventory_products` `ip` on(`ip`.`id` = `ti`.`inventory_product_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `v_unlinked_transaction_items`
--
DROP TABLE IF EXISTS `v_unlinked_transaction_items`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_unlinked_transaction_items`  AS SELECT `ti`.`id` AS `id`, `ti`.`txn_id` AS `txn_id`, `ti`.`item_name` AS `item_name`, `ti`.`quantity` AS `quantity`, `ti`.`unit_price` AS `unit_price`, `ti`.`line_total` AS `line_total`, `ti`.`created_at` AS `created_at`, `ti`.`transaction_id` AS `transaction_id`, `ti`.`pending_transaction_id` AS `pending_transaction_id`, `ti`.`inventory_product_id` AS `inventory_product_id` FROM `transaction_items` AS `ti` WHERE `ti`.`transaction_id` is null AND `ti`.`pending_transaction_id` is null ;

--
-- -----------------------------------------------------------------
-- Complete item-type seed data
-- Existing historical rows did not have item_type values. These
-- classifications are deterministic pseudo-data based on item names,
-- so the application filters have usable values immediately after import.
-- -----------------------------------------------------------------
UPDATE `transactions`
SET `item_type` = CASE
  WHEN LOWER(`items`) REGEXP 'cleaning|spray|case|cloth|coating|nose pads|contact lens solution|ear hook|chain' THEN 'ACCESSORIES'
  WHEN LOWER(`items`) REGEXP 'polarized sun|sports wrap|sunglass|sun lens' THEN 'SUNGLASSES'
  WHEN LOWER(`items`) REGEXP 'lens|reading glasses|progressive|photochromic|single vision|blue light' THEN 'PRESCRIPTION'
  WHEN LOWER(`items`) REGEXP 'frame|test frame' THEN 'ONLY FRAME'
  ELSE 'ACCESSORIES'
END
WHERE `item_type` IS NULL OR TRIM(`item_type`) = '';

-- Keep the existing pending sample visible when Prescription is selected.
UPDATE `pending_transactions`
SET `item_type` = 'PRESCRIPTION'
WHERE `txn_id` = 'TXN-NEW-001';

-- Any other pending rows receive the same safe classification rule.
UPDATE `pending_transactions`
SET `item_type` = CASE
  WHEN LOWER(`items`) REGEXP 'cleaning|spray|case|cloth|coating|nose pads|contact lens solution|ear hook|chain' THEN 'ACCESSORIES'
  WHEN LOWER(`items`) REGEXP 'polarized sun|sports wrap|sunglass|sun lens' THEN 'SUNGLASSES'
  WHEN LOWER(`items`) REGEXP 'lens|reading glasses|progressive|photochromic|single vision|blue light' THEN 'PRESCRIPTION'
  WHEN LOWER(`items`) REGEXP 'frame|test frame' THEN 'ONLY FRAME'
  ELSE 'ACCESSORIES'
END
WHERE `item_type` IS NULL OR TRIM(`item_type`) = '';
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_customers_card_no` (`card_no`);

--
-- Indexes for table `forecast_monthly`
--
ALTER TABLE `forecast_monthly`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_movements`
--
ALTER TABLE `inventory_movements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inventory_movements_product` (`inventory_product_id`),
  ADD KEY `idx_inventory_movements_transaction_item` (`transaction_item_id`),
  ADD KEY `idx_inventory_movements_user` (`user_id`);

--
-- Indexes for table `inventory_products`
--
ALTER TABLE `inventory_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_inventory_sku` (`sku`);

--
-- Indexes for table `inventory_stock`
--
ALTER TABLE `inventory_stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_inventory_stock_product` (`inventory_product_id`);

--
-- Indexes for table `pending_transactions`
--
ALTER TABLE `pending_transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_transactions_txn_id` (`txn_id`),
  ADD KEY `idx_pending_transactions_customer_id` (`customer_id`);

--
-- Indexes for table `top_demand`
--
ALTER TABLE `top_demand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_transactions_txn_id` (`txn_id`),
  ADD KEY `idx_transactions_customer_id` (`customer_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_transaction_items_transaction_id` (`transaction_id`),
  ADD KEY `idx_transaction_items_pending_transaction_id` (`pending_transaction_id`),
  ADD KEY `idx_transaction_items_inventory_product_id` (`inventory_product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_users_username` (`username`);

--
-- Indexes for table `user_activity_log`
--
ALTER TABLE `user_activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_activity_log_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `forecast_monthly`
--
ALTER TABLE `forecast_monthly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `inventory_movements`
--
ALTER TABLE `inventory_movements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_products`
--
ALTER TABLE `inventory_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `inventory_stock`
--
ALTER TABLE `inventory_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `pending_transactions`
--
ALTER TABLE `pending_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `top_demand`
--
ALTER TABLE `top_demand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_activity_log`
--
ALTER TABLE `user_activity_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory_movements`
--
ALTER TABLE `inventory_movements`
  ADD CONSTRAINT `fk_inventory_movements_product` FOREIGN KEY (`inventory_product_id`) REFERENCES `inventory_products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inventory_movements_transaction_item` FOREIGN KEY (`transaction_item_id`) REFERENCES `transaction_items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inventory_movements_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventory_stock`
--
ALTER TABLE `inventory_stock`
  ADD CONSTRAINT `fk_inventory_stock_product` FOREIGN KEY (`inventory_product_id`) REFERENCES `inventory_products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pending_transactions`
--
ALTER TABLE `pending_transactions`
  ADD CONSTRAINT `fk_pending_transactions_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_transactions_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `fk_transaction_items_inventory_product` FOREIGN KEY (`inventory_product_id`) REFERENCES `inventory_products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaction_items_pending_transaction` FOREIGN KEY (`pending_transaction_id`) REFERENCES `pending_transactions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaction_items_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
