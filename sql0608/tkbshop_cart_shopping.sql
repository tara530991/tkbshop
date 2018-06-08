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
) ENGINE=InnoDB AUTO_INCREMENT=515 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_shopping`
--

LOCK TABLES `cart_shopping` WRITE;
/*!40000 ALTER TABLE `cart_shopping` DISABLE KEYS */;
INSERT INTO `cart_shopping` VALUES (500,'sss@gmail.com',3,2,'check','2018-06-07 17:08:11','2018-06-07 17:13:53','2018-06-07 17:14:23'),(501,'sss@gmail.com',4,4,'down','2018-06-07 17:08:22','2018-06-07 17:13:54','2018-06-07 17:13:14'),(502,'sss@gmail.com',2,2,'down','2018-06-07 17:12:48','2018-06-07 17:12:54','2018-06-07 17:12:55'),(503,'sss@gmail.com',4,4,'check','2018-06-07 17:13:22','2018-06-07 17:13:54','2018-06-07 17:14:23'),(504,'sss@gmail.com',6,3,'check','2018-06-07 17:13:32','2018-06-07 17:14:01','2018-06-07 17:14:23'),(505,'rrere@gmail.com',6,7,'check','2018-06-07 17:24:30','2018-06-07 17:24:43','2018-06-07 17:25:02'),(506,'rrere@gmail.com',9,4,'check','2018-06-07 17:24:38','2018-06-07 17:24:45','2018-06-07 17:25:02'),(507,NULL,2,5,'on','2018-06-08 15:10:04',NULL,NULL),(508,'rrere@gmail.com',2,5,'on','2018-06-08 15:10:48',NULL,NULL),(509,'44455@gmail.com',1,5,'check','2018-06-08 15:58:34',NULL,'2018-06-08 15:59:18'),(510,'44455@gmail.com',6,1,'check','2018-06-08 15:58:59',NULL,'2018-06-08 15:59:18'),(511,'44455@gmail.com',3,1,'check','2018-06-08 16:00:48',NULL,'2018-06-08 16:01:15'),(512,'44455@gmail.com',4,5,'check','2018-06-08 16:00:53','2018-06-08 16:00:57','2018-06-08 16:01:15'),(513,NULL,2,5,'on','2018-06-08 16:36:25',NULL,NULL),(514,'44455@gmail.com',2,5,'check','2018-06-08 16:36:55',NULL,'2018-06-08 16:40:30');
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

-- Dump completed on 2018-06-08 18:21:56
