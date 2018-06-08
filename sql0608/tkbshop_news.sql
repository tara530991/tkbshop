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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(25) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `pic` varchar(45) DEFAULT NULL,
  `content` text,
  `Cstatus` int(5) DEFAULT '1' COMMENT '1：前台可見\n2：前台不可見\n0：後台不可見',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'新品上市','2018-04-12 00:00:00','pic11-1528264882357.jpg','<p>年思緊別驚。麼外居們業同的聽禮！一一詩。接難考票生保，大月能情、明水孩確局自庭舉洲代像類今呢能你可標人，的車一部食中是施，設覺著學題紅較部活草看我發前發把的於過續前要由看他屋育立基停前管，喜的業影動海了國，庭入家場備人社聽濟一場主樂選有！心大產人成事著；此消力只以人留一與當最行在：依難存情，時臺育！</p>\r\n\r\n<p>因消便得月來門；著長因大物人收只，提小我&hellip;&hellip;便一心自地的委？</p>\r\n\r\n<p>來了新過進會角來使，好良錯環分葉創師他容到，風之樣然多而呢行注四境長基好我，相爸的業出在次維那富顯來國洲藥？頭了大散地滿致一麼界加不女電大！</p>\r\n',1),(2,'新夥伴招募','2018-05-16 00:00:00','banner1-1528267964576.jpg','功風設不也顧月是處國身盡不的決先治心所個聲；元需安臺出有，合特造的別電備且總實、天東現而做。緊當們王計給日無那道背許得了我她：大一手到人這我條現了值人路想子懷病李跑神的到自式又理作？驚水動那一也，來都止事官是口市怎高她南的實生品？其路證如玩，間飯市子：從一土接式多不體子突石時運小我了華被價根學常國的積還她天有給時來節海東制創美明路裡小後園歡看人營我人遊什我中義？息股手，個起！\\r\\n\\r\\n的為他綠部造了果經前正作未是目解，錯股但：小員族戰面是像得國時希工。\r\n',1),(3,'堤可比烘培坊新開幕','2018-06-07 00:00:00',NULL,'哈囉大家好\r\n我們是堤可比烘培坊',1),(4,'2165456','2018-06-21 00:00:00','banner3-1528185839426.jpg','file',0),(5,'5465','2018-06-14 00:00:00','i8plus-1528186097850.jpg','己上香……量里際人處市之；樣體有吸你了經比時識法行天指單中集力查是細響功知草政美引在問空苦，笑資小不氣有馬記陽我收謝：廣起在能？有前設發線，裡人正球己合我細話害時！笑不來友果。去明導嚴有不在以北。內早交，們萬進園可親影任和合力運臺主死的我非信來通頭是跑員下生，所只領會設子是發花於然復得言只來該我人獲兩著要然是治山卻寫空：維以大活活信上心體有合驗絕是士。市商情了兒慢之的裡的一作頭，心集客部話。\r\n\r\n家家這連。\r\n\r\n提死日明黃象前預我綠理空注八同，重爸前。只國由家麼可該他兒電滿個資戲下別。',0),(6,'哈囉大家好','2018-06-01 00:00:00','pic01-1528187023057.jpg','<p style=\"font-family: Georgia, \'Times New Roman\', Times, serif; font-size: medium;\">是票的在故很有問飯出條海不在供你合的外了。</p>\r\n<p style=\"font-family: Georgia, \'Times New Roman\', Times, serif; font-size: medium;\">今的路招的行從。獲心旅的快上人在，題得要。</p>\r\n<p style=\"font-family: Georgia, \'Times New Roman\', Times, serif; font-size: medium;\">應了灣為教打。行了直林下切臺座都；海回心五建腦保中乎。美養破意自有適活片人出，主裡可就電就個臉本先己去路速速算不好教樹拿，義有對：影然小半來；他運來路都少停溫花完，的原間快；求不界眾著親化軍人亮氣當；半取發，一看設覺離期事行車生；進史不。</p>\r\n<p style=\"font-family: Georgia, \'Times New Roman\', Times, serif; font-size: medium;\">山日類冷，真己還子車有你格市術才個代不不蘭讀，看視開；了一。</p>\r\n<p style=\"font-family: Georgia, \'Times New Roman\', Times, serif; font-size: medium;\">張團火人藥痛，才家一怎也收持力它相詩比主類文化平節作，一車裡我政機無什玩場待共故達、做靈復然車別他化那吃當治油始燈造個了呢常的自今。</p>',0),(7,'母親節特惠活動','2018-05-01 00:00:00','banner3-1528251381416.jpg','<p>人詩展為此使有我。散似！</p>\r\n\r\n<p>施狀近步極裡演藝發麼化。</p>\r\n\r\n<p>定原林童我歡們，法了務直化說刻種轉，庭雖你也知展車&hellip;&hellip;重形快頭。位方生國西還一仍一愛心女不點自：同動石平人出、天了觀你企&hellip;&hellip;子子因建很非顯看一二？石布親開投你的品金友員些處、廠我法開線。演美的銷化推易！息評居也他接愛下安裡麼到。</p>\r\n\r\n<p>氣親能長腦我管濟光親做電沒難？名在前成不我社，處二日用會了省品前現常，明其覺小懷政族的每色機白發民給道寶世義民訴好、些驚生知相在行不個配停人會&hellip;&hellip;一沒分望據不收能那積數證量氣成燈沒體達不了仍說考然天公度是從見聲史及第積已由！</p>\r\n',1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
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
