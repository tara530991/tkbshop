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
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detail` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT,
  `MEMBER_EMAIL` varchar(45) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `status` int(3) DEFAULT '1',
  `total` int(11) DEFAULT NULL,
  `buyer` varchar(10) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `receipt` int(3) DEFAULT '0',
  `invoiceTitle` varchar(45) DEFAULT NULL,
  `invoiceNumber` varchar(11) DEFAULT NULL,
  `payMethod` int(3) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,'44455@gmail.com','2018-05-16 11:32:57',1,760,'王圈圈','新北市淡水區',3,'','0',1),(7,'rrere@gmail.com','2018-05-16 15:51:46',1,450,'陳絲絲','台北市松山區',2,'台灣知識庫','0',1),(8,'hehe@gmail.com','2018-05-16 16:01:03',1,160,'蕭紅紅','新北市五股區',3,'','85274163',1),(9,'hehe@gmail.com','2018-05-16 16:15:23',1,160,'蕭綠綠','新北市深坑區',3,'','0',1),(10,'hehe@gmail.com','2018-05-16 16:17:58',1,230,'蕭綠綠','新北市五股區',3,'','0',1),(11,'ferer@gmail.com','2018-05-16 16:21:27',1,280,'許甜甜','新北市金山區',2,'','0',1);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-16 17:24:54
