-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: foodhubsg
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isVendor` tinyint(1) DEFAULT NULL,
  `isBanned` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `bmi` float DEFAULT NULL,
  `averageCalories` float DEFAULT NULL,
  `averageBreakfastCalories` float DEFAULT NULL,
  `averageLunchCalories` float DEFAULT NULL,
  `averageDinnerCalories` float DEFAULT NULL,
  `averageSnacksCalories` float DEFAULT NULL,
  `gainedPoints` float DEFAULT NULL,
  `refCode` varchar(255) DEFAULT NULL,
  `daysActive` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Some Random Guy','bala12rupesh@gmail.com','Sengkang',1.3932438,103.8877164,0,0,0,0,NULL,1.76,70,22.6,1137.4,379.2,153.6,385.4,219.2,150,'rs6ohg',5,'2019-07-18 15:34:22','2019-07-18 15:37:44'),(2,'Admin','admin@foodhubsg.com','Sengkang',1.3932556,103.8877167,0,1,0,0,'$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-18 15:21:21'),(3,'ABR Holdings','admin@abrholdings.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-12 09:42:37'),(5,'Koufu Group','admin@koufugrp.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$7P9teBo5FV/8gwU.Sa/Ll.q8qrU8AugdFyhNUD.5QT62/hsz4Sauy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:47:51','2019-07-12 09:47:51'),(7,'User','user@mail.com','Sengkang',1.3932628,103.8877205,NULL,0,0,0,'$2a$10$OhXLZJnTpFc5wH/2Qvqe1ONy7WiOg0J/YkKMvnGBz4t1Amj1UlY2G',1.78,76,23.99,0,0,0,0,0,50,'a00001',0,'2019-07-18 15:25:29','2019-07-18 15:45:01');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-18 23:48:30
