-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 04:38 PM
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
-- Database: `testreact`
--

-- --------------------------------------------------------

--
-- Table structure for table `addons`
--

CREATE TABLE `addons` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `category_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addons`
--

INSERT INTO `addons` (`id`, `name`, `price`, `visible`, `category_id`) VALUES
(2, 'Esspresso Shot', 20.00, 1, 1),
(4, 'Cream Cheese', 15.00, 1, 3),
(5, 'Whipped Cream', 15.00, 1, 4),
(6, 'Milk', 30.00, 1, 5),
(7, 'test-bibingka', 79.00, 1, 7),
(19, 'Cheese', 30.00, 1, 34),
(21, 'Esspreso Shot', 20.00, 1, 2),
(22, 'Esspreso Shot', 20.00, 1, 3),
(23, 'Esspreso Shot', 20.00, 1, 4),
(24, 'Pearls', 15.00, 1, 7),
(25, 'Nata de Coco', 15.00, 1, 26);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(100) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(4, 29, '2024-07-23 08:10:42', '2024-07-23 08:10:42'),
(5, 30, '2024-07-23 08:20:10', '2024-07-23 08:20:10'),
(6, 31, '2024-07-24 05:20:33', '2024-07-24 05:20:33'),
(15, 40, '2024-09-21 12:18:09', '2024-09-21 12:18:09'),
(16, 41, '2024-09-28 01:52:33', '2024-09-28 01:52:33'),
(17, 42, '2024-09-28 01:58:05', '2024-09-28 01:58:05'),
(18, 43, '2024-10-02 12:27:35', '2024-10-02 12:27:35'),
(19, 45, '2024-10-14 01:48:59', '2024-10-14 01:48:59'),
(20, 52, '2024-10-20 13:59:47', '2024-10-20 13:59:47'),
(21, 54, '2024-11-09 08:34:50', '2024-11-09 08:34:50'),
(22, 60, '2024-11-23 14:12:19', '2024-11-23 14:12:19'),
(23, 61, '2024-11-26 04:53:36', '2024-11-26 04:53:36');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(100) UNSIGNED NOT NULL,
  `food_id` int(50) UNSIGNED NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `addons` varchar(100) NOT NULL,
  `sugar_level` enum('100','75','50','25','0') NOT NULL DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `food_id`, `size`, `price`, `quantity`, `created_at`, `updated_at`, `addons`, `sugar_level`) VALUES
(109, 40, 18, 'Medium', 217.00, 1, '2024-09-21 12:23:10', '2024-09-21 12:23:10', 'taengkambing (₱59),cheesesabinimam (₱59),cheesesabinimam (₱50)', '100'),
(110, 40, 20, 'Large', 109.00, 1, '2024-09-21 12:34:54', '2024-09-21 12:34:54', 'cheesesabinimam (₱50)', '100'),
(231, 31, 18, 'Medium', 160.00, 1, '2024-11-09 07:54:38', '2024-11-09 07:54:38', '', '100'),
(232, 31, 19, 'Medium', 160.00, 1, '2024-11-09 07:56:32', '2024-11-09 07:56:32', '', '100');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(50) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `active` varchar(255) NOT NULL DEFAULT 'true',
  `featured` varchar(255) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `title`, `image_url`, `active`, `featured`) VALUES
