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
  `deletetime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=388 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_shopping`
--

LOCK TABLES `cart_shopping` WRITE;
/*!40000 ALTER TABLE `cart_shopping` DISABLE KEYS */;
INSERT INTO `cart_shopping` VALUES (383,'44455@gmail.com',8,5,'on','2018-05-15 11:28:07','2018-05-15 14:36:00',NULL),(384,'44455@gmail.com',9,2,'down','2018-05-15 14:21:14','2018-05-15 14:35:46','2018-05-15 14:40:57'),(385,'44455@gmail.com',10,3,'on','2018-05-15 14:29:47','2018-05-15 14:30:17',NULL),(386,'44455@gmail.com',7,1,'on','2018-05-15 14:42:53',NULL,NULL),(387,'44455@gmail.com',9,1,'on','2018-05-15 14:43:12',NULL,NULL);
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

-- Dump completed on 2018-05-15 17:41:42
