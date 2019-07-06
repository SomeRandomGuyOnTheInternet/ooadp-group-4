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
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `refCode` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isVendor` tinyint(1) DEFAULT NULL,
  `isBanned` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'User','user@mail.com',1.78,74,NULL,NULL,NULL,'a00001',0,0,0,0,'$2a$10$JgDMXgbEoiJdzIn8pk11Zusq2E0p8aq3ccCoqyv9dgInOK3xGGYJ6','2019-07-03 07:55:36','2019-07-03 07:55:36'),(2,'Admin','admin@foodhubsg.com',NULL,NULL,'Sengkang',1.3932448,103.8876602,NULL,0,1,0,0,'$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2','2019-07-03 07:55:36','2019-07-06 02:13:55'),(3,'ABR Holdings','admin@abrholdings.com',NULL,NULL,'Ang Mo Kio',1.3798957,103.8493652,NULL,0,0,1,0,'$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2','2019-07-03 07:55:36','2019-07-06 01:25:17'),(4,'Some random guy','bala12rupesh@gmail.com',NULL,NULL,'Sengkang',1.3932448,103.8876602,'awj65u',NULL,0,0,0,NULL,'2019-07-04 09:22:07','2019-07-06 02:15:28'),(5,'Koufu Group','admin@koufugrp.com',NULL,NULL,'Sengkang',1.3932448,103.8876602,NULL,0,0,1,0,'$2a$10$6XIolrucdd8QMMo4Ip83tev5BV64HejVRqZ7xmoGodgSlVvRGExL2','2019-07-06 01:40:57','2019-07-06 02:14:10');
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

-- Dump completed on 2019-07-06 10:20:22
