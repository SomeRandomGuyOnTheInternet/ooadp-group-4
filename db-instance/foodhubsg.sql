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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodItems`
--

LOCK TABLES `FoodItems` WRITE;
/*!40000 ALTER TABLE `FoodItems` DISABLE KEYS */;
INSERT INTO `FoodItems` VALUES (1,'Aglio Olio','571',0,0,'/images/food-image-1.png','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(2,'Cesear Salad','346',0,1,'/images/food-image-2.png','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(3,'Cream of Mushroom Soup','207',0,1,'/images/food-image-8.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(4,'Chicken Rice','436',0,1,'/images/food-image-4.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(5,'Chicken Pulao','682',0,0,'/images/food-image-5.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(6,'Mixed Vegetable Rice','682',0,0,'/images/food-image-6.png','2019-07-12 09:42:37','2019-07-12 09:42:37',2),(7,'Chicken Fried Rice','768',1,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:47:02',1),(8,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',2),(9,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',4),(10,'Chicken Fried Rice','768',1,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:47:18',5),(11,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',6),(12,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',1),(13,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',2),(14,'Tandoori Chicken Salad','563',1,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:47:23',5),(15,'Tandoori Chicken Salad','563',1,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:55',4),(16,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodLogs`
--

LOCK TABLES `FoodLogs` WRITE;
/*!40000 ALTER TABLE `FoodLogs` DISABLE KEYS */;
INSERT INTO `FoodLogs` VALUES (6,'Snacks','2019-07-05','2019-07-05 14:05:08','2019-07-05 14:05:08',5,5),(8,'Snacks','2019-07-05','2019-07-05 15:49:15','2019-07-05 15:49:15',5,3),(9,'Breakfast','2019-07-06','2019-07-06 01:24:17','2019-07-06 01:24:17',5,4),(10,'Breakfast','2019-07-04','2019-07-04 00:05:17','2019-07-04 00:05:17',5,3),(11,'Breakfast','2019-07-04','2019-07-04 00:05:25','2019-07-04 00:05:25',5,5),(12,'Breakfast','2019-07-05','2019-07-05 00:06:17','2019-07-05 00:06:17',5,1),(13,'Lunch','2019-07-04','2019-07-04 04:06:43','2019-07-04 04:06:43',5,7),(14,'Dinner','2019-07-04','2019-07-04 10:07:33','2019-07-04 10:07:33',5,6),(15,'Dinner','2019-07-05','2019-07-05 10:07:58','2019-07-05 10:07:58',5,5),(16,'Snacks','2019-07-09','2019-07-09 03:50:07','2019-07-09 03:50:07',4,1),(17,'Dinner','2019-07-12','2019-07-12 10:05:13','2019-07-12 10:05:13',5,12),(19,'Dinner','2019-07-12','2019-07-12 10:09:06','2019-07-12 10:09:06',5,2);
/*!40000 ALTER TABLE `FoodLogs` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
INSERT INTO `Shops` VALUES (1,'Misaka','61 Sengkang E Rd, Singapore - 545015',1.3914622,103.8927119,'Sengkang',4,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/misaka-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:47:02',3),(2,'The Bistro','1 Sengkang Square, Singapore - 545078',1.3915779,103.8947158,'Sengkang',3,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/thebistro-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:46:31',3),(3,'Grains','547 Ang Mo Kio Ave 10, Singapore - 560547',1.3743670,103.8574038,'Ang Mo Kio',4,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/grains-amk-image.jpg',0,1,'2019-07-12 09:42:37','2019-07-12 09:43:59',3),(4,'Lean Bento','36 Ang Mo Kio Hub #02-36, AMK - 569507',1.3700570,103.8484590,'Ang Mo Kio',2,'The blatantly correct choice.','/images/leanbento-amk-image.jpeg',0,0,'2019-07-12 09:42:37','2019-07-12 09:46:55',3),(5,'The Lawn','2 Ang Mo Kio Drive Blk A #01-10, Singapore - 567720',1.3777157,103.8552696,'Ang Mo Kio',NULL,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/thelawn-amk-image.jpeg',0,NULL,'2019-07-12 09:42:37','2019-07-12 09:47:23',3),(6,'The Warm Drum','Block A, Nanyang Polytechnic, 180 Ang Mo Kio Avenue 8, Singapore - 569830',1.3797377,103.8495152,'Ang Mo Kio',3,'Fresh meat cuts are available.','/images/warmdrum-amk-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:46:31',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'User','user@mail.com',NULL,NULL,NULL,0,0,0,0,'$2a$10$JgDMXgbEoiJdzIn8pk11Zusq2E0p8aq3ccCoqyv9dgInOK3xGGYJ6',1.76,72,23.2,0,0,0,0,0,50,'a00001',0,'2019-07-12 09:42:37','2019-07-12 09:42:37'),(2,'Admin','admin@foodhubsg.com','Sengkang',1.3932249,103.8876897,0,1,0,0,'$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-12 09:43:02'),(3,'ABR Holdings','admin@abrholdings.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-12 09:42:37'),(4,'Koufu Group','admin@koufugrp.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$7P9teBo5FV/8gwU.Sa/Ll.q8qrU8AugdFyhNUD.5QT62/hsz4Sauy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:47:51','2019-07-12 09:47:51'),(5,'Some random guy','bala12rupesh@gmail.com','Sengkang',1.3932371,103.8877032,0,0,0,0,NULL,1.77,69,22,1456.5,474,192,568.25,222.25,150,'g1mpkm',4,'2019-07-12 09:48:14','2019-07-12 10:09:06');
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

-- Dump completed on 2019-07-12 18:10:09
