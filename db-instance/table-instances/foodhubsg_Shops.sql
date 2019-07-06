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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-06 10:20:22
