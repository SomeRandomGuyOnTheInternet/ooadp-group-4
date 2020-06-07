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
-- Insert Statements
--
-- ------------------------------------------------------
--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
TRUNCATE `Users`;
INSERT INTO `Users` VALUES (2,'Admin','admin@foodhubsg.com','Ang Mo Kio',1.3803703,103.8495440,0,1,0,0,'$2a$10$wQZ8DoV.HcnEBsks4mrIZO5bauhynH.puDtMCbH1axpDV71htRQM2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-22 10:49:12'),(3,'ABR Holdings','admin@abrholdings.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$1ZxU3n6AqWrAlOeuFkxLYOsUpnMTcu4BAlu4AANCFSoyJJLi7kBo2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:42:37','2019-07-12 09:42:37'),(5,'Koufu Group','admin@koufugrp.com',NULL,NULL,NULL,0,0,1,0,'$2a$10$7P9teBo5FV/8gwU.Sa/Ll.q8qrU8AugdFyhNUD.5QT62/hsz4Sauy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2019-07-12 09:47:51','2019-07-12 09:47:51'),(9,'John Doe','user@mail.com','Sengkang',1.3932262,103.8877732,0,0,0,0,'$2a$10$nxhEeV37Lh9Txf.qR5NSm.fjOD.9qYJEgCmCwTwILVM8lQl55PIuu',1.69,60,21.01,0,0,0,0,0,50,'a00001',0,'2019-07-21 04:06:49','2019-08-04 08:39:33'),(10,'Some Random Guy','bala12rupesh@gmail.com','Sengkang',1.3932110,103.8878165,0,0,0,0,NULL,1.76,70,22.6,1278.6,484.3,343.2,305.1,146,1050,'a00002',10,'2019-07-21 04:07:35','2019-08-04 08:37:17');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
TRUNCATE `Shops`;
INSERT INTO `Shops` VALUES (1,'Misaka','61 Sengkang E Rd, Singapore - 545015',1.3914622,103.8927119,'Sengkang',4,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/misaka-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:47:02',3),(2,'The Bistro','1 Sengkang Square, Singapore - 545078',1.3915779,103.8947158,'Sengkang',3,'Sandwiches & salads made to order, right in front of you, down to your specifications, with the use of a variety of ingredients','/images/thebistro-sengkang-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-12 09:46:31',3),(3,'Grains','547 Ang Mo Kio Ave 10, Singapore - 560547',1.3743670,103.8574038,'Ang Mo Kio',4,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/grains-amk-image.jpg',0,1,'2019-07-12 09:42:37','2019-07-12 09:43:59',3),(4,'Lean Bento','36 Ang Mo Kio Hub #02-36, AMK - 569507',1.3700570,103.8484590,'Ang Mo Kio',2,'The blatantly correct choice.','/images/leanbento-amk-image.jpeg',0,0,'2019-07-12 09:42:37','2019-07-12 09:46:55',3),(5,'The Lawn','2 Ang Mo Kio Drive Blk A #01-10, Singapore - 567720',1.3777157,103.8552696,'Ang Mo Kio',NULL,'Ensuring that better food, prepared from whole, unprocessed ingredients is accessible to everyone.','/images/thelawn-amk-image.jpeg',0,NULL,'2019-07-12 09:42:37','2019-07-12 09:47:23',3),(6,'The Warm Drum','649 Ang Mo Kio Ave 5, Block 649, Singapore - 560649',1.3776891,103.8440006,'Ang Mo Kio',3,'Fresh meat cuts are available.','/images/warmdrum-amk-image.jpeg',0,1,'2019-07-12 09:42:37','2019-07-22 10:49:39',3);
/*!40000 ALTER TABLE `Shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `FoodItems`
--

LOCK TABLES `FoodItems` WRITE;
/*!40000 ALTER TABLE `FoodItems` DISABLE KEYS */;
INSERT INTO `FoodItems` VALUES (1,'Aglio Olio','571',0,0,'/images/food-image-1.png','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(2,'Cesear Salad','346',0,1,'/images/food-image-2.png','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(3,'Cream of Mushroom Soup','207',0,1,'/images/food-image-8.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(4,'Chicken Rice','436',0,1,'/images/food-image-4.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(5,'Chicken Pulao','682',0,0,'/images/food-image-5.jpg','2019-07-12 09:42:37','2019-07-12 09:42:37',3),(6,'Mixed Vegetable Rice','682',0,0,'/images/food-image-6.png','2019-07-12 09:42:37','2019-07-12 09:42:37',2),(8,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',2),(9,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',4),(10,'Chicken Fried Rice','768',1,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:47:18',5),(11,'Chicken Fried Rice','768',0,0,'/uploads/2/2-1562924730755.png','2019-07-12 09:45:50','2019-07-12 09:45:50',6),(12,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',1),(13,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',2),(14,'Tandoori Chicken Salad','563',1,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:47:23',5),(15,'Tandoori Chicken Salad','563',1,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:55',4),(16,'Tandoori Chicken Salad','563',0,0,'/uploads/2/2-1562924783457.jpg','2019-07-12 09:46:31','2019-07-12 09:46:31',6);
/*!40000 ALTER TABLE `FoodItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `FoodLogs`
--

LOCK TABLES `FoodLogs` WRITE;
/*!40000 ALTER TABLE `FoodLogs` DISABLE KEYS */;
INSERT INTO `FoodLogs` VALUES (1,'Snacks','2019-08-03','2019-08-03 07:58:23','2019-08-03 07:58:23',10,3),(2,'Breakfast','2019-07-26','2019-07-26 00:59:29','2019-07-26 00:59:29',10,8),(3,'Breakfast','2019-07-26','2019-07-26 00:59:37','2019-07-26 00:59:37',10,3),(4,'Breakfast','2019-07-27','2019-07-27 00:10:37','2019-07-26 00:59:37',10,1),(5,'Breakfast','2019-07-28','2019-07-28 00:22:37','2019-07-26 00:59:37',10,4),(6,'Breakfast','2019-07-29','2019-07-29 00:22:37','2019-07-26 00:59:37',10,6),(7,'Breakfast','2019-07-30','2019-07-30 00:36:37','2019-07-26 00:59:37',10,3),(8,'Breakfast','2019-07-31','2019-07-31 00:21:37','2019-07-26 00:59:37',10,8),(9,'Breakfast','2019-08-01','2019-08-01 00:56:37','2019-07-26 00:59:37',10,4),(10,'Breakfast','2019-08-02','2019-08-02 00:41:37','2019-07-26 00:59:37',10,9),(11,'Lunch','2019-07-26','2019-07-26 04:59:29','2019-07-26 04:59:29',10,5),(12,'Lunch','2019-07-27','2019-07-27 04:23:29','2019-07-26 04:59:29',10,1),(13,'Lunch','2019-07-28','2019-07-28 04:31:29','2019-07-26 04:59:29',10,8),(14,'Lunch','2019-07-30','2019-07-30 04:58:29','2019-07-26 04:59:29',10,9),(15,'Lunch','2019-07-31','2019-07-31 04:47:29','2019-08-04 08:37:17',10,3),(16,'Lunch','2019-08-02','2019-08-02 04:33:29','2019-07-26 04:59:29',10,4),(17,'Dinner','2019-07-26','2019-07-26 13:59:29','2019-07-26 04:59:29',10,2),(18,'Dinner','2019-07-28','2019-07-28 12:37:29','2019-08-04 08:37:05',10,2),(19,'Dinner','2019-07-29','2019-07-29 13:22:29','2019-07-26 04:59:29',10,11),(20,'Dinner','2019-07-31','2019-07-31 12:45:29','2019-07-26 04:59:29',10,13),(21,'Dinner','2019-08-01','2019-08-01 13:12:29','2019-07-26 04:59:29',10,2),(22,'Dinner','2019-08-02','2019-08-02 13:28:29','2019-07-26 04:59:29',10,6),(23,'Snacks','2019-08-04','2019-08-04 08:22:21','2019-08-04 08:22:21',10,1),(24,'Snacks','2019-08-04','2019-08-04 08:32:59','2019-08-04 08:32:59',10,5);
/*!40000 ALTER TABLE `FoodLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `UserActions`
--

LOCK TABLES `UserActions` WRITE;
/*!40000 ALTER TABLE `UserActions` DISABLE KEYS */;
TRUNCATE `UserActions`;
INSERT INTO `UserActions` VALUES (1,'gained 100 points','adding a food item below 500 calories to your log','positive','Keep it up!',NULL,1,NULL,NULL,'2019-08-03 07:58:23','2019-08-03 07:58:25',10),(2,'earned the Baby Steps badge','adding your first recommended food item','positive','You can view this badge on your page.',NULL,1,NULL,NULL,'2019-08-03 07:58:23','2019-08-03 07:58:25',10),(3,'gained 100 points','adding a food item below 500 calories to your log','positive','Keep it up!',NULL,1,NULL,NULL,'2019-07-26 00:59:37','2019-07-26 00:59:38',10),(4,'earned the High Roller badge','obtaining more than 1000 points','positive','You can view this badge on your page.',NULL,1,NULL,NULL,'2019-07-26 00:59:37','2019-07-26 00:59:38',10);
/*!40000 ALTER TABLE `UserActions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `UserBadges`
--

LOCK TABLES `UserBadges` WRITE;
/*!40000 ALTER TABLE `UserBadges` DISABLE KEYS */;
TRUNCATE `UserBadges`;
INSERT INTO `UserBadges` VALUES (1,'2019-07-12 09:46:31','2019-07-12 09:46:31',1,9),(2,'2019-07-12 09:46:31','2019-07-12 09:46:31',1,10),(3,'2019-07-22 10:37:27','2019-07-22 10:37:27',1,11),(4,'2019-08-03 07:58:23','2019-08-03 07:58:23',3,10),(5,'2019-07-26 00:59:37','2019-07-26 00:59:37',4,10),(8,'2019-08-04 04:35:07','2019-08-04 04:35:07',5,10),(9,'2019-08-04 04:35:07','2019-08-04 04:35:07',6,10),(10,'2019-08-04 04:35:07','2019-08-04 04:35:07',5,9);
/*!40000 ALTER TABLE `UserBadges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Referrals`
--

LOCK TABLES `Referrals` WRITE;
/*!40000 ALTER TABLE `Referrals` DISABLE KEYS */;
TRUNCATE `Referrals`;
INSERT INTO `Referrals` VALUES (1,'a00001',0,'2019-07-30 10:01:21','2019-07-30 10:02:34',9,9),(2,'a00002',0,'2019-07-30 10:01:21','2019-07-30 10:02:34',10,10);
/*!40000 ALTER TABLE `Referrals` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-04 16:42:45
