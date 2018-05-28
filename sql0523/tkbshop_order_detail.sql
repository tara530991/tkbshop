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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(20) DEFAULT NULL,
  `MEMBER_EMAIL` varchar(45) NOT NULL,
  `addtime` datetime DEFAULT NULL,
  `status` varchar(3) CHARACTER SET big5 DEFAULT '01' COMMENT '01：訂單處理\n02：轉帳收款（待收款）\n03：物流運送（運送中）\n04：訂單完成（已結單）\n\n11：退貨申請\n12：收取退貨（物流作業中）\n13：物流取貨（已收貨）\n14：退款完成（已退款）\n\n99：訂單取消',
  `total` int(11) DEFAULT NULL,
  `buyer` varchar(10) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `receipt` int(3) DEFAULT '0' COMMENT '2：二聯式發票\n3：三聯式發票',
  `invoiceTitle` varchar(45) DEFAULT NULL COMMENT '發票抬頭',
  `invoiceNumber` varchar(11) DEFAULT NULL COMMENT '統一編號',
  `payMethod` int(3) DEFAULT NULL COMMENT '1:ATM轉帳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,'I201805210001','44455@gmail.com','2018-05-16 11:32:57','01',760,'王圈圈','新北市淡水區',3,'','',1),(2,'I201805210002','rrere@gmail.com','2018-05-16 15:51:46','03',450,'陳絲絲','台北市松山區',2,'台灣知識庫','',1),(3,'I201805210003','hehe@gmail.com','2018-05-16 16:01:03','01',160,'蕭紅紅','新北市五股區',3,'','85274163',1),(4,'2018051700004','hehe@gmail.com','2018-05-16 16:15:23','04',160,'蕭綠綠','新北市深坑區',3,'','',1),(5,'2018051700005','hehe@gmail.com','2018-05-16 16:17:58','02',230,'蕭綠綠','新北市五股區',3,'','',1),(7,'L201805210002','44455@gmail.com','2018-05-21 11:02:52','01',550,'王明明','全家就是你家',2,'','',1),(9,'L201805210003','44455@gmail.com','2018-05-21 11:31:27','11',1240,'王明明','台北市內湖區',3,'','',1),(10,'L201805210004','sss@gmail.com','2018-05-21 11:58:53','01',190,'呂緯緯','全家就是你家',2,'','',1),(11,'M201805210001','44455@gmail.com','2018-05-21 12:03:14','01',1240,'王喳喳','台東市長濱鄉',2,'','',1),(12,'M201805210002','rrere@gmail.com','2018-05-21 12:05:38','02',450,'陳米米','新北市永和區',2,'','',1),(13,'M201805210003','rrere@gmail.com','2018-05-21 12:07:24','03',450,'陳小小','台北市內湖區',2,'','',1),(14,'M201805210004','hehe@gmail.com','2018-05-21 12:09:41','02',970,'蕭白白','新北市新店區',3,'','',1),(15,'M201805210005','ferer@gmail.com','2018-05-21 12:24:08','04',930,'許甜甜','新北市新莊區',3,'','',1),(16,'M201805210006','ferer@gmail.com','2018-05-21 12:32:49','02',230,'許蜜蜜','全家就是你家',2,'','',1),(17,'N201805210001','hehe@gmail.com','2018-05-21 13:46:12','11',970,'蕭藍藍','新北市新莊區',3,'','',1),(18,'N201805210002','44455@gmail.com','2018-05-21 13:48:22','01',890,'王每每','台北市松山區',3,'','',1),(19,'Q201805230001','tara530991@gmail.com','2018-05-23 16:55:38','01',740,'黃可可','新北市淡水區',3,'','',1),(20,'R201805230001','tara530991@gmail.com','2018-05-23 17:20:49','01',500,'黃比比','新北市淡水區',3,'','',1);
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

-- Dump completed on 2018-05-23 17:41:24