(1, 'Signature Drinks', 'image/expresso.png', 'true', 'false'),
(2, 'Hot Coffee', 'image/milktea.png', 'true', 'false'),
(3, 'Iced Black Coffee', 'image/fruit.png', 'true', 'false'),
(4, 'Iced Coffee Latte', 'image/milktea.png', 'true', 'false'),
(5, 'Iced Blended', 'image/milktea.png', 'true', 'false'),
(7, 'Milk Tea', 'taengkambing.png', 'true', 'false'),
(26, 'Refreshers', '', 'true', 'false'),
(35, 'Snacks', '', 'true', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `cms_pages`
--

CREATE TABLE `cms_pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cms_pages`
--

INSERT INTO `cms_pages` (`id`, `title`, `content`, `created_at`, `updated_at`, `category`) VALUES
(1, 'Business Name', '<p>Jayd\'s Cafe</p>', '2024-08-26 03:24:36', '2024-11-18 17:54:31', 'Header'),
(2, 'About Us', 'Discover the perfect blend of flavors in every cup. From classic milk teas to unique creations, we’ve got something for everyone. Come sip, relax, and enjoy your favorite drink today!', '2024-08-26 03:24:51', '2024-10-12 03:24:46', 'About Us'),
(3, 'Location Page', 'https://www.google.com/maps/dir//Jayd\'s+Cafe+BLK+4,+Lot+1+Diamond+Ave+Dasmariñas,+4114+Cavite/@14.3466386,120.9810339,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397d51753ff9d15:0x1b2216c1440e07a9!2m2!1d120.9810339!2d14.3466386?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D', '2024-08-26 03:25:00', '2024-11-18 18:08:16', 'About Us'),
(4, 'Facebook', 'https://www.facebook.com/jayds.coffee', '2024-08-26 08:18:13', '2024-10-29 13:58:35', 'footer'),
(5, 'Instagram', 'https://www.instagram.com/jaydscafe/', '2024-08-26 08:20:23', '2024-10-29 13:59:09', 'footer'),
(7, 'Phone Number', '099922292992', '2024-08-26 08:32:30', '2024-08-30 22:55:59', 'contact'),
(8, 'Tel Number', '83928988', '2024-08-26 08:33:35', '2024-08-30 22:56:03', 'contact'),
(9, 'Small Logo', '/images/jaydsCoffee2.svg', '2024-08-31 05:41:38', '2024-09-15 02:19:42', 'image'),
(10, 'Big Logo', '/images/jaydsCoffee.svg', '2024-08-31 12:59:23', '2024-09-15 02:19:37', 'image'),
(14, 'Store Image', '/images/aboutUsPicture.jpg', '2024-08-31 23:32:07', '2024-10-29 14:00:31', 'image'),
(15, 'Operation hours', '10:00AM - 9:00PM', '2024-08-31 23:43:38', '2024-08-31 23:43:38', 'About Us'),
(16, 'Operation days', 'Monday - Sunday', '2024-08-31 23:44:02', '2024-08-31 23:44:02', 'About Us'),
(17, 'Review1', '/images/462534247_1771802123587897_6128529856494394845_n.png', '2024-10-11 16:50:21', '2024-10-11 16:50:21', 'Review'),
(18, 'Review2', '/images/462535634_1181343276303254_1691258288920020029_n.png', '2024-10-11 16:51:30', '2024-10-11 16:51:30', 'Review'),
(19, 'Review3', '/images/462538751_1066066354963335_9093822928369937838_n.png', '2024-10-11 16:51:51', '2024-10-11 16:51:51', 'Review'),
(20, 'Review4', '/images/', '2024-10-11 17:06:32', '2024-10-11 17:06:32', 'Review'),
(21, 'Review5', '/images/', '2024-10-11 17:06:36', '2024-10-11 17:06:36', 'Review'),
(22, 'Review6', '/images/', '2024-10-11 17:06:39', '2024-10-11 17:06:39', 'Review'),
(23, 'Terms', 'Our website is currently part of an ongoing thesis project and is still under development. Some features may be incomplete or may not function as expected. We appreciate your understanding and patience as we work to improve the site. Thank you for visiting!', '2024-10-18 12:20:32', '2024-10-29 13:57:54', 'Terms'),
(24, 'Location', 'B4 L1 Diamond Village Salawag Dasmariñas, Philippines', '2024-11-18 18:10:57', '2024-11-18 18:14:01', 'Terms'),
(25, 'Link', 'jaydscafe2020@gmail.com', '2024-11-18 18:13:34', '2024-11-18 18:13:34', 'footer');

-- --------------------------------------------------------

--
-- Table structure for table `discount_codes`
--

CREATE TABLE `discount_codes` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `max_discount_value` decimal(10,2) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT 1,
  `times_used` int(11) DEFAULT 0,
  `valid_from` date NOT NULL,
  `valid_until` date NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount_codes`
--

INSERT INTO `discount_codes` (`id`, `code`, `discount_type`, `discount_value`, `min_order_value`, `max_discount_value`, `usage_limit`, `times_used`, `valid_from`, `valid_until`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SUMMER2024', 'percentage', 15.00, 50.00, 100.00, 5, 3, '2024-06-01', '2024-12-31', 1, '2024-10-18 12:54:06', '2024-11-05 08:40:23');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(50) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `category_id` int(50) UNSIGNED NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `name`, `description`, `image_url`, `category_id`, `visible`) VALUES
(17, 'Hot Americano', 'Classic espresso with hot water for a bold flavor.\r\n', '/images/Hot Americano.png', 2, 1),
(18, 'Hot Cappuccino', 'Espresso topped with steamed milk foam.\r\n', '/images/Hot Coffee/Hot Cappuccino 1.png', 2, 1),
(19, 'Hot Chocolate', 'Warm, rich cocoa drink.', '/images/Hot Coffee/Hot Chocolate 1.png', 2, 1),
(20, 'Hot Coffee Latte', 'Espresso with steamed milk and light foam.', 'images/Hot Coffee/Hot Coffee Latte 1.png', 2, 1),
(21, 'Hot Thai Tea', 'Spiced black tea with milk for a sweet, creamy taste.\r\n', 'images/Hot Coffee/Hot Thai Tea 1.png', 2, 1),
(22, 'Caramel Machiato', 'Espresso with caramel and steamed milk.', 'images/Signature Drinks/Caramel Machiato 1.png', 1, 1),
(23, 'Caramel Mocha', 'Espresso, chocolate, and caramel blend.', 'images/Signature Drinks/Caramel Mocha 1.png', 1, 1),
(24, 'Cloud Hazelnut', 'Creamy hazelnut-flavored coffee.\r\n', 'images/Signature Drinks/cloud hazelnut 1.png', 1, 1),
(25, 'Cocoa Lava', 'Intense, rich chocolate drink.\r\n', 'images/Signature Drinks/Cocoa Lava 1.png', 1, 1),
(26, 'Salted Caramel', 'Sweet caramel with a hint of salt.', 'images/Signature Drinks/Salted Caramel.png', 1, 1),
(27, 'Strawberry Milk', 'Sweet strawberry-flavored milk drink.', 'images/Signature Drinks/Strawberry Milk 1.png', 1, 1),
(28, 'Black Coffee', 'Pure, strong coffee with no additives.', 'images/Iced Black Coffee/black coffee 1.png', 3, 1),
(29, 'Black Coffee with Cream', 'Black coffee with a creamy finish.\r\n', 'images/Iced Black Coffee/Black Coffee with Cream 1.png', 3, 1),
(30, 'Biscoffee Latte', 'Coffee with a hint of biscuit flavor.\r\n', 'images/Iced Coffee Latte/Biscoffee Latte.png', 4, 1),
(31, 'Cappuccino', 'Espresso with steamed milk and foam.', 'images/Iced Coffee Latte/Cappuccino.png', 4, 1),
(32, 'Coffee Latte', 'Balanced espresso and steamed milk.', 'images/Iced Coffee Latte/Coffee Latte.png', 4, 1),
(33, 'Hazelnut Latte', 'Espresso with hazelnut-flavored milk.', 'images/Iced Coffee Latte/Hazelnut Latte.png', 4, 1),
(34, 'Hot Chocolate', 'Classic hot cocoa drink.', 'images/Iced Coffee Latte/Hot Chocolate.png', 4, 1),
(35, 'Hot Thai Tea', 'Spiced black tea with milk (duplicate).', 'images/Iced Coffee Latte/Hot Thai Tea.png', 4, 1),
(36, 'Matcha Latte', 'Smooth matcha green tea with milk.', 'images/Iced Coffee Latte/Matcha Latte.png', 4, 1),
(37, 'Spanish Latte', 'Espresso with a touch of condensed milk.', 'images/Iced Coffee Latte/Spanish Latte.png', 4, 1),
(38, 'Caramel Ice Blended', 'Icy caramel-flavored blended drink.', 'images/Iced Blended/Caramel Ice Blended.png', 5, 1),
(39, 'Cookies & Cream Ice Blended', 'Creamy, cookie-flavored icy drink.', 'images/Iced Blended/Cookies & Cream Ice Blended.png', 5, 1),
(40, 'Java Chip Ice Blended', ' Coffee with chocolate chips blended in.', 'images/Iced Blended/Java Chip Ice Blended.png', 5, 1),
(41, 'Matcha Ice Blended', 'Refreshing matcha green tea blended with ice.', 'images/Iced Blended/Matcha Ice Blended.png', 5, 1),
(42, 'Mocha Ice Blended', 'Mocha Ice Blended', 'images/Iced Blended/Mocha Ice Blended.png', 5, 1),
(43, 'Salted Caramel Ice Blended', 'Salted Caramel Ice Blended', 'images/Iced Blended/Salted Caramel Ice Blended.png', 5, 1),
(44, 'Strawberries & Cream Ice Blended', 'Strawberries & Cream Ice Blended', 'images/Iced Blended/Strawberries & Cream Ice Blended.png', 5, 1),
(45, 'Vanilla Ice Blended', 'Vanilla Ice Blended', 'images/Iced Blended/Vanilla Ice Blended.png', 5, 1),
(46, 'Cookies & Cream', 'Cookies & Cream', 'images/Milk Tea/Cookies & Cream.png', 7, 1),
(47, 'Dark Chocolate', 'Dark Chocolate', 'images/Milk Tea/Dark Chocolate.png', 7, 1),
(48, 'Okinawa', 'Okinawa', 'images/Milk Tea/Okinawa.png', 7, 1),
(49, 'Taro', 'Taro', 'images/Milk Tea/Taro.png', 7, 1),
(54, 'Wintermelon', 'Wintermelon', 'images/Milk Tea/Wintermelon.png', 7, 1),
(113, 'Blueberry Soda', 'Blueberry Soda', '/images/Refreshers/Blueberry Soda.png', 26, 1),
(123, 'Cocoa Lava', 'Cocoa Lava', '/images/Signature Drinks/Cocoa Lava 1.png', 1, 1),
(127, 'Green Apple Soda', 'Green Apple Soda', '/images/Refreshers/Green Apple Soda.png', 26, 1),
(128, 'Honey Peach Soda', 'Honey Peach Soda', '/images/Refreshers/Honey Peach Soda.png', 26, 1),
(129, 'Lychee Soda', 'Lychee Soda', '/images/Refreshers/Lychee Soda.png', 26, 1),
(131, 'Strawberry Soda', 'Strawberry Soda', '/images/Refreshers/Strawberry Soda.png', 26, 1),
(134, 'Cheesy Burger', 'Buy 1 take 1 Cheesy Burger along side lettuce', '/images/image_url_1732624482229.png', 35, 1);

-- --------------------------------------------------------

--
-- Table structure for table `food_sizes`
--

CREATE TABLE `food_sizes` (
  `id` int(11) NOT NULL,
  `food_id` int(50) UNSIGNED DEFAULT NULL,
  `size` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_sizes`
--

INSERT INTO `food_sizes` (`id`, `food_id`, `size`, `price`, `date_created`, `date_update`) VALUES
(1, 17, 'Medium', 93.00, '2024-08-31 15:17:30', '2024-10-14 06:12:23'),
(3, 18, 'Medium', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:11:15'),
(5, 19, 'Medium', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:11:26'),
(7, 20, 'Medium', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:11:40'),
(9, 21, 'Medium', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:11:55'),
(11, 22, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:13:27'),
(12, 23, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:21:54'),
(13, 24, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:16:12'),
(14, 24, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:16:26'),
(15, 25, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:17:08'),
(16, 25, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:17:19'),
(17, 26, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:17:29'),
(18, 26, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:17:40'),
(19, 27, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:18:15'),
(20, 27, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:18:25'),
(21, 28, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 06:23:08'),
(22, 28, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 06:23:20'),
(23, 29, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 06:23:34'),
(24, 29, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 06:23:42'),
(25, 30, 'Medium', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:25:06'),
(26, 30, 'Large', 186.00, '2024-08-31 15:17:30', '2024-10-14 06:25:19'),
(27, 31, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:25:46'),
(28, 31, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:25:59'),
(29, 32, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:26:22'),
(30, 32, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:26:32'),
(31, 33, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:26:48'),
(32, 33, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:27:00'),
(33, 34, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:28:22'),
(34, 34, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:28:32'),
(35, 35, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:29:14'),
(36, 35, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:29:25'),
(37, 36, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:29:48'),
(38, 36, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:29:58'),
(39, 37, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:30:09'),
(40, 37, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:30:22'),
(41, 38, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:30:50'),
(42, 38, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:31:04'),
(43, 39, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:31:16'),
(44, 39, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:31:30'),
(45, 40, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 06:31:46'),
(46, 40, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:31:58'),
(47, 41, 'Medium', 126.00, '2024-08-31 15:17:30', '2024-10-14 06:35:13'),
(48, 41, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:35:20'),
(49, 42, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 06:35:51'),
(50, 42, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 06:36:05'),
(51, 43, 'Medium', 133.00, '2024-08-31 15:17:30', '2024-10-14 07:14:55'),
(52, 43, 'Large', 160.00, '2024-08-31 15:17:30', '2024-10-14 07:14:46'),
(85, 44, 'Medium', 126.00, '2024-08-31 15:17:30', '2024-10-14 07:15:14'),
(86, 44, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 07:15:30'),
(87, 45, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 08:28:07'),
(88, 45, 'Large', 133.00, '2024-08-31 15:17:30', '2024-10-14 08:28:19'),
(89, 46, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 08:28:40'),
(90, 46, 'Large', 136.00, '2024-08-31 15:17:30', '2024-10-14 08:28:52'),
(91, 47, 'Medium', 113.00, '2024-08-31 15:17:30', '2024-10-14 08:29:36'),
(92, 47, 'Large', 136.00, '2024-08-31 15:17:30', '2024-10-14 08:29:47'),
(93, 48, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 08:30:12'),
(94, 48, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 08:30:26'),
(95, 49, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 08:30:36'),
(96, 49, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 08:30:46'),
(105, 54, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 08:31:03'),
(106, 54, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 08:31:16'),
(117, 23, 'Medium', 80.00, '2024-08-31 15:17:30', '2024-10-14 08:31:34'),
(118, 22, 'Large', 100.00, '2024-08-31 15:17:30', '2024-10-14 08:31:44'),
(149, 17, 'small', 20.00, '2024-08-31 15:37:30', '2024-10-14 11:14:24'),
(177, 113, 'Medium', 113.00, '2024-09-21 08:40:28', '2024-10-14 08:32:19'),
(178, 18, 'small', 27.00, '2024-09-28 13:54:02', '2024-09-28 13:54:02'),
(179, 19, 'small', 29.00, '2024-09-28 14:18:55', '2024-09-28 14:18:55'),
(188, 29, 'Venti', 120.00, '2024-10-31 05:04:44', '2024-10-31 05:04:44'),
(189, 21, 'Large', 120.00, '2024-10-31 05:08:41', '2024-10-31 05:08:41'),
(190, 21, 'Venti', 180.00, '2024-10-31 05:09:06', '2024-10-31 05:09:06'),
(191, 28, 'Venti', 120.00, '2024-10-31 05:11:53', '2024-10-31 05:11:53'),
(194, 134, 'Large', 80.00, '2024-11-26 12:34:42', '2024-11-26 12:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `sender_id` int(11) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `ticket_id`, `sender_id`, `content`, `created_at`, `is_read`) VALUES
(230, '6cu5v8n24a', 54, 'Test', '2024-11-18 16:37:37', 0),
(231, '6cu5v8n24a', 42, 'Hello poo', '2024-11-18 16:37:44', 0),
(232, '6cu5v8n24a', 42, 'Ano pong sainyo', '2024-11-18 16:37:47', 0),
(233, '6cu5v8n24a', 54, 'hello', '2024-11-22 08:10:32', 0),
(234, '6cu5v8n24a', 42, 'test', '2024-11-22 08:13:26', 0),
(235, '6cu5v8n24a', 54, 'Ayoo', '2024-11-22 08:13:30', 0),
(236, '6cu5v8n24a', 54, 'san po kayo', '2024-11-22 08:13:39', 0),
(237, '6cu5v8n24a', 42, 'Test', '2024-11-23 14:11:48', 0),
(238, 'so1vhxfi9r', 60, 'Ayo', '2024-11-23 14:12:36', 0),
(239, 'so1vhxfi9r', 42, 'test', '2024-11-23 14:12:45', 0),
(240, 'so1vhxfi9r', 42, 'ayooo puta', '2024-11-23 14:14:32', 0),
(241, 'so1vhxfi9r', 42, 'test', '2024-11-23 14:15:36', 0),
(242, 'so1vhxfi9r', 42, 'type a message', '2024-11-23 14:15:44', 0),
(244, 'so1vhxfi9r', 42, 'test', '2024-11-23 14:17:54', 0),
(245, '6cu5v8n24a', 42, 'putangina', '2024-11-23 14:17:57', 0),
(246, 'so1vhxfi9r', 42, 'ADMIN', '2024-11-23 14:18:37', 0),
(247, 'so1vhxfi9r', 42, 'vape', '2024-11-23 14:23:48', 0),
(248, '6cu5v8n24a', 42, 'leklek bading', '2024-11-23 14:24:24', 0),
(249, 'so1vhxfi9r', 60, 'ye', '2024-11-23 14:24:37', 0),
(250, '6cu5v8n24a', 54, 'Hello', '2024-11-26 05:22:04', 0),
(251, '6cu5v8n24a', 54, 'test', '2024-11-26 05:31:43', 0),
(252, '6cu5v8n24a', 54, 'check', '2024-11-26 05:31:55', 0),
(253, '6cu5v8n24a', 54, 'baket po ganon', '2024-11-26 05:31:59', 0),
(254, '6cu5v8n24a', 54, 'test', '2024-11-26 05:33:37', 0),
(255, '6cu5v8n24a', 54, 'test', '2024-11-26 05:34:30', 0),
(256, '6cu5v8n24a', 54, 'Tes', '2024-11-26 05:35:59', 0),
(257, '6cu5v8n24a', 54, 'dsds', '2024-11-26 05:36:00', 0),
(258, '6cu5v8n24a', 54, 'tesakdaskdkasdasdghasdhkjasgdashjdgashd ashdgas hdgashjd agsdjasd', '2024-11-26 05:38:33', 0),
(259, '6cu5v8n24a', 54, 'test', '2024-11-26 05:41:38', 0),
(260, '6cu5v8n24a', 54, 'ASDASDHASdhasdhasdhasdhashdashdhasd', '2024-11-26 05:41:40', 0),
(261, '6cu5v8n24a', 54, 'asdasdasdasdasdasdasdasdasdasdahsd asdasdkj asdas hdas dasd asd asdas d', '2024-11-26 05:43:52', 0),
(262, '6cu5v8n24a', 54, 'AHSdhasdha DHsad asjhdasjdhasdiuuqqhasdjhasdahsidas hdsa', '2024-11-26 05:43:57', 0),
(263, '6cu5v8n24a', 54, 'test', '2024-11-26 05:43:59', 0),
(264, '6cu5v8n24a', 54, 'Test', '2024-11-26 05:45:23', 0),
(265, '6cu5v8n24a', 54, 'asdasdasdasdasdasdasdasdasdsadasdashjdaskjdhasjkdhaskjdhaskjdhasd', '2024-11-26 05:45:28', 0),
(266, '6cu5v8n24a', 42, 'Test', '2024-11-26 05:51:05', 0),
(267, '6cu5v8n24a', 42, 'vape cheeck', '2024-11-26 05:54:36', 0),
(268, '6cu5v8n24a', 54, 'hello', '2024-11-26 05:55:54', 0),
(269, '6cu5v8n24a', 42, 'test', '2024-11-26 05:59:12', 0),
(270, '6cu5v8n24a', 42, 'test', '2024-11-26 06:00:53', 0),
(271, '6cu5v8n24a', 42, 'test', '2024-11-26 06:02:16', 0),
(272, '6cu5v8n24a', 54, 'test', '2024-11-26 06:03:17', 0),
(273, '6cu5v8n24a', 42, 'test', '2024-11-26 06:03:21', 0),
(274, '6cu5v8n24a', 42, 'test', '2024-11-26 06:08:59', 0),
(275, '6cu5v8n24a', 54, 'chec', '2024-11-26 06:09:04', 0),
(276, '6cu5v8n24a', 54, 'test', '2024-11-26 06:09:25', 0),
(277, '6cu5v8n24a', 54, 'test', '2024-11-26 06:09:52', 0),
(278, '6cu5v8n24a', 42, 'tests', '2024-11-26 06:09:55', 0),
(279, '6cu5v8n24a', 54, 'test', '2024-11-26 06:10:37', 0),
(280, '6cu5v8n24a', 42, 'kanina pako test', '2024-11-26 06:10:47', 0),
(281, '6cu5v8n24a', 42, 'ng test dito', '2024-11-26 06:10:48', 0),
(282, '6cu5v8n24a', 54, 'ayos tol', '2024-11-26 06:10:52', 0),
(283, '6cu5v8n24a', 54, 'tol', '2024-11-26 06:10:58', 0),
(284, '6cu5v8n24a', 42, 'c', '2024-11-26 06:11:39', 0),
(285, '6cu5v8n24a', 54, 'test', '2024-11-26 06:13:39', 0),
(286, '6cu5v8n24a', 42, 'test', '2024-11-26 06:13:50', 0),
(287, '6cu5v8n24a', 54, 'ayoo', '2024-11-26 06:14:27', 0),
(288, '6cu5v8n24a', 42, 'test', '2024-11-26 06:15:36', 0),
(289, '6cu5v8n24a', 54, 'ayo', '2024-11-26 06:15:39', 0),
(290, '6cu5v8n24a', 54, 'check', '2024-11-26 06:17:23', 0),
(291, '6cu5v8n24a', 42, 'test', '2024-11-26 06:17:28', 0),
(292, '6cu5v8n24a', 54, 'test', '2024-11-26 06:18:24', 0),
(293, '6cu5v8n24a', 42, 'test', '2024-11-26 06:18:33', 0),
(294, '6cu5v8n24a', 42, 'test', '2024-11-26 06:19:22', 0),
(295, '6cu5v8n24a', 54, 'tae', '2024-11-26 06:19:25', 0),
(296, '6cu5v8n24a', 42, 'ayown', '2024-11-26 06:19:29', 0),
(297, '6cu5v8n24a', 54, 'gumagana diba', '2024-11-26 06:19:32', 0),
(298, '6cu5v8n24a', 42, 'asdasdasdasdas', '2024-11-26 06:20:58', 0),
(299, '6cu5v8n24a', 42, 'test', '2024-11-26 06:22:10', 0),
(300, '6cu5v8n24a', 54, 'test', '2024-11-26 06:22:19', 0),
(301, '6cu5v8n24a', 42, 'test', '2024-11-26 06:22:56', 0),
(302, '6cu5v8n24a', 54, 'chec', '2024-11-26 06:22:59', 0),
(303, '6cu5v8n24a', 54, 'test', '2024-11-26 06:24:58', 0),
(304, '6cu5v8n24a', 54, 'test', '2024-11-26 06:25:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(100) UNSIGNED NOT NULL,
  `customer_id` int(100) UNSIGNED NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `deliveryMethod` enum('Pickup','Delivery') NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `update_order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('unpaid','paid','on process','order ready','pending rider','on delivery','completed','cancelled') NOT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `totalPrice` int(11) NOT NULL,
  `rider_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `deliveryMethod`, `paymentMethod`, `update_order_date`, `status`, `delivery_address`, `totalPrice`, `rider_id`) VALUES
(2075, 61, '2024-11-26 07:26:28', 'Pickup', 'gcash', '2024-11-26 08:25:49', 'completed', '', 160, 0),
(2076, 61, '2024-11-26 07:37:08', 'Pickup', 'gcash', '2024-11-26 08:27:39', 'completed', '', 160, 0),
(2077, 61, '2024-11-26 07:43:53', 'Pickup', 'gcash', '2024-11-26 08:21:27', 'completed', '', 160, 0),
(2078, 61, '2024-11-26 07:46:52', 'Delivery', 'gcash', '2024-11-26 07:50:37', 'pending rider', 'Blk p lot 4 DASMARINAS', 160, 44),
(2079, 61, '2024-11-26 08:11:52', 'Pickup', 'gcash', '2024-11-26 08:27:51', 'completed', '', 160, 0),
(2080, 54, '2024-11-26 08:28:16', 'Delivery', 'gcash', '2024-11-26 08:28:33', 'pending rider', 'Salawag Diamond Village Blk 10 Lot 4', 160, 44);

-- --------------------------------------------------------

--
-- Table structure for table `orders_food`
--

CREATE TABLE `orders_food` (
  `id` int(11) NOT NULL,
  `order_id` int(100) UNSIGNED NOT NULL,
  `food_id` int(50) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(100) NOT NULL,
  `addons` varchar(255) NOT NULL,
  `sugar_level` enum('100','75','50','25','0') NOT NULL DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_food`
--

INSERT INTO `orders_food` (`id`, `order_id`, `food_id`, `quantity`, `size`, `addons`, `sugar_level`) VALUES
(234, 2075, 18, 1, 'Medium', '', '100'),
(235, 2076, 19, 1, 'Medium', '', '100'),
(236, 2077, 18, 1, 'Medium', '', '100'),
(237, 2078, 18, 1, 'Medium', '', '100'),
(238, 2079, 18, 1, 'medium', '', '100'),
(239, 2080, 19, 1, 'Medium', '', '100');

-- --------------------------------------------------------

--
-- Table structure for table `order_addons`
--

CREATE TABLE `order_addons` (
  `id` int(11) UNSIGNED NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL,
  `addon_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_msg`
--

CREATE TABLE `order_msg` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL,
  `sender_id` int(10) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_msg`
--

INSERT INTO `order_msg` (`id`, `order_id`, `sender_id`, `content`, `created_at`, `is_read`) VALUES
(36, 1995, 44, 'test', '2024-11-05 14:45:34', 0),
(37, 1995, 31, 'test', '2024-11-05 14:46:27', 0),
(38, 1995, 44, 'test', '2024-11-05 14:46:35', 0),
(39, 1995, 31, 'test', '2024-11-05 14:46:45', 0),
(40, 1995, 44, 'test', '2024-11-05 14:46:57', 0),
(41, 1995, 31, 'yow', '2024-11-05 14:47:02', 0),
(42, 1995, 44, 'test', '2024-11-05 14:47:05', 0),
(43, 1995, 31, 'ayooo', '2024-11-05 14:47:10', 0),
(44, 1995, 44, 'test', '2024-11-05 14:47:23', 0),
(45, 1995, 31, 'ayo', '2024-11-05 14:47:29', 0),
(46, 1995, 31, '123', '2024-11-05 14:47:32', 0),
(47, 1995, 31, '123', '2024-11-05 14:47:37', 0),
(48, 1995, 44, 'test', '2024-11-05 14:47:44', 0),
(49, 1995, 31, 'hell yo', '2024-11-05 14:48:20', 0),
(50, 1995, 44, 'chec', '2024-11-05 14:48:30', 0),
(51, 1995, 31, 'asd', '2024-11-05 14:48:32', 0),
(52, 1995, 31, 'asd', '2024-11-05 14:48:35', 0),
(53, 1995, 31, 'asd', '2024-11-05 14:48:37', 0),
(54, 1995, 44, 'test', '2024-11-05 14:49:15', 0),
(55, 1995, 31, 'test', '2024-11-05 14:49:18', 0),
(56, 1995, 31, 'asdasd', '2024-11-05 14:49:21', 0),
(57, 1995, 31, 'asd', '2024-11-05 14:49:23', 0),
(58, 1995, 31, 'asd', '2024-11-05 14:49:30', 0),
(59, 1995, 44, 'chec', '2024-11-05 14:52:01', 0),
(60, 1995, 31, 'asd', '2024-11-05 14:52:07', 0),
(61, 1995, 44, 'asdasd', '2024-11-05 14:53:32', 0),
(62, 1995, 31, 'ayo wats good', '2024-11-05 14:53:40', 0),
(63, 1995, 44, 'ay', '2024-11-05 14:54:28', 0),
(64, 1995, 44, 'check', '2024-11-05 14:54:44', 0),
(65, 1995, 44, 'ala', '2024-11-05 14:54:48', 0),
(66, 1995, 44, 'test', '2024-11-05 14:55:34', 0),
(67, 1995, 44, 'ala', '2024-11-05 14:55:36', 0),
(68, 1995, 44, 'ala', '2024-11-05 14:55:39', 0),
(69, 1995, 44, 'ala', '2024-11-05 14:55:42', 0),
(70, 1995, 44, 'asd', '2024-11-05 14:57:23', 0),
(71, 1995, 44, 'dasdsa', '2024-11-05 14:57:25', 0),
(72, 1995, 44, 'ayooo', '2024-11-05 14:58:17', 0),
(73, 1995, 44, 'test', '2024-11-05 15:00:32', 0),
(74, 1995, 44, 'check', '2024-11-05 15:01:25', 0),
(75, 1995, 44, 'ayo', '2024-11-05 15:01:33', 0),
(76, 1995, 31, 'check', '2024-11-05 15:01:45', 0),
(77, 1995, 31, 'asdasd', '2024-11-05 15:01:56', 0),
(78, 1995, 31, 'asdasd', '2024-11-05 15:02:01', 0),
(79, 1995, 31, 'asdasddad', '2024-11-05 15:02:04', 0),
(80, 1995, 44, 'asdas', '2024-11-05 15:03:57', 0),
(81, 1995, 31, 'asdsadasda', '2024-11-05 15:04:06', 0),
(82, 1995, 44, 'asdd', '2024-11-05 15:04:21', 0),
(83, 1995, 31, 'testtt', '2024-11-05 15:04:25', 0),
(84, 1995, 31, 'asd', '2024-11-05 15:06:34', 0),
(85, 1995, 44, 'asdasdasdas', '2024-11-05 15:06:46', 0),
(86, 1995, 31, 'asdasd', '2024-11-05 15:14:27', 0),
(87, 1995, 44, 'test', '2024-11-05 15:18:05', 0),
(88, 1995, 44, 'check', '2024-11-05 15:18:16', 0),
(89, 1995, 31, 'test', '2024-11-05 15:18:23', 0),
(90, 1995, 44, 'check', '2024-11-05 15:18:28', 0),
(91, 1995, 44, 'test', '2024-11-05 15:18:34', 0),
(92, 1995, 31, 'ayo', '2024-11-05 15:18:37', 0),
(93, 1995, 31, 'test', '2024-11-05 15:21:02', 0),
(94, 1995, 44, 'test', '2024-11-05 15:21:24', 0),
(95, 1995, 31, 'test', '2024-11-05 15:21:27', 0),
(96, 1995, 44, 'asd', '2024-11-05 15:21:31', 0),
(97, 1995, 31, 'asd', '2024-11-05 15:21:33', 0),
(98, 1995, 31, 'sdada', '2024-11-05 15:21:36', 0),
(99, 1995, 44, 'asdasd', '2024-11-05 15:21:41', 0),
(100, 1995, 44, 'test', '2024-11-05 15:30:40', 0),
(101, 1995, 31, 'sds', '2024-11-05 15:30:50', 0),
(102, 1995, 44, 'test', '2024-11-05 15:30:56', 0),
(103, 1995, 31, 'test', '2024-11-05 15:31:41', 0),
(104, 1995, 44, 'sadasd', '2024-11-05 15:31:44', 0),
(105, 1995, 31, 'dasd', '2024-11-05 15:32:03', 0),
(106, 1995, 44, 'asdsad', '2024-11-05 15:32:05', 0),
(107, 1995, 44, 'asdasd', '2024-11-05 15:32:10', 0),
(108, 1995, 31, 'yooo', '2024-11-05 15:33:19', 0),
(109, 1995, 44, 'sadas', '2024-11-05 15:33:51', 0),
(110, 1995, 31, 'asdasd', '2024-11-05 15:33:55', 0),
(111, 1995, 44, 'asdasdas', '2024-11-05 15:33:58', 0),
(112, 1995, 31, 'test', '2024-11-05 15:34:15', 0),
(113, 1995, 44, 'test', '2024-11-05 15:34:18', 0),
(114, 1995, 31, 'chec', '2024-11-05 15:34:54', 0),
(115, 1995, 44, 'test', '2024-11-05 15:34:59', 0),
(116, 1995, 44, 'ayo', '2024-11-05 15:35:05', 0),
(117, 1995, 31, 'ano', '2024-11-05 15:35:12', 0),
(118, 1995, 44, 'test', '2024-11-05 15:37:31', 0),
(119, 1995, 31, 'ayon', '2024-11-05 15:37:36', 0),
(120, 1995, 44, 'ahh', '2024-11-05 15:37:43', 0),
(121, 1995, 44, 'test', '2024-11-05 15:38:29', 0),
(122, 1995, 31, 'taea', '2024-11-05 15:38:53', 0),
(123, 1995, 44, 'test', '2024-11-05 15:41:11', 0),
(124, 1995, 31, 'ayo', '2024-11-05 15:41:15', 0),
(125, 1993, 44, 'asdasdasd', '2024-11-05 15:43:08', 0),
(126, 1995, 31, 'wow', '2024-11-05 15:43:12', 0),
(127, 1993, 44, 'asdsa', '2024-11-05 15:43:14', 0),
(128, 1995, 31, 'asdsa', '2024-11-05 15:43:17', 0),
(129, 1995, 44, 'asdsa', '2024-11-05 15:43:19', 0),
(130, 1995, 44, 'test', '2024-11-05 15:44:18', 0),
(131, 1995, 31, 'test', '2024-11-05 15:55:29', 0),
(132, 1995, 44, 'test', '2024-11-05 15:55:32', 0),
(133, 1995, 31, 'test', '2024-11-05 15:55:39', 0),
(134, 1995, 44, 'asdasdasdsad', '2024-11-05 15:55:42', 0),
(135, 1995, 44, 'test', '2024-11-05 15:56:20', 0),
(136, 1995, 44, 'chec', '2024-11-05 15:58:52', 0),
(137, 1995, 44, 'test', '2024-11-05 16:01:21', 0),
(138, 1995, 44, 'test', '2024-11-05 16:06:16', 0),
(139, 1995, 44, 'test', '2024-11-05 16:06:51', 0),
(140, 1995, 31, 'test', '2024-11-05 16:06:58', 0),
(141, 1995, 44, 'test', '2024-11-05 16:07:03', 0),
(142, 1995, 31, 'asdasdsa', '2024-11-05 16:07:06', 0),
(143, 1995, 44, 'asdasdasd', '2024-11-05 16:07:11', 0),
(144, 1995, 44, 'cehck', '2024-11-05 16:09:23', 0),
(145, 1995, 31, 'ala', '2024-11-05 16:09:33', 0),
(146, 1995, 44, 'ayo', '2024-11-05 16:09:49', 0),
(147, 1995, 31, 'ayo', '2024-11-05 16:09:52', 0),
(148, 1995, 31, 'asdasdasdasdasd', '2024-11-05 16:09:55', 0),
(149, 1995, 44, 'asdasd', '2024-11-05 16:11:24', 0),
(150, 1995, 31, 'test', '2024-11-05 16:11:27', 0),
(151, 1995, 31, 'test', '2024-11-05 16:12:04', 0),
(152, 1995, 44, 'ayo', '2024-11-05 16:12:08', 0),
(153, 1995, 31, 'butangiansdasd', '2024-11-05 16:12:15', 0),
(154, 1995, 44, 'putangionaasd', '2024-11-05 16:12:23', 0),
(155, 1995, 31, 'PUTANGINASDHASDHASD', '2024-11-05 16:12:38', 0),
(156, 1995, 44, 'test', '2024-11-05 16:13:58', 0),
(157, 1995, 31, 'oo', '2024-11-05 16:14:08', 0),
(158, 1995, 44, 'hala', '2024-11-05 16:14:52', 0),
(159, 1995, 31, 'hala', '2024-11-05 16:14:59', 0),
(160, 1995, 44, 'check', '2024-11-05 16:15:04', 0),
(161, 1995, 31, 'test', '2024-11-05 16:15:08', 0),
(162, 1995, 31, 'ayo', '2024-11-05 16:23:39', 0),
(163, 1995, 44, 'ayo', '2024-11-05 16:23:46', 0),
(164, 1995, 44, 'AYo', '2024-11-05 16:23:56', 0),
(165, 1995, 31, 'hala', '2024-11-05 16:24:05', 0),
(166, 1995, 44, 'test', '2024-11-05 16:24:12', 0),
(167, 1995, 44, 'test', '2024-11-05 16:24:15', 0),
(168, 1995, 44, 'test', '2024-11-05 16:24:44', 0),
(169, 1995, 31, 'test', '2024-11-05 16:24:47', 0),
(170, 1995, 44, 'asdasda', '2024-11-05 16:24:51', 0),
(171, 1995, 31, 'asdasdasd', '2024-11-05 16:25:03', 0),
(172, 1995, 44, 'asdsadas', '2024-11-05 16:25:07', 0),
(173, 1995, 44, 'awit\\', '2024-11-05 16:25:15', 0),
(174, 1995, 31, 'awit', '2024-11-05 16:25:22', 0),
(175, 1995, 44, 'putangina', '2024-11-05 16:25:27', 0),
(176, 1995, 31, 'test', '2024-11-05 16:25:53', 0),
(177, 1995, 44, 'test', '2024-11-05 16:25:55', 0),
(178, 1995, 44, 'ayo', '2024-11-05 16:26:03', 0),
(179, 1995, 44, 'ayo', '2024-11-05 16:26:07', 0),
(180, 1995, 31, 'test', '2024-11-05 16:26:55', 0),
(181, 1995, 44, 'test', '2024-11-05 16:26:57', 0),
(182, 1995, 44, 'asdsadas', '2024-11-05 16:27:00', 0),
(183, 1995, 44, 'test', '2024-11-05 16:27:49', 0),
(184, 1995, 31, 'test', '2024-11-05 16:27:52', 0),
(185, 1995, 44, 'ayun', '2024-11-05 16:27:56', 0),
(186, 1995, 31, 'check', '2024-11-05 16:27:59', 0),
(187, 1995, 31, 'test', '2024-11-05 16:28:06', 0),
(188, 1995, 44, 'test', '2024-11-05 16:28:10', 0),
(189, 1995, 44, 'test', '2024-11-05 16:40:42', 0),
(190, 1995, 31, 'test', '2024-11-05 16:40:48', 0),
(191, 2004, 44, 'Test', '2024-11-09 10:24:15', 0),
(192, 2004, 44, 'test', '2024-11-09 10:24:40', 0),
(193, 2004, 54, 'Hello po', '2024-11-09 10:24:46', 0),
(194, 2004, 44, 'bakettt ?', '2024-11-09 10:24:52', 0),
(195, 2004, 54, 'test', '2024-11-09 10:25:57', 0),
(196, 2004, 44, 'hello', '2024-11-09 10:26:00', 0),
(197, 2004, 54, 'saan na po kayo ?', '2024-11-09 10:26:09', 0),
(198, 2004, 54, 'test', '2024-11-09 10:26:47', 0),
(199, 2004, 44, 'test', '2024-11-09 10:26:53', 0),
(200, 2004, 54, 'ayooo', '2024-11-09 10:38:42', 0),
(201, 2004, 54, 'test', '2024-11-09 10:43:32', 0),
(202, 2004, 44, 'aba', '2024-11-09 10:43:41', 0),
(203, 2004, 44, 'bat nag tetest ka dyan', '2024-11-09 10:43:47', 0),
(204, 2004, 54, 'bakit bawal po ba huhu', '2024-11-09 10:43:55', 0),
(205, 2004, 54, 'test', '2024-11-09 10:45:11', 0),
(206, 2004, 44, 'testing', '2024-11-09 10:45:16', 0),
(207, 2004, 44, 'ETO NA PADATING NA TANGINA MO', '2024-11-09 10:45:31', 0),
(208, 2004, 54, 'ABA PUTANG', '2024-11-09 10:45:40', 0),
(209, 2006, 44, 'Hello po', '2024-11-26 06:35:49', 0),
(210, 2006, 54, 'Saan po kayo sir', '2024-11-26 06:36:04', 0),
(211, 2006, 44, 'hello po', '2024-11-26 06:40:30', 0),
(212, 2006, 54, 'test', '2024-11-26 06:41:15', 0),
(213, 2006, 54, 'test', '2024-11-26 06:41:19', 0),
(214, 2006, 54, 'test', '2024-11-26 06:42:10', 0),
(215, 2006, 54, 'check', '2024-11-26 06:42:16', 0),
(216, 2006, 54, 'test', '2024-11-26 06:42:41', 0),
(217, 2006, 44, 'test', '2024-11-26 06:43:13', 0),
(218, 2006, 54, 'test', '2024-11-26 06:50:18', 0),
(219, 2006, 54, 'check', '2024-11-26 06:53:05', 0),
(220, 2006, 44, 'wag', '2024-11-26 06:53:08', 0),
(221, 2006, 54, 'sir', '2024-11-26 06:53:11', 0),
(222, 2006, 54, 'sir wag sir', '2024-11-26 06:53:17', 0),
(223, 2006, 44, 'testasdasdas', '2024-11-26 06:56:21', 0),
(224, 2006, 44, 'test', '2024-11-26 06:58:42', 0),
(225, 2006, 44, 'tets', '2024-11-26 07:00:22', 0),
(226, 2074, 44, 'test', '2024-11-26 07:04:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_msg_id`
--

CREATE TABLE `order_msg_id` (
  `id` int(10) UNSIGNED NOT NULL,
  `ticked_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `subject` int(11) DEFAULT NULL,
  `status` enum('open','closed') NOT NULL DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riderstats`
--

CREATE TABLE `riderstats` (
  `id` int(10) UNSIGNED NOT NULL,
  `rider_id` int(10) UNSIGNED NOT NULL,
  `earnings` int(11) NOT NULL,
  `Orders` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `administer` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `title`, `administer`) VALUES
(1, 'admin', 3),
(2, 'cashier', 2),
(3, 'user', 0),
(4, 'rider', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `status` enum('open','closed') DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `ticket_id`, `user_id`, `subject`, `status`, `created_at`, `updated_at`) VALUES
(23, '6cu5v8n24a', 54, '', 'open', '2024-11-18 16:37:35', '2024-11-26 06:25:10'),
(24, 'so1vhxfi9r', 60, '', 'open', '2024-11-23 14:12:34', '2024-11-23 14:12:34');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(100) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `secondary_address` varchar(255) NOT NULL,
  `role` int(10) UNSIGNED DEFAULT 3,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verification_token` varchar(255) NOT NULL,
  `verified` varchar(250) NOT NULL DEFAULT 'false',
  `pnum` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `address`, `secondary_address`, `role`, `created_at`, `updated_at`, `verification_token`, `verified`, `pnum`) VALUES
(29, 'chardsd', 'cilayap482@modotso.com', '$2b$10$/Zy8Kp69PUPEfsaEbUvdFuMl2Hes3J05Kjd3SSWEJE0b1eoaMOZ8G', 'hello 214sd', '', 3, '2024-07-23 08:10:42', '2024-10-20 06:17:28', '49hl4jgopk', 'true', ''),
(30, 'dagangbukid', 'fobedo2401@reebsd.com', '$2b$10$LQfRgTYjqCoUngDsW9sQM.6lKfNq21fEMzVTh6ydb6Orj8uJqQxg.', 'DYAN LANG', '', 3, '2024-07-23 08:20:10', '2024-10-20 06:17:28', 'cn0d0eco8k', 'false', ''),
(31, 'edsel', 'ritsardcardosa@gmail.com', '$2b$10$.FcqFxfl/IxoqS7Bcm3vs.htiQq0gwjneV9T.rJu8cFQ1rtRt5YAC', 'test', 'new test', 3, '2024-07-24 05:20:33', '2024-11-09 08:33:03', '254kh7vd2k', 'true', '09278658353'),
(40, 'Pedro Penduko', 'jobatoc997@ofionk.com', '$2b$10$txPG8S9wWxyQKrWnVhhBd.ABarEi71skq8KM1IWayUX3bEj04cqiu', 'Salawag Diamond Village Blk 10 Lot 4', '', 3, '2024-09-21 12:18:09', '2024-10-20 06:17:28', '27o4xjs1ts', 'false', '09278658355'),
(41, 'chardgrey', 'chardgrey@gmail.com', '$2b$10$5zsQK5v7BQW3WFcpLMBDveWzsV8e6EsUR7751.X3ZU2VhZ4pXcdle', 'Blk p lot 4 DASMARINAS', '', 3, '2024-09-28 01:52:33', '2024-10-20 06:17:28', 'dolrv3tepi', 'false', '09278658355'),
(42, 'Leklek', 'leklek@gmail.com', '$2b$10$0kuhukkS6ir9d5ERf6UKSeqP8GH1nV5wBuIrF9JMJ13xAyr.bQac6', 'Blk p lot 4 DASMARINAS', '', 1, '2024-09-28 01:58:05', '2024-11-09 19:41:29', '0473le3c91', 'true', '09278658355'),
(43, 'tetetetest', 'tetetetest@gmail.com', '$2b$10$2hGDiB5Dhngk.xiEi958kuOhvTVH5NoRhFWU.MYR985VgbIcfQDpC', 'tetetetest', '', 3, '2024-10-02 12:27:35', '2024-10-20 06:17:28', 'xdix8ijkbf', 'false', '09278658355'),
(44, 'binulzahan02', 'binulzahan02@gmail.com', '$2b$10$Z6eau.XVkvkqKX57pRmo0OhkCHYpEVGkEqSFVgMjGgTiWDmaLN32q', 'test', '', 4, '2024-10-14 01:14:45', '2024-11-13 15:12:55', 'j4efvgvccc', 'false', '091234567890'),
(45, 'san', 'sam@gmail.com', '$2b$10$78uurnjUIzE8vfH4W.162.niq4ZK3b3WYEvsm5DMTBsjLDUa2K32e', 'san', '', 3, '2024-10-14 01:48:59', '2024-10-20 06:17:28', 'v7l31rxyox', 'false', '09218874343'),
(51, 'Lesde Makmak', 'lesdemakmak@gmail.com', '$2b$10$Z6KZ.lMADv8d01vkoVARWOnoR0mVo9GcLwi5O4boGCPmTd4sUWLgO', '', '', 2, '2024-10-20 04:31:07', '2024-10-20 06:17:53', '', 'false', ''),
(52, 'Pedro Pedro', 'cardosarichard222@gmail.com', '$2b$10$9.Um0SaaqJtlGjeIHFZY7uplj5ui5uMLqc7zqhL/5gXY0whQpMrFK', 'Pedro Pedro Pedro Pedro', '', NULL, '2024-10-20 13:59:47', '2024-10-20 13:59:47', 'v4riomqx5q', 'false', '09278658333'),
(53, 'Enter Fullname', 'enterfullname@gmail.com', '$2b$10$zCILmiPdvYYNBGijSGw2XOgG.dctEhoSNB9TvTHiJbyevc.TreFJi', '', '', 1, '2024-10-20 14:03:05', '2024-10-20 14:03:05', '', 'false', ''),
(54, 'chardgrey', 'cardosarichard@gmail.com', '$2b$10$hNkT3b45Eal.Ulwh1xSn1Owu4h/6nUyH/RqNAiaHi7ChKmKCG/2.2', 'Salawag Diamond Village Blk 10 Lot 4', '', 3, '2024-11-09 08:34:50', '2024-11-26 05:10:27', '6cu5v8n24a', 'true', '09278658322'),
(58, 'testtestest', 'testtestest@gmail.com', '$2b$10$v7au22SwNEpcOgr9WGWiHe2dgm5BJf0k9RF.XWfcT3taPTJZU57Se', 'testtestest', '', NULL, '2024-11-13 16:53:32', '2024-11-13 16:53:32', 'yv3jhlupu3', 'false', '09278658000'),
(59, 'Esspreso Shot', 'EsspresoShot@gmail.com', '$2b$10$UBXIpNFnfb5pkY9pWg4Tsea3S0atX38S7r2LSuwcUTPPbCcToI.Ym', 'Esspreso Shot', '', 1, '2024-11-13 16:56:06', '2024-11-13 16:56:06', 'fd9tzmw0b6', 'false', '09278655555'),
(60, 'test chat', 'testchat@gmail.com', '$2b$10$N8JzqdDJxXKozV5JTk2TyeTLpIV6sStKqQteOcHTMNcfhPziciZAy', 'test chat', '', 3, '2024-11-23 14:12:19', '2024-11-23 14:12:19', 'so1vhxfi9r', 'false', '09278658888'),
(61, 'test', 'test@usa.com', '$2b$10$nZE4Gdtpu.UCwpxzdx0vN.S8b8Kfd1.xMnG18x4T3UpPH9oa0KK.y', 'Blk p lot 4 DASMARINAS', '', 3, '2024-11-26 04:53:36', '2024-11-26 04:53:36', 'g8bs02nkap', 'false', '09278658888');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons`
--
ALTER TABLE `addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cart_owner` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `addons_id` (`addons`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_pages`
--
ALTER TABLE `cms_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount_codes`
--
ALTER TABLE `discount_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_category_id` (`category_id`);

--
-- Indexes for table `food_sizes`
--
ALTER TABLE `food_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_food_size` (`food_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ticket` (`ticket_id`),
  ADD KEY `fk_sender` (`sender_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `update_orderdate` (`order_id`),
  ADD KEY `Fk_user_id` (`customer_id`);

--
-- Indexes for table `orders_food`
--
ALTER TABLE `orders_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Order_id` (`order_id`),
  ADD KEY `FK_Foods_id` (`food_id`);

--
-- Indexes for table `order_addons`
--
ALTER TABLE `order_addons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addons_order` (`order_id`),
  ADD KEY `fk_addons_id` (`addon_id`);

--
-- Indexes for table `order_msg`
--
ALTER TABLE `order_msg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderId` (`order_id`),
  ADD KEY `fk_senderId` (`sender_id`);

--
-- Indexes for table `order_msg_id`
--
ALTER TABLE `order_msg_id`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`user_id`);

--
-- Indexes for table `riderstats`
--
ALTER TABLE `riderstats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_id` (`ticket_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=290;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `cms_pages`
--
ALTER TABLE `cms_pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `discount_codes`
--
ALTER TABLE `discount_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `food_sizes`
--
ALTER TABLE `food_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2081;

--
-- AUTO_INCREMENT for table `orders_food`
--
ALTER TABLE `orders_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `order_addons`
--
ALTER TABLE `order_addons`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_msg`
--
ALTER TABLE `order_msg`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `order_msg_id`
--
ALTER TABLE `order_msg_id`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riderstats`
--
ALTER TABLE `riderstats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_owner` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `food_id` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `FK_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `food_sizes`
--
ALTER TABLE `food_sizes`
  ADD CONSTRAINT `FK_food_size` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_sender` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `Fk_user_id` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `orders_food`
--
ALTER TABLE `orders_food`
  ADD CONSTRAINT `FK_Foods_id` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  ADD CONSTRAINT `FK_Order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `order_addons`
--
ALTER TABLE `order_addons`
  ADD CONSTRAINT `fk_addons_id` FOREIGN KEY (`addon_id`) REFERENCES `addons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_addons_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_msg`
--
ALTER TABLE `order_msg`
  ADD CONSTRAINT `fk_senderId` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_msg_id`
--
ALTER TABLE `order_msg_id`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `role_id` FOREIGN KEY (`role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
