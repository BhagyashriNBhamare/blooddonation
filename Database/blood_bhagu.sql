-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: blood
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bhagu`
--

DROP TABLE IF EXISTS `bhagu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bhagu` (
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `phoneno` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `blood` varchar(100) DEFAULT NULL,
  `rh` varchar(100) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `dobc` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bhagu`
--

LOCK TABLES `bhagu` WRITE;
/*!40000 ALTER TABLE `bhagu` DISABLE KEYS */;
INSERT INTO `bhagu` VALUES ('Bhagyashri','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.bhagyashri1999@gmail.com','1','A','0','28','2020-10-16',1),('snehal','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.bhagyashri1999@gmail.com','1','B','0','28','2020-10-15',2),('sandhya','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.bhagyashri1999@gmail.com','1','B','0','20','2020-10-21',3),('tanvi','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.7791@gmail.com','1','AB','0','28','2020-10-16',4),('sandhya','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.7791@gmail.com','1','AB','0','30','2020-10-13',5),('sandhya','Bhamare','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','07249504830','bhamare.7791@gmail.com','1','AB','0','30','2020-10-13',6),('arpit','dhuya','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','thane','1234569845','bhamare.bhagyashri1999@gmail.com','0','A','0','28','2020-10-15',7),('suarbh','fuhjy','Plot No 121, Pandurang Apt, Kansai Section, Ambarnath East, Dist Thane','Ambarnath','1859504830','bhamare.bhagyashri1999@gmail.com','0','A','0','28','2020-10-22',8);
/*!40000 ALTER TABLE `bhagu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-07 20:50:15
