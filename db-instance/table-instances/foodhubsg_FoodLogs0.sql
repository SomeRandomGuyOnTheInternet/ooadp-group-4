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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FoodLogs`
--

LOCK TABLES `FoodLogs` WRITE;
/*!40000 ALTER TABLE `FoodLogs` DISABLE KEYS */;
INSERT INTO `FoodLogs` VALUES (6,'Snacks','2019-07-05','2019-07-05 14:05:08','2019-07-05 14:05:08',4,5),(8,'Snacks','2019-07-05','2019-07-05 15:49:15','2019-07-05 15:49:15',4,3),(9,'Breakfast','2019-07-06','2019-07-06 01:24:17','2019-07-06 01:24:17',4,4),(10,'Breakfast','2019-07-04','2019-07-04 00:05:17','2019-07-04 00:05:17',4,3),(11,'Breakfast','2019-07-04','2019-07-04 00:05:25','2019-07-04 00:05:25',4,5),(12,'Breakfast','2019-07-05','2019-07-05 00:06:17','2019-07-05 00:06:17',4,1),(13,'Lunch','2019-07-04','2019-07-04 04:06:43','2019-07-04 04:06:43',4,7),(14,'Dinner','2019-07-04','2019-07-04 10:07:33','2019-07-04 10:07:33',4,6),(15,'Dinner','2019-07-05','2019-07-05 10:07:58','2019-07-05 10:07:58',4,5),(16,'Snacks','2019-07-09','2019-07-09 03:50:07','2019-07-09 03:50:07',4,1);
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

-- Dump completed on 2019-07-09 12:07:52
