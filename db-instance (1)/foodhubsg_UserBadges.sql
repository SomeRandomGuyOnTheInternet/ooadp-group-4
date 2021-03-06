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
-- Table structure for table `UserBadges`
--

DROP TABLE IF EXISTS `UserBadges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserBadges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `BadgeId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BadgeId` (`BadgeId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `userbadges_ibfk_1` FOREIGN KEY (`BadgeId`) REFERENCES `badges` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userbadges_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserBadges`
--

LOCK TABLES `UserBadges` WRITE;
/*!40000 ALTER TABLE `UserBadges` DISABLE KEYS */;
INSERT INTO `UserBadges` VALUES (1,'2019-07-12 09:46:31','2019-07-12 09:46:31',1,9),(2,'2019-07-12 09:46:31','2019-07-12 09:46:31',1,10),(3,'2019-07-22 10:37:27','2019-07-22 10:37:27',1,11),(4,'2019-08-03 07:58:23','2019-08-03 07:58:23',3,10),(5,'2019-07-26 00:59:37','2019-07-26 00:59:37',4,10),(8,'2019-08-04 04:35:07','2019-08-04 04:35:07',5,10),(9,'2019-08-04 04:35:07','2019-08-04 04:35:07',6,10),(10,'2019-08-04 04:35:07','2019-08-04 04:35:07',5,9);
/*!40000 ALTER TABLE `UserBadges` ENABLE KEYS */;
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
