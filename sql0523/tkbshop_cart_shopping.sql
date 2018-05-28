-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tkbshop
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_shopping`
--

DROP TABLE IF EXISTS `cart_shopping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_shopping` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MEMBER_EMAIL` varchar(45) DEFAULT NULL,
  `PRODUCT_ID` int(11) DEFAULT NULL,
  `PRODUCT_AMOUNT` int(5) DEFAULT '1',
  `status` varchar(5) DEFAULT 'on',
  `addtime` datetime DEFAULT NULL,
  `lastchangetime` datetime DEFAULT NULL,
  `downtime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_shopping`
--

LOCK TABLES `cart_shopping` WRITE;
/*!40000 ALTER TABLE `cart_shopping` DISABLE KEYS */;
INSERT INTO `cart_shopping` VALUES (383,'44455@gmail.com',8,2,'check','2018-05-15 11:28:07','2018-05-21 11:31:12','2018-05-21 09:48:13'),(384,'44455@gmail.com',9,5,'down','2018-05-15 14:21:14','2018-05-21 11:00:32','2018-05-16 09:44:12'),(385,'44455@gmail.com',10,5,'check','2018-05-15 14:29:47','2018-05-21 11:31:17','2018-05-21 09:48:13'),(386,'44455@gmail.com',7,3,'check','2018-05-15 14:42:53','2018-05-21 13:47:50','2018-05-21 09:48:13'),(387,'44455@gmail.com',9,5,'down','2018-05-15 14:43:12','2018-05-21 11:00:32','2018-05-16 09:44:12'),(388,'rrere@gmail.com',8,3,'on','2018-05-16 13:42:09','2018-05-16 13:42:17',NULL),(389,'rrere@gmail.com',10,2,'on','2018-05-16 13:42:20','2018-05-16 13:42:22',NULL),(390,'hehe@gmail.com',9,6,'check','2018-05-16 16:00:16','2018-05-21 12:09:17',NULL),(391,'hehe@gmail.com',8,1,'check','2018-05-16 16:17:39',NULL,NULL),(392,'ferer@gmail.com',8,3,'down','2018-05-16 16:20:46','2018-05-21 12:23:43','2018-05-16 16:20:53'),(393,'ferer@gmail.com',9,2,'check','2018-05-16 16:20:49','2018-05-21 12:32:26','2018-05-16 16:21:27'),(394,'ferer@gmail.com',10,6,'check','2018-05-16 16:20:56','2018-05-21 12:23:46','2018-05-16 16:21:27'),(395,'sss@gmail.com',9,1,'on','2018-05-21 09:53:57',NULL,NULL),(396,'sss@gmail.com',7,3,'on','2018-05-21 09:54:00','2018-05-21 09:54:03',NULL),(397,'44455@gmail.com',9,5,'check','2018-05-21 10:11:52','2018-05-21 11:00:32','2018-05-21 10:56:12'),(398,'44455@gmail.com',10,5,'check','2018-05-21 10:11:54','2018-05-21 11:31:17','2018-05-21 10:56:12'),(399,'44455@gmail.com',9,5,'check','2018-05-21 11:00:29','2018-05-21 11:00:32','2018-05-21 11:00:48'),(400,'44455@gmail.com',7,3,'check','2018-05-21 11:00:35','2018-05-21 13:47:50','2018-05-21 11:00:48'),(401,'44455@gmail.com',7,3,'check','2018-05-21 11:02:36','2018-05-21 13:47:50','2018-05-21 11:02:53'),(402,'44455@gmail.com',10,5,'check','2018-05-21 11:02:38','2018-05-21 11:31:17','2018-05-21 11:02:53'),(403,'44455@gmail.com',8,2,'check','2018-05-21 11:02:40','2018-05-21 11:31:12','2018-05-21 11:02:53'),(404,'44455@gmail.com',8,2,'check','2018-05-21 11:28:46','2018-05-21 11:31:12','2018-05-21 11:29:05'),(405,'44455@gmail.com',10,5,'check','2018-05-21 11:28:48','2018-05-21 11:31:17','2018-05-21 11:29:05'),(406,'44455@gmail.com',7,3,'check','2018-05-21 11:31:05','2018-05-21 13:47:50','2018-05-21 13:48:23'),(407,'44455@gmail.com',10,5,'check','2018-05-21 11:31:07','2018-05-21 11:31:17','2018-05-21 13:48:23'),(408,'44455@gmail.com',8,2,'check','2018-05-21 11:31:09','2018-05-21 11:31:12','2018-05-21 13:48:23'),(409,'hehe@gmail.com',10,4,'check','2018-05-21 12:09:09','2018-05-21 12:09:20','2018-05-21 13:46:13'),(410,'hehe@gmail.com',7,5,'check','2018-05-21 12:09:12','2018-05-21 12:09:18','2018-05-21 13:46:13'),(411,'hehe@gmail.com',9,6,'check','2018-05-21 12:09:13','2018-05-21 12:09:17','2018-05-21 13:46:13'),(412,'ferer@gmail.com',8,3,'check','2018-05-21 12:23:39','2018-05-21 12:23:43','2018-05-21 12:24:08'),(413,'ferer@gmail.com',10,6,'check','2018-05-21 12:23:42','2018-05-21 12:23:46','2018-05-21 12:24:08'),(414,'ferer@gmail.com',7,3,'check','2018-05-21 12:32:21','2018-05-21 12:32:25','2018-05-21 12:32:49'),(415,'ferer@gmail.com',9,2,'check','2018-05-21 12:32:24','2018-05-21 12:32:26','2018-05-21 12:32:49'),(416,'tara530991@gmail.com',8,3,'check','2018-05-23 16:55:17','2018-05-23 17:20:25','2018-05-23 16:55:38'),(417,'tara530991@gmail.com',10,2,'check','2018-05-23 16:55:20','2018-05-23 17:20:30','2018-05-23 16:55:38'),(418,'tara530991@gmail.com',8,3,'check','2018-05-23 17:18:01','2018-05-23 17:20:25','2018-05-23 17:20:50'),(419,'tara530991@gmail.com',10,2,'check','2018-05-23 17:18:06','2018-05-23 17:20:30','2018-05-23 17:20:50'),(420,'tara530991@gmail.com',7,1,'check','2018-05-23 17:20:28',NULL,'2018-05-23 17:20:50');
/*!40000 ALTER TABLE `cart_shopping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-23 17:41:24
