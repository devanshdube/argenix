-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2026 at 07:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `argenix`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_request_logs`
--

CREATE TABLE `api_request_logs` (
  `id` bigint(20) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `endpoint` varchar(100) DEFAULT NULL,
  `request_count` int(11) DEFAULT 1,
  `window_start` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data_sources`
--

CREATE TABLE `data_sources` (
  `id` int(11) NOT NULL,
  `source_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_sources`
--

INSERT INTO `data_sources` (`id`, `source_name`, `description`, `is_active`, `created_at`) VALUES
(1, 'TEST_SOURCE', 'Manual testing source', 1, '2026-02-06 18:09:19');

-- --------------------------------------------------------

--
-- Table structure for table `realtime_data`
--

CREATE TABLE `realtime_data` (
  `id` bigint(20) NOT NULL,
  `source_id` int(11) NOT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`payload`)),
  `received_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `realtime_data`
--

INSERT INTO `realtime_data` (`id`, `source_id`, `event_type`, `payload`, `received_at`) VALUES
(2, 1, 'DATA_STREAM', '{\"temperature\":36.7,\"status\":\"OK\",\"sensor\":\"A1\"}', '2026-02-06 18:09:47'),
(3, 1, 'DATA_STREAM', '{\"temperature\":36.7,\"status\":\"OK\",\"sensor\":\"A1\"}', '2026-02-06 19:05:49'),
(4, 1, 'DATA_STREAM', '{\"temperature\":36.7,\"status\":\"DONE\",\"sensor\":\"A3\"}', '2026-02-07 05:26:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_request_logs`
--
ALTER TABLE `api_request_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ip_time` (`ip_address`,`window_start`);

--
-- Indexes for table `data_sources`
--
ALTER TABLE `data_sources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `realtime_data`
--
ALTER TABLE `realtime_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_received_at` (`received_at`),
  ADD KEY `idx_source_time` (`source_id`,`received_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_request_logs`
--
ALTER TABLE `api_request_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_sources`
--
ALTER TABLE `data_sources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `realtime_data`
--
ALTER TABLE `realtime_data`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `realtime_data`
--
ALTER TABLE `realtime_data`
  ADD CONSTRAINT `realtime_data_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES `data_sources` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
