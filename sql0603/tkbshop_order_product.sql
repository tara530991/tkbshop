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
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_product` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(20) NOT NULL,
  `product_id` int(10) DEFAULT NULL,
  `amount` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`,`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (3,'L201805210004',9,1),(4,'M201805210001',7,10),(5,'M201805210001',8,2),(6,'M201805210001',10,5),(7,'M201805210002',8,3),(9,'M201805210003',8,3),(11,'M201805210004',7,5),(12,'M201805210004',9,6),(13,'M201805210004',10,4),(14,'M201805210005',8,3),(15,'M201805210005',10,6),(16,'M201805210006',7,3),(17,'M201805210006',9,2),(18,'N201805210001',7,5),(19,'N201805210001',9,6),(20,'N201805210001',10,4),(21,'N201805210002',7,3),(22,'N201805210002',8,2),(23,'N201805210002',10,5),(24,'Q201805230001',10,5),(25,'R201805230001',10,2),(26,'Q201805240001',10,1),(27,'Q201805240002',9,4),(28,'Q201805240003',10,1),(29,'R201805240001',10,4),(30,'R201805240003',9,1),(31,'I201805250002',NULL,NULL),(32,'I201805250003',NULL,NULL),(33,'J201805250001',10,4),(34,'J201805250002',8,3),(35,'J201805250002',10,2),(36,'J201805250003',7,4),(37,'J201805250003',9,2),(38,'K201805250001',7,1),(39,'K201805250001',8,1),(40,'K201805250002',8,1),(41,'K201805250002',9,3),(42,'K201805250003',7,2),(43,'K201805250003',9,2),(44,'K201805250004',7,1),(45,'K201805250004',10,1),(46,'K201805250005',1,1),(47,'K201805250005',0,NULL),(48,'K201805250006',9,5),(49,'K201805250007',7,2),(50,'K201805250007',8,1),(51,'K201805250007',10,1),(52,'K201805250008',7,1),(53,'K201805250009',7,1),(54,'L201805250001',8,3),(55,'L201805250001',10,3),(56,'L201805250002',8,1),(57,'L201805250002',10,1),(58,'L201805250003',7,1),(59,'L201805250003',10,1);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-04  1:20:22
