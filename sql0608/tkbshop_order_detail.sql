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
  `status` varchar(3) CHARACTER SET big5 DEFAULT '01' COMMENT '01：訂單處理（待收款）\n02：訂單處理（已收款）\n03：物流運送（運送中）\n04：訂單完成（已結單）\n\n11：退貨申請\n12：收取退貨（物流作業中）\n13：物流取貨（已收貨）\n14：退款完成（已退款）\n\n99：訂單取消',
  `total` int(11) DEFAULT NULL,
  `buyer` varchar(10) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `receipt` int(3) DEFAULT '0' COMMENT '2：二聯式發票\n3：三聯式發票',
  `invoiceTitle` varchar(45) DEFAULT NULL COMMENT '發票抬頭',
  `invoiceNumber` varchar(11) DEFAULT NULL COMMENT '統一編號',
  `payMethod` int(3) DEFAULT NULL COMMENT '1:ATM轉帳',
  `Cstatus` int(3) DEFAULT '1' COMMENT '1：前台可見\n0：後台不可見',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (50,'R201806070001','sss@gmail.com','2018-06-07 17:14:22','01',397,'呂緯緯','新北市淡水區',3,'台灣知識庫','',1,1),(51,'R201806070002','rrere@gmail.com','2018-06-07 17:25:01','03',545,'陳米米','台北市松山區',2,'','',1,1),(52,'P201806080001','44455@gmail.com','2018-06-08 15:59:18','99',85,'王圈圈','新北市汐止區',2,'','',1,1),(53,'Q201806080001','44455@gmail.com','2018-06-08 16:01:15','01',215,'王點點','新北市新店區',2,'','',1,1),(54,'Q201806080002','44455@gmail.com','2018-06-08 16:40:29','01',125,'dfdfgf','ghgguk',3,'','',1,1);
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

-- Dump completed on 2018-06-08 18:21:55
