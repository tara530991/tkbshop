-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: tkbshop
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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(20) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `stock` int(10) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `pic` varchar(45) DEFAULT NULL,
  `ident` varchar(10) DEFAULT NULL,
  `sort` int(5) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `addtime` date DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (7,'可頌',10,50,'香酥可口','pic01-1527730586074.jpg','AA0002',1,'麵包','2018-05-31'),(8,'紅豆麵包',25,23,'甜而不膩','pic02-1527734041525.jpg','AA0006',6,'麵包','2018-05-31'),(9,'紅絲絨/片',100,12,'高貴不貴','pic21-1527736926518.jpg','BB0001',3,'蛋糕','2018-05-31'),(10,'巧克力瑪芬',23,14,'小巧玲瓏','pic08-1527739988002.jpg','BB0002',4,'蛋糕','2018-05-31'),(11,'水果瑞士捲',280,3,'多樣水果','pic16-1527740273074.jpg','CC0003',3,'蛋糕','2018-05-31'),(12,'藍莓酥皮千層',35,7,'酥脆爽口','pic13-1527755531042.jpg','AA0003',8,'麵包','2018-05-31'),(13,'爆漿布朗尼',60,9,'戀愛滋味','pic14-1527755706745.jpg','AA0004',4,'蛋糕','2018-05-31'),(14,'雜糧麵包',42,16,'健康五穀','pic19-1527832711521.jpg','AA0004',2,'麵包','2018-06-01');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-04  1:20:21
