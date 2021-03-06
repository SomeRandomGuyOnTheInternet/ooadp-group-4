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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodLogs`
--

LOCK TABLES `FoodLogs` WRITE;
/*!40000 ALTER TABLE `FoodLogs` DISABLE KEYS */;
INSERT INTO `FoodLogs` VALUES (1,'Snacks','2019-08-03','2019-08-03 07:58:23','2019-08-03 07:58:23',10,3),(2,'Breakfast','2019-07-26','2019-07-26 00:59:29','2019-07-26 00:59:29',10,8),(3,'Breakfast','2019-07-26','2019-07-26 00:59:37','2019-07-26 00:59:37',10,3),(4,'Breakfast','2019-07-27','2019-07-27 00:10:37','2019-07-26 00:59:37',10,1),(5,'Breakfast','2019-07-28','2019-07-28 00:22:37','2019-07-26 00:59:37',10,4),(6,'Breakfast','2019-07-29','2019-07-29 00:22:37','2019-07-26 00:59:37',10,6),(7,'Breakfast','2019-07-30','2019-07-30 00:36:37','2019-07-26 00:59:37',10,3),(8,'Breakfast','2019-07-31','2019-07-31 00:21:37','2019-07-26 00:59:37',10,8),(9,'Breakfast','2019-08-01','2019-08-01 00:56:37','2019-07-26 00:59:37',10,4),(10,'Breakfast','2019-08-02','2019-08-02 00:41:37','2019-07-26 00:59:37',10,9),(11,'Lunch','2019-07-26','2019-07-26 04:59:29','2019-07-26 04:59:29',10,5),(12,'Lunch','2019-07-27','2019-07-27 04:23:29','2019-07-26 04:59:29',10,1),(13,'Lunch','2019-07-28','2019-07-28 04:31:29','2019-07-26 04:59:29',10,8),(14,'Lunch','2019-07-30','2019-07-30 04:58:29','2019-07-26 04:59:29',10,9),(15,'Lunch','2019-07-31','2019-07-31 04:47:29','2019-08-04 08:37:17',10,3),(16,'Lunch','2019-08-02','2019-08-02 04:33:29','2019-07-26 04:59:29',10,4),(17,'Dinner','2019-07-26','2019-07-26 13:59:29','2019-07-26 04:59:29',10,2),(18,'Dinner','2019-07-28','2019-07-28 12:37:29','2019-08-04 08:37:05',10,2),(19,'Dinner','2019-07-29','2019-07-29 13:22:29','2019-07-26 04:59:29',10,11),(20,'Dinner','2019-07-31','2019-07-31 12:45:29','2019-07-26 04:59:29',10,13),(21,'Dinner','2019-08-01','2019-08-01 13:12:29','2019-07-26 04:59:29',10,2),(22,'Dinner','2019-08-02','2019-08-02 13:28:29','2019-07-26 04:59:29',10,6),(23,'Snacks','2019-08-04','2019-08-04 08:22:21','2019-08-04 08:22:21',10,1),(24,'Snacks','2019-08-04','2019-08-04 08:32:59','2019-08-04 08:32:59',10,5);
/*!40000 ALTER TABLE `FoodLogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-04 16:42:46
