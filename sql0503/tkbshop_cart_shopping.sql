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
  `PRODUCT_ID` int(11) DEFAULT NULL,
  `PRODUCT_AMOUNT` varchar(5) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_shopping`
--

LOCK TABLES `cart_shopping` WRITE;
/*!40000 ALTER TABLE `cart_shopping` DISABLE KEYS */;
INSERT INTO `cart_shopping` VALUES (1,9,'1'),(2,9,'1'),(3,9,'1'),(4,9,'1'),(5,8,'1'),(6,8,'1'),(7,8,'1'),(8,9,'1'),(9,7,'1'),(10,7,'1'),(11,10,'1'),(12,9,'1'),(13,9,'1'),(14,9,'1'),(15,9,'1'),(16,9,'1'),(17,9,'1'),(18,9,'1'),(19,9,'1'),(20,9,'1'),(21,9,'1'),(22,9,'1'),(23,9,'1'),(24,9,'1'),(25,9,'1'),(26,9,'1'),(27,9,'1'),(28,9,'1'),(29,9,'1'),(30,9,'1'),(31,9,'1'),(32,9,'1'),(33,9,'1'),(34,9,'1'),(35,9,'1'),(36,9,'1'),(37,9,'1'),(38,9,'1'),(39,9,'1'),(40,9,'1'),(41,9,'1'),(42,9,'1'),(43,9,'1'),(44,9,'1'),(45,9,'1'),(46,9,'1'),(47,9,'1'),(48,7,'1'),(49,9,'1'),(50,9,'1'),(51,10,'1'),(52,10,'1'),(53,8,'1'),(54,8,'1'),(55,7,'1'),(56,7,'1'),(57,7,'1'),(58,7,'1'),(59,7,'1'),(60,7,'1'),(61,7,'1'),(62,7,'1'),(63,7,'1'),(64,7,'1'),(65,10,'1'),(66,10,'1'),(67,7,'1'),(68,8,'1'),(69,9,'1'),(70,8,'1'),(71,8,'1'),(72,9,'1'),(73,9,'1'),(74,9,'1'),(75,9,'1'),(76,9,'1'),(77,7,'1'),(78,9,'1'),(79,9,'1'),(80,9,'1'),(81,9,'1'),(82,8,'1'),(83,7,'1'),(84,7,'1'),(85,9,'1'),(86,7,'1'),(87,7,'1'),(88,7,'1'),(89,7,'1'),(90,7,'1'),(91,8,'1'),(92,7,'1'),(93,7,'1'),(94,7,'1'),(95,7,'1'),(96,7,'1'),(97,7,'1'),(98,7,'1'),(99,7,'1'),(100,7,'1'),(101,7,'1'),(102,7,'1'),(103,7,'1'),(104,7,'1'),(105,7,'1'),(106,7,'1'),(107,7,'1'),(108,7,'1'),(109,7,'1'),(110,7,'1'),(111,7,'1'),(112,7,'1'),(113,7,'1'),(114,7,'1'),(115,7,'1'),(116,7,'1'),(117,7,'1'),(118,7,'1'),(119,7,'1'),(120,7,'1'),(121,7,'1'),(122,7,'1'),(123,7,'1'),(124,7,'1'),(125,7,'1'),(126,7,'1'),(127,7,'1'),(128,7,'1'),(129,7,'1'),(130,7,'1'),(131,7,'1'),(132,7,'1'),(133,7,'1'),(134,7,'1'),(135,7,'1'),(136,7,'1');
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

-- Dump completed on 2018-05-03 18:05:51
