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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
INSERT INTO `Shops` VALUES (1,'Misaka','61 Sengkang E Rd, Singapore - 545015',1.3914622,103.8927119,'Sengkang',4,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/misaka-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:47:02',3),(2,'The Bistro','1 Sengkang Square, Singapore - 545078',1.3915779,103.8947158,'Sengkang',3,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/thebistro-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:46:31',3),(3,'Grains','547 Ang Mo Kio Ave 10, Singapore - 560547',1.3743670,103.8574038,'Ang Mo Kio',4,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/grains-amk-image.jpg',0,1,'2019-07-12 09:42:37','2019-07-12 09:43:59',3),(4,'Lean Bento','36 Ang Mo Kio Hub #02-36, AMK - 569507',1.3700570,103.8484590,'Ang Mo Kio',2,'The blatantly correct choice.','/images/leanbento-amk-image.jpeg',0,0,'2019-07-12 09:42:37','2019-07-12 09:46:55',3),(5,'The Lawn','2 Ang Mo Kio Drive Blk A #01-10, Singapore - 567720',1.3777157,103.8552696,'Ang Mo Kio',NULL,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/thelawn-amk-image.jpeg',0,NULL,'2019-07-12 09:42:37','2019-07-12 09:47:23',3),(6,'The Warm Drum','649 Ang Mo Kio Ave 5, Block 649, Singapore - 560649',1.3776891,103.8440006,'Ang Mo Kio',3,'Fresh meat cuts are available.','/images/warmdrum-amk-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-22 10:49:39',3);
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

-- Dump completed on 2019-07-22 18:51:51
