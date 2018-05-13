-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2018 at 02:52 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psd_project`
--
CREATE DATABASE IF NOT EXISTS `psd_project` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `psd_project`;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `Country_Name` varchar(30) NOT NULL,
  `Capital_Name` varchar(30) NOT NULL,
  `Flag` varchar(20) NOT NULL,
  `Pos_Lati` varchar(8) NOT NULL,
  `Pos_Long` varchar(8) NOT NULL,
  `Area` float(15,2) NOT NULL,
  `Population` int(12) NOT NULL,
  `GPD` float(15,2) NOT NULL,
  `HDI` float(15,2) NOT NULL,
  `Gini` float(6,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`Country_Name`, `Capital_Name`, `Flag`, `Pos_Lati`, `Pos_Long`, `Area`, `Population`, `GPD`, `HDI`, `Gini`) VALUES
('Greece', 'Athens', 'tempFlag', '37 58 N', '23 43 E', 131.00, 10, 20.00, 0.87, 34.300);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Surname` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Gender` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `Name`, `Surname`, `Password`, `Gender`) VALUES
('marmpa@gmail.com', 'Marios', 'Bantolas', '22@@AA', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`Country_Name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
