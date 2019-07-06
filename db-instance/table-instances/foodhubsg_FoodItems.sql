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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-06 10:20:22
