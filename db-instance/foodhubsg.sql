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
-- Table structure for table `FoodItems`
--

DROP TABLE IF EXISTS `FoodItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `FoodItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `calories` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isRecommended` tinyint(1) DEFAULT NULL,
  `imageLocation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ShopId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ShopId` (`ShopId`),
  CONSTRAINT `fooditems_ibfk_1` FOREIGN KEY (`ShopId`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodItems`
--

LOCK TABLES `FoodItems` WRITE;
/*!40000 ALTER TABLE `FoodItems` DISABLE KEYS */;
INSERT INTO `FoodItems` VALUES (1,'Aglio Olio','571',0,0,'/images/food-image-1.png','2019-07-03 07:55:36','2019-07-06 01:59:26',3),(2,'Cesear Salad','346',0,1,'/images/food-image-2.png','2019-07-03 07:55:36','2019-07-06 01:59:26',3),(3,'Cream of Mushroom Soup','207',0,1,'/images/food-image-8.jpg','2019-07-03 07:55:36','2019-07-06 01:59:26',3),(4,'Chicken Rice','436',0,1,'/images/food-image-4.jpg','2019-07-03 07:55:36','2019-07-06 01:59:26',3),(5,'Chicken Pulao','682',0,0,'/images/food-image-5.jpg','2019-07-03 07:55:36','2019-07-06 01:59:26',3),(6,'Mixed Vegetable Rice','683',0,0,'/images/food-image-6.png','2019-07-03 07:55:36','2019-07-06 02:12:22',2),(7,'Waffle Waffle Waffle','624',0,0,'/images/nice-waffle.jpg','2019-07-04 09:55:10','2019-07-06 01:59:35',6);
/*!40000 ALTER TABLE `FoodItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FoodLogs`
--

DROP TABLE IF EXISTS `FoodLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `FoodLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mealType` varchar(255) DEFAULT NULL,
  `createdAtDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `FoodId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `FoodId` (`FoodId`),
  CONSTRAINT `foodlogs_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `foodlogs_ibfk_2` FOREIGN KEY (`FoodId`) REFERENCES `fooditems` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodLogs`
--

LOCK TABLES `FoodLogs` WRITE;
/*!40000 ALTER TABLE `FoodLogs` DISABLE KEYS */;
INSERT INTO `FoodLogs` VALUES (6,'Snacks','2019-07-05','2019-07-05 14:05:08','2019-07-05 14:05:08',4,5),(8,'Snacks','2019-07-05','2019-07-05 15:49:15','2019-07-05 15:49:15',4,3),(9,'Breakfast','2019-07-06','2019-07-06 01:24:17','2019-07-06 01:24:17',4,4),(10,'Breakfast','2019-07-04','2019-07-04 00:05:17','2019-07-04 00:05:17',4,3),(11,'Breakfast','2019-07-04','2019-07-04 00:05:25','2019-07-04 00:05:25',4,5),(12,'Breakfast','2019-07-05','2019-07-05 00:06:17','2019-07-05 00:06:17',4,1),(13,'Lunch','2019-07-04','2019-07-04 04:06:43','2019-07-04 04:06:43',4,7),(14,'Dinner','2019-07-04','2019-07-04 10:07:33','2019-07-04 10:07:33',4,6),(15,'Dinner','2019-07-05','2019-07-05 10:07:58','2019-07-05 10:07:58',4,5);
/*!40000 ALTER TABLE `FoodLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Questions`
--

DROP TABLE IF EXISTS `Questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `suggestion` varchar(255) DEFAULT NULL,
  `isAnswered` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Referrals`
--

DROP TABLE IF EXISTS `Referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Referrals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `friendRefCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Referrals`
--

LOCK TABLES `Referrals` WRITE;
/*!40000 ALTER TABLE `Referrals` DISABLE KEYS */;
/*!40000 ALTER TABLE `Referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('C2hUG6zFNRoQuj1thYTkmwObJ64N7Y54',1562380251,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":4}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shops`
--

DROP TABLE IF EXISTS `Shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `imageLocation` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isRecommended` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `VendorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `VendorId` (`VendorId`),
  CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`VendorId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
INSERT INTO `Shops` VALUES (1,'Misaka','241 Compassvale Walk, Singapore - 540241',1.3904218,103.8979047,'Sengkang',NULL,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/misaka-sengkang-image.jpeg',0,0,'2019-07-03 07:55:36','2019-07-06 02:00:49',3),(2,'The Bistro','1 Sengkang Square #02-336, Sengkang - 545078',1.3912990,103.8936000,'Sengkang',3,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/thebistro-sengkang-image.jpeg',0,1,'2019-07-03 07:55:36','2019-07-06 02:12:22',3),(3,'Grains','549 Ang Mo Kio Ave 10, Block 549, Singapore 560549',1.3732194,103.8573824,'Ang Mo Kio',4,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/grains-amk-image.jpg',0,1,'2019-07-03 07:55:36','2019-07-06 02:00:26',3),(4,'Lean Bento','36 Ang Mo Kio Hub #02-36, AMK - 569507',1.3700570,103.8484590,'Ang Mo Kio',3,'The blatantly correct choice.','/images/leanbento-amk-image.jpeg',0,1,'2019-07-03 07:55:36','2019-07-06 01:59:29',3),(5,'The Lawn','180 Ang Mo Kio Avenue 8, Ang Mo Kio Ave 8, Block A - Campus Centre, Singapore - 569830',1.3801290,103.8490254,'Ang Mo Kio',NULL,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/thelawn-amk-image.jpeg',0,0,'2019-07-03 07:55:36','2019-07-06 02:01:22',3),(6,'The Warm Drum','26 Ang Mo Kio Industrial Park 2 #01-38, AMK - 569507',1.3737420,103.8634520,'Ang Mo Kio',NULL,'Fresh meat cuts are available.','/images/warmdrum-amk-image.jpeg',0,NULL,'2019-07-03 07:55:36','2019-07-06 01:59:35',3),(7,'Appachi Banana Leaf','638 Ang Mo Kio Ave 6, Block 638, Singapore - 560638',1.3807023,103.8431916,'Ang Mo Kio',NULL,'This is one of the best restaurants to ever grace the Earth.','/images/deafult-shop-image.jpeg',0,0,'2019-07-06 01:50:58','2019-07-06 01:59:42',5);
/*!40000 ALTER TABLE `Shops` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2019-07-06 10:22:45
