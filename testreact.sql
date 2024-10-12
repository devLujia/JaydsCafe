-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2024 at 05:25 AM
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
(18, 43, '2024-10-02 12:27:35', '2024-10-02 12:27:35');

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
(110, 40, 20, 'Large', 109.00, 1, '2024-09-21 12:34:54', '2024-09-21 12:34:54', 'cheesesabinimam (₱50)'),
(163, 31, 19, 'medium', 49.00, 1, '2024-10-12 03:00:56', '2024-10-12 03:00:56', '');

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
(1, 'Coffee', 'image/expresso.png', 'true', 'false'),
(2, 'Milktea', 'image/milktea.png', 'true', 'false'),
(3, 'Fruit-tea', 'image/fruit.png', 'true', 'false'),
(4, 'Premium Cheesecake Milktea', 'image/milktea.png', 'true', 'false'),
(5, 'Non Coffee', 'image/milktea.png', 'true', 'false'),
(7, 'taengkambing', 'taengkambing.png', 'true', 'false'),
(26, 'zero', 'image_url_1725085405582.jpg', 'true', 'false'),
(34, 'Pasta', '', 'true', 'false');

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
(17, 'Vanilla', 'lorem ipsum', '/images/image_url_1727542253675.jpg', 1, 1),
(18, 'Caramel', 'lorem ipsum', '/images/image_url_1727540475176.jpg', 1, 1),
(19, 'Hazelnut', 'lorem ipsum', '/images/image_url_1727541643781.png', 1, 1),
(20, 'Butterscotch', 'lorem ipsum', 'images/americano.png', 1, 1),
(21, 'Mocha', 'lorem ipsum', 'images/americano.png', 1, 1),
(22, 'Salted Caramel', 'lorem ipsum', 'images/americano.png', 1, 1),
(23, 'White Chocolate', 'lorem ipsum', 'images/americano.png', 1, 1),
(24, 'Almond', 'lorem ipsum', 'images/americano.png', 1, 1),
(25, 'Winter Melon', 'lorem ipsum', 'images/americano.png', 2, 1),
(26, 'Okinawa', 'lorem ipsum', 'images/americano.png', 2, 1),
(27, 'Hokkaido', 'lorem ipsum', 'images/americano.png', 2, 1),
(28, 'Cookies & Cream', 'lorem ipsum', 'images/americano.png', 2, 1),
(29, 'Caramel', 'lorem ipsum', 'images/americano.png', 2, 1),
(30, 'Brown Sugar', 'lorem ipsum', 'images/americano.png', 2, 1),
(31, 'Taro', 'lorem ipsum', 'images/americano.png', 2, 1),
(32, 'Classic Milktea', 'lorem ipsum', 'images/americano.png', 2, 1),
(33, 'Red Velvet', 'lorem ipsum', 'images/americano.png', 2, 1),
(34, 'Matcha', 'lorem ipsum', 'images/americano.png', 2, 1),
(35, 'Dark Chocolate', 'lorem ipsum', 'images/americano.png', 2, 1),
(36, 'Lychee', 'lorem ipsum', 'images/americano.png', 3, 1),
(37, 'Mixed Berries', 'lorem ipsum', 'images/americano.png', 3, 1),
(38, 'Green Apple', 'lorem ipsum', 'images/americano.png', 3, 1),
(39, 'Strawberry', 'lorem ipsum', 'images/americano.png', 3, 1),
(40, 'Blueberry', 'lorem ipsum', 'images/americano.png', 3, 1),
(41, 'Passionfruit', 'lorem ipsum', 'images/americano.png', 3, 1),
(42, 'Melon', 'lorem ipsum', 'images/americano.png', 3, 1),
(43, 'Mango', 'lorem ipsum', 'images/americano.png', 3, 1),
(44, 'Matcha Latte', 'lorem ipsum', 'images/americano.png', 5, 1),
(45, 'Strawberry Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(46, 'Taro Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(47, 'Melon Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(48, 'Chocolate Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(49, 'Matcha Latte', 'lorem ipsum', 'images/americano.png', 5, 1),
(50, 'Strawberry Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(51, 'Taro Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(52, 'Melon Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(53, 'Chocolate Milk', 'lorem ipsum', 'images/americano.png', 5, 1),
(54, 'Pearl Milktea Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(55, 'Wintermelon Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(56, 'Red Velvet Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(57, 'Matcha Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(58, 'Dark Chocolate Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(59, 'Strawberry Cheesecake', 'lorem ipsum', 'images/americano.png', 4, 1),
(110, 'New Product', 'Product New', '', 5, 1),
(111, 'try', 'try', '/images/image_url_1726907822929.png', 7, 1),
(113, 'try lang ulet', 'braaaaat', '/images/image_url_1726908028723.png', 26, 1),
(114, 'ispagiti', 'Hehe', '/images/image_url_1727864602811.jpg', 34, 1);

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
(1, 17, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(2, 17, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(3, 18, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(4, 18, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(5, 19, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(6, 19, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(7, 20, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(8, 20, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(9, 21, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(10, 21, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(11, 22, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(12, 23, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(13, 24, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(14, 24, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(15, 25, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(16, 25, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(17, 26, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(18, 26, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(19, 27, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(20, 27, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(21, 28, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(22, 28, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(23, 29, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(24, 29, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(25, 30, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(26, 30, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(27, 31, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(28, 31, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(29, 32, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(30, 32, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(31, 33, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(32, 33, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(33, 34, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(34, 34, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(35, 35, 'medium', 39.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(36, 35, 'large', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(37, 36, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(38, 36, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(39, 37, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(40, 37, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(41, 38, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(42, 38, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(43, 39, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(44, 39, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(45, 40, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(46, 40, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(47, 41, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(48, 41, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(49, 42, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(50, 42, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(51, 43, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(52, 43, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(85, 44, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(86, 44, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(87, 45, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(88, 45, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(89, 46, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(90, 46, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(91, 47, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(92, 47, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(93, 48, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(94, 48, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(95, 49, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(96, 49, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(97, 50, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(98, 50, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(99, 51, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(100, 51, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(101, 52, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(102, 52, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(103, 53, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(104, 53, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(105, 54, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(106, 54, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(107, 55, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(108, 55, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(109, 56, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(110, 56, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(111, 57, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(112, 57, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(113, 58, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(114, 58, 'large', 69.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(115, 59, 'medium', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(117, 23, 'medium', 49.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(118, 22, 'large', 59.00, '2024-08-31 15:17:30', '2024-08-31 15:18:07'),
(149, 17, '', 20.00, '2024-08-31 15:37:30', '2024-09-28 16:50:37'),
(174, 110, 'medium', 29.00, '2024-09-21 08:35:40', '2024-09-21 08:36:08'),
(175, 111, 'medium', 0.00, '2024-09-21 08:37:02', '2024-09-21 08:37:02'),
(177, 113, 'medium', 29.00, '2024-09-21 08:40:28', '2024-09-21 08:40:28'),
(178, 18, 'small', 27.00, '2024-09-28 13:54:02', '2024-09-28 13:54:02'),
(179, 19, 'small', 29.00, '2024-09-28 14:18:55', '2024-09-28 14:18:55'),
(180, 114, 'medium', 15.00, '2024-10-02 10:23:22', '2024-10-02 10:23:22');

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
(1921, 31, '2024-10-07 01:41:09', '2024-10-11 16:33:11', 'on process', 29),
(1922, 31, '2024-10-07 01:53:32', '2024-10-11 16:33:11', 'on process', 27),
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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(100) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
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
(43, 'tetetetest', 'tetetetest@gmail.com', '$2b$10$2hGDiB5Dhngk.xiEi958kuOhvTVH5NoRhFWU.MYR985VgbIcfQDpC', 'tetetetest', 'user', '2024-10-02 12:27:35', '2024-10-02 12:27:35', 'xdix8ijkbf', 'false', '09278658355');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

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
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `food_sizes`
--
ALTER TABLE `food_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

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
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
