-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 12:18 PM
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
  `category_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addons`
--

INSERT INTO `addons` (`id`, `name`, `price`, `category_id`) VALUES
(1, 'taengkambing', 59.00, 1),
(2, 'bilobilo', 79.00, 1),
(3, 'fruit salad', 39.00, 2),
(4, 'karton', 34.00, 3),
(5, 'cheesesabinimam', 59.00, 4),
(6, 'cheesesabinimam', 50.00, 5),
(7, 'test-bibingka', 79.00, 7),
(19, 'Cheese', 30.00, 34);

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
(19, 45, '2024-10-14 01:48:59', '2024-10-14 01:48:59');

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
  `addons` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `food_id`, `size`, `price`, `quantity`, `created_at`, `updated_at`, `addons`) VALUES
(109, 40, 18, 'Medium', 217.00, 1, '2024-09-21 12:23:10', '2024-09-21 12:23:10', 'taengkambing (₱59),cheesesabinimam (₱59),cheesesabinimam (₱50)'),
(110, 40, 20, 'Large', 109.00, 1, '2024-09-21 12:34:54', '2024-09-21 12:34:54', 'cheesesabinimam (₱50)');

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
(26, 'Refreshers', '', 'true', 'false');

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
(1, 'Business Name', 'Jayd\'s Cafe', '2024-08-26 03:24:36', '2024-08-31 06:36:10', 'Header'),
(2, 'About Us', 'Discover the perfect blend of flavors in every cup. From classic milk teas to unique creations, we’ve got something for everyone. Come sip, relax, and enjoy your favorite drink today!', '2024-08-26 03:24:51', '2024-10-12 03:24:46', 'About Us'),
(3, 'Location', 'https://www.google.com/maps/dir//Jayd\'s+Cafe+BLK+4,+Lot+1+Diamond+Ave+Dasmariñas,+4114+Cavite/@14.3466386,120.9810339,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397d51753ff9d15:0x1b2216c1440e07a9!2m2!1d120.9810339!2d14.3466386?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D', '2024-08-26 03:25:00', '2024-09-21 15:26:39', 'About Us'),
(4, 'Facebook', 'https://www.facebook.com/chard.cardosa/', '2024-08-26 08:18:13', '2024-08-30 22:55:31', 'footer'),
(5, 'Instagram', 'https://www.instagram.com/chardgrey/', '2024-08-26 08:20:23', '2024-08-30 22:55:36', 'footer'),
(6, 'Link', 'https://github.com/chardgrey', '2024-08-26 08:22:07', '2024-08-30 22:55:40', 'footer'),
(7, 'Phone Number', '099922292992', '2024-08-26 08:32:30', '2024-08-30 22:55:59', 'contact'),
(8, 'Tel Number', '83928988', '2024-08-26 08:33:35', '2024-08-30 22:56:03', 'contact'),
(9, 'Small Logo', '/images/jaydsCoffee2.svg', '2024-08-31 05:41:38', '2024-09-15 02:19:42', 'image'),
(10, 'Big Logo', '/images/jaydsCoffee.svg', '2024-08-31 12:59:23', '2024-09-15 02:19:37', 'image'),
(11, 'Milktea Price', '39 to 49 Pesos', '2024-08-31 23:20:15', '2024-08-31 23:20:15', 'Price'),
(12, 'Coffee Price', '49 to 69 Pesos', '2024-08-31 23:20:38', '2024-08-31 23:20:38', 'Price'),
(13, 'Snack Price', '39 to 59 Pesos', '2024-08-31 23:21:02', '2024-08-31 23:21:02', 'Price'),
(14, 'Store Image', '/images/content_1725147459433.png', '2024-08-31 23:32:07', '2024-08-31 23:37:39', 'image'),
(15, 'Operation hours', '10:00AM - 9:00PM', '2024-08-31 23:43:38', '2024-08-31 23:43:38', 'About Us'),
(16, 'Operation days', 'Monday - Sunday', '2024-08-31 23:44:02', '2024-08-31 23:44:02', 'About Us'),
(17, 'Review1', '/images/462534247_1771802123587897_6128529856494394845_n.png', '2024-10-11 16:50:21', '2024-10-11 16:50:21', 'Review'),
(18, 'Review2', '/images/462535634_1181343276303254_1691258288920020029_n.png', '2024-10-11 16:51:30', '2024-10-11 16:51:30', 'Review'),
(19, 'Review3', '/images/462538751_1066066354963335_9093822928369937838_n.png', '2024-10-11 16:51:51', '2024-10-11 16:51:51', 'Review'),
(20, 'Review4', '/images/', '2024-10-11 17:06:32', '2024-10-11 17:06:32', 'Review'),
(21, 'Review5', '/images/', '2024-10-11 17:06:36', '2024-10-11 17:06:36', 'Review'),
(22, 'Review6', '/images/', '2024-10-11 17:06:39', '2024-10-11 17:06:39', 'Review');

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
(17, 'Hot Americano', 'Hot Americano', '/images/Hot Americano.png', 2, 1),
(18, 'Hot Cappuccino', 'Hot Cappuccino', '/images/Hot Coffee/Hot Cappuccino 1.png', 2, 1),
(19, 'Hot Chocolate', 'Hot Chocolate', '/images/Hot Coffee/Hot Chocolate 1.png', 2, 1),
(20, 'Hot Coffee Latte', 'Hot Coffee Latte ', 'images/Hot Coffee/Hot Coffee Latte 1.png', 2, 1),
(21, 'Hot Thai Tea', 'Hot Thai Tea', 'images/Hot Coffee/Hot Thai Tea 1.png', 2, 1),
(22, 'Caramel Machiato', 'Caramel Machiato', 'images/Signature Drinks/Caramel Machiato 1.png', 1, 1),
(23, 'Caramel Mocha', 'Caramel Mocha', 'images/Signature Drinks/Caramel Mocha 1.png', 1, 1),
(24, 'Cloud Hazelnut', 'Cloud Hazelnut', 'images/Signature Drinks/cloud hazelnut 1.png', 1, 1),
(25, 'Cocoa Lava', 'Cocoa Lava', 'images/Signature Drinks/Cocoa Lava 1.png', 1, 1),
(26, 'Salted Caramel', 'Salted Caramel', 'images/Signature Drinks/Salted Caramel.png', 1, 1),
(27, 'Strawberry Milk', 'Strawberry Milk', 'images/Signature Drinks/Strawberry Milk 1.png', 1, 1),
(28, 'Black Coffee', 'Black Coffee', 'images/Iced Black Coffee/black coffee 1.png', 3, 1),
(29, 'Black Coffee with Cream', 'Black Coffee with Cream', 'images/Iced Black Coffee/Black Coffee with Cream 1.png', 3, 1),
(30, 'Biscoffee Latte', 'Biscoffee Latte', 'images/Iced Coffee Latte/Biscoffee Latte.png', 4, 1),
(31, 'Cappuccino', 'Cappuccino', 'images/Iced Coffee Latte/Cappuccino.png', 4, 1),
(32, 'Coffee Latte', 'Coffee Latte', 'images/Iced Coffee Latte/Coffee Latte.png', 4, 1),
(33, 'Hazelnut Latte', 'Hazelnut Latte', 'images/Iced Coffee Latte/Hazelnut Latte.png', 4, 1),
(34, 'Hot Chocolate', 'Hot Chocolate', 'images/Iced Coffee Latte/Hot Chocolate.png', 4, 1),
(35, 'Hot Thai Tea', 'Hot Thai Tea', 'images/Iced Coffee Latte/Hot Thai Tea.png', 4, 1),
(36, 'Matcha Latte', 'Matcha Latte', 'images/Iced Coffee Latte/Matcha Latte.png', 4, 1),
(37, 'Spanish Latte', 'Spanish Latte', 'images/Iced Coffee Latte/Spanish Latte.png', 4, 1),
(38, 'Caramel Ice Blended', 'Caramel Ice Blended', 'images/Iced Blended/Caramel Ice Blended.png', 5, 1),
(39, 'Cookies & Cream Ice Blended', 'Cookies & Cream Ice Blended', 'images/Iced Blended/Cookies & Cream Ice Blended.png', 5, 1),
(40, 'Java Chip Ice Blended', 'Java Chip Ice Blended', 'images/Iced Blended/Java Chip Ice Blended.png', 5, 1),
(41, 'Matcha Ice Blended', 'Matcha Ice Blended', 'images/Iced Blended/Matcha Ice Blended.png', 5, 1),
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
(131, 'Strawberry Soda', 'Strawberry Soda', '/images/Refreshers/Strawberry Soda.png', 26, 1);

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
(179, 19, 'small', 29.00, '2024-09-28 14:18:55', '2024-09-28 14:18:55');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `sender_id` int(11) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `ticket_id`, `sender_id`, `content`, `created_at`) VALUES
(3, '2krd4KJw', 31, 'test', '2024-10-16 14:02:03'),
(4, '2krd4KJw', 31, 'test', '2024-10-16 14:02:34'),
(5, 'FNz5twpd', 31, 'Testing', '2024-10-17 01:43:48'),
(6, 'h9UCY6NH', 31, 'Test', '2024-10-17 10:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(100) UNSIGNED NOT NULL,
  `customer_id` int(100) UNSIGNED NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('unpaid','paid','on process','on delivery','completed','cancelled') NOT NULL,
  `totalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `update_order_date`, `status`, `totalPrice`) VALUES
(1910, 31, '2024-09-23 07:38:22', '2024-10-11 16:33:11', 'completed', 400),
(1911, 31, '2024-09-23 07:40:12', '2024-10-11 16:33:11', 'paid', 400),
(1912, 31, '2024-09-23 07:47:01', '2024-10-11 16:33:11', 'completed', 400),
(1913, 31, '2024-09-23 09:28:04', '2024-10-11 16:33:11', 'completed', 100),
(1914, 31, '2024-09-23 10:05:35', '2024-10-11 16:33:11', 'completed', 100),
(1915, 31, '2024-09-23 17:46:49', '2024-10-11 16:33:11', 'completed', 296),
(1916, 31, '2024-09-25 15:03:41', '2024-10-11 16:33:11', 'completed', 1389),
(1917, 31, '2024-10-02 10:12:45', '2024-10-11 16:33:11', 'on delivery', 354),
(1918, 31, '2024-10-02 10:16:45', '2024-10-11 16:33:11', 'completed', 354),
(1919, 31, '2024-10-02 10:20:16', '2024-10-11 16:33:11', 'cancelled', 108),
(1920, 31, '2024-10-06 01:29:29', '2024-10-11 16:33:11', 'cancelled', 27),
(1921, 31, '2024-10-07 01:41:09', '2024-10-17 01:00:26', 'on delivery', 29),
(1922, 31, '2024-10-07 01:53:32', '2024-10-17 01:00:32', 'on delivery', 27),
(1923, 31, '2024-10-07 02:01:09', '2024-10-11 16:33:11', 'on process', 27),
(1924, 31, '2024-10-07 02:03:31', '2024-10-11 16:33:11', 'on process', 49),
(1925, 31, '2024-10-07 02:03:36', '2024-10-11 16:33:11', 'paid', 49),
(1926, 31, '2024-10-07 02:03:51', '2024-10-11 16:33:11', 'on process', 27),
(1927, 31, '2024-10-07 02:04:15', '2024-10-11 16:33:11', 'on process', 49),
(1928, 31, '2024-10-07 02:07:14', '2024-10-11 16:33:11', 'on process', 49),
(1929, 31, '2024-10-07 02:09:20', '2024-10-11 16:33:11', 'paid', 0),
(1930, 31, '2024-10-07 02:09:35', '2024-10-11 16:33:11', 'paid', 49),
(1931, 31, '2024-10-07 02:19:45', '2024-10-11 16:33:11', 'paid', 147),
(1932, 31, '2024-10-07 02:21:43', '2024-10-11 16:33:11', 'paid', 49),
(1933, 31, '2024-10-07 02:23:08', '2024-10-11 16:33:11', 'paid', 49),
(1934, 31, '2024-10-07 02:25:20', '2024-10-11 16:33:11', 'paid', 49),
(1935, 31, '2024-10-07 02:27:05', '2024-10-11 16:33:11', 'paid', 49),
(1936, 31, '2024-10-07 02:27:12', '2024-10-11 16:33:11', 'paid', 49),
(1937, 31, '2024-10-07 02:30:30', '2024-10-11 16:33:11', 'paid', 49),
(1938, 31, '2024-10-07 02:40:24', '2024-10-11 16:33:11', 'paid', 49),
(1939, 31, '2024-10-07 02:40:32', '2024-10-11 16:33:11', 'paid', 49),
(1940, 31, '2024-10-07 02:43:40', '2024-10-11 16:33:11', 'paid', 49),
(1941, 31, '2024-10-07 02:44:16', '2024-10-11 16:33:11', 'paid', 49),
(1942, 31, '2024-10-07 02:46:41', '2024-10-11 16:33:11', 'paid', 49),
(1943, 31, '2024-10-07 05:19:14', '2024-10-11 16:33:11', 'paid', 69),
(1944, 31, '2024-10-07 05:21:48', '2024-10-11 16:33:11', 'paid', 59),
(1945, 31, '2024-10-07 05:25:29', '2024-10-11 16:33:11', 'paid', 49),
(1946, 31, '2024-10-07 05:26:07', '2024-10-11 16:33:11', 'paid', 27),
(1947, 31, '2024-10-07 05:33:19', '2024-10-11 16:33:11', 'paid', 49),
(1948, 31, '2024-10-07 05:35:29', '2024-10-11 16:33:11', 'paid', 39),
(1949, 31, '2024-10-07 16:42:46', '2024-10-11 16:33:11', 'paid', 27),
(1950, 31, '2024-10-11 16:17:18', '2024-10-11 16:33:11', 'paid', 127);

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
  `addons` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_food`
--

INSERT INTO `orders_food` (`id`, `order_id`, `food_id`, `quantity`, `size`, `addons`) VALUES
(98, 1910, 20, 1, 'Medium', 'fruit salad (₱39),karton (₱34)'),
(99, 1912, 23, 2, 'Medium', 'bilobilo (₱79),karton (₱34),cheesesabinimam (₱50)'),
(100, 1913, 22, 1, 'Large', 'fruit salad (₱39),cheesesabinimam (₱59),test-bibingka (₱79)'),
(101, 1914, 19, 1, 'Medium', 'karton (₱34),cheesesabinimam (₱59),test-bibingka (₱79)'),
(102, 1915, 19, 2, 'Large', 'fruit salad (₱39),cheesesabinimam (₱50)'),
(103, 1916, 18, 4, 'Large', 'taengkambing (₱59),bilobilo (₱79)'),
(104, 1916, 18, 1, 'Medium', 'taengkambing (₱59),bilobilo (₱79)'),
(105, 1917, 54, 3, 'Medium', 'cheesesabinimam (₱59)'),
(106, 1918, 19, 3, 'Large', 'taengkambing (₱59)'),
(107, 1919, 18, 1, 'Medium', 'taengkambing (₱59)'),
(108, 1920, 18, 1, 'small', ''),
(109, 1921, 19, 1, 'small', ''),
(110, 1922, 18, 1, 'small', ''),
(111, 1923, 18, 1, 'small', ''),
(112, 1924, 20, 1, 'medium', ''),
(113, 1926, 18, 1, 'small', ''),
(114, 1927, 18, 1, 'medium', ''),
(115, 1928, 18, 1, 'medium', ''),
(116, 1930, 18, 1, 'medium', ''),
(117, 1931, 17, 1, 'medium', ''),
(118, 1931, 17, 1, 'medium', ''),
(119, 1931, 17, 1, 'medium', ''),
(120, 1932, 17, 1, 'medium', ''),
(121, 1933, 18, 1, 'medium', ''),
(122, 1934, 18, 1, 'medium', ''),
(123, 1935, 20, 1, 'medium', ''),
(124, 1937, 18, 1, 'medium', ''),
(125, 1938, 17, 1, 'medium', ''),
(126, 1940, 17, 1, 'medium', ''),
(127, 1941, 17, 1, 'medium', ''),
(128, 1942, 18, 1, 'medium', ''),
(129, 1943, 54, 1, 'large', ''),
(130, 1944, 17, 1, 'large', ''),
(131, 1945, 18, 1, 'medium', ''),
(132, 1946, 18, 1, 'small', ''),
(133, 1947, 18, 1, 'medium', ''),
(134, 1948, 26, 1, 'medium', ''),
(135, 1949, 18, 1, 'small', ''),
(136, 1950, 113, 1, 'medium', ''),
(137, 1950, 18, 1, 'medium', ''),
(138, 1950, 19, 1, 'medium', '');

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
(1, '2krd4KJw', 31, NULL, 'open', '2024-10-16 14:02:02', '2024-10-16 14:02:02'),
(2, 'FNz5twpd', 31, NULL, 'open', '2024-10-17 01:43:44', '2024-10-17 01:43:44'),
(3, 'h9UCY6NH', 31, NULL, 'open', '2024-10-17 10:15:06', '2024-10-17 10:15:06');

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
  `role` enum('user','admin','rider','cashier') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verification_token` varchar(255) NOT NULL,
  `verified` varchar(250) NOT NULL DEFAULT 'false',
  `pnum` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `address`, `role`, `created_at`, `updated_at`, `verification_token`, `verified`, `pnum`) VALUES
(29, 'chardsd', 'cilayap482@modotso.com', '$2b$10$/Zy8Kp69PUPEfsaEbUvdFuMl2Hes3J05Kjd3SSWEJE0b1eoaMOZ8G', 'hello 214sd', 'user', '2024-07-23 08:10:42', '2024-07-23 08:15:03', '49hl4jgopk', 'true', ''),
(30, 'dagangbukid', 'fobedo2401@reebsd.com', '$2b$10$LQfRgTYjqCoUngDsW9sQM.6lKfNq21fEMzVTh6ydb6Orj8uJqQxg.', 'DYAN LANG', 'user', '2024-07-23 08:20:10', '2024-07-23 08:20:10', 'cn0d0eco8k', 'false', ''),
(31, 'chardgrey', 'cardosarichard@gmail.com', '$2b$10$2CfKaulWCdIfErdXWtxDz.J5PC2CYidnxPHi2sWv822mG8lWKcdmu', 'Blk 99 Lot 99 Dasmarinas Cavite', 'user', '2024-07-24 05:20:33', '2024-10-11 16:41:30', '254kh7vd2k', 'true', '232324'),
(40, 'Pedro Penduko', 'jobatoc997@ofionk.com', '$2b$10$txPG8S9wWxyQKrWnVhhBd.ABarEi71skq8KM1IWayUX3bEj04cqiu', 'Salawag Diamond Village Blk 10 Lot 4', 'user', '2024-09-21 12:18:09', '2024-09-21 12:18:09', '27o4xjs1ts', 'false', '09278658355'),
(41, 'chardgrey', 'chardgrey@gmail.com', '$2b$10$5zsQK5v7BQW3WFcpLMBDveWzsV8e6EsUR7751.X3ZU2VhZ4pXcdle', 'Blk p lot 4 DASMARINAS', 'user', '2024-09-28 01:52:33', '2024-09-28 01:52:33', 'dolrv3tepi', 'false', '09278658355'),
(42, 'leklek', 'leklek@gmail.com', '$2b$10$YZg1R7JAiuRBIxbXuD/HF.Z.Y6fGM7cUPqyD94Zns1pyIEBWLf9K.', 'Blk p lot 4 DASMARINAS', 'admin', '2024-09-28 01:58:05', '2024-09-28 13:14:10', '0473le3c91', 'true', '09278658355'),
(43, 'tetetetest', 'tetetetest@gmail.com', '$2b$10$2hGDiB5Dhngk.xiEi958kuOhvTVH5NoRhFWU.MYR985VgbIcfQDpC', 'tetetetest', 'user', '2024-10-02 12:27:35', '2024-10-02 12:27:35', 'xdix8ijkbf', 'false', '09278658355'),
(44, 'binulzahan02', 'binulzahan02@gmail.com', '$2b$10$Z6eau.XVkvkqKX57pRmo0OhkCHYpEVGkEqSFVgMjGgTiWDmaLN32q', 'test', 'cashier', '2024-10-14 01:14:45', '2024-10-15 03:05:47', 'j4efvgvccc', 'false', '091234567890'),
(45, 'san', 'sam@gmail.com', '$2b$10$78uurnjUIzE8vfH4W.162.niq4ZK3b3WYEvsm5DMTBsjLDUa2K32e', 'san', 'user', '2024-10-14 01:48:59', '2024-10-14 01:48:59', 'v7l31rxyox', 'false', '09218874343');

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `cms_pages`
--
ALTER TABLE `cms_pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `food_sizes`
--
ALTER TABLE `food_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1951;

--
-- AUTO_INCREMENT for table `orders_food`
--
ALTER TABLE `orders_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `order_addons`
--
ALTER TABLE `order_addons`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
