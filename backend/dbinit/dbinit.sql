-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_reactapp
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announces`
--

DROP TABLE IF EXISTS `announces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announces` (
  `idannounces` int NOT NULL AUTO_INCREMENT,
  `title` varchar(90) NOT NULL,
  `description` longtext NOT NULL,
  `rating` float DEFAULT NULL,
  `price` float NOT NULL,
  `images` varchar(45) NOT NULL DEFAULT 'https://picsum.photos/300/200?random=1',
  `idusers` int NOT NULL,
  PRIMARY KEY (`idannounces`),
  KEY `fk_announce_user_idx` (`idusers`),
  CONSTRAINT `fk_announce_user` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announces`
--

LOCK TABLES `announces` WRITE;
/*!40000 ALTER TABLE `announces` DISABLE KEYS */;
INSERT INTO `announces` VALUES (68,'fasdf','afdsfa',3.08,43,'https://picsum.photos/300/200?random=1',20),(69,'fasdf','asdfa',4.25,43,'https://picsum.photos/300/200?random=1',20),(81,'fsfa','sdfasf',4,43,'https://picsum.photos/300/200?random=1',23),(82,'mhgbkj','mbhjkj',4,7,'https://picsum.photos/300/200?random=1',22),(83,'vhkb','gbkkl',3.5,234,'https://picsum.photos/300/200?random=1',25),(85,'sdfaef','fasdf',3,4,'https://picsum.photos/300/200?random=1',19),(89,'fasefaf','545',NULL,44444,'https://picsum.photos/300/200?random=1',19),(90,'fasef','fasef',NULL,43,'https://picsum.photos/300/200?random=1',19),(91,'anunt 1 editat','descriere anunt 1',1,1,'https://picsum.photos/300/200?random=1',27);
/*!40000 ALTER TABLE `announces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `announces_ratings`
--

DROP TABLE IF EXISTS `announces_ratings`;
/*!50001 DROP VIEW IF EXISTS `announces_ratings`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `announces_ratings` AS SELECT 
 1 AS `idannounces`,
 1 AS `average_rating`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `idreviews` int NOT NULL AUTO_INCREMENT,
  `idusers` int NOT NULL,
  `rating` float NOT NULL,
  `review` longtext NOT NULL,
  `idannounces` int NOT NULL,
  PRIMARY KEY (`idreviews`),
  KEY `fk_review_announce_idx` (`idannounces`),
  KEY `fk_review_user_idx` (`idusers`),
  CONSTRAINT `fk_review_announce` FOREIGN KEY (`idannounces`) REFERENCES `announces` (`idannounces`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (24,22,4,'afsdfasdf',68),(25,22,3,'fasfe',68),(26,22,2,'sunt sorinel pustiub',68),(27,22,5,'fasfeafs',69),(28,22,5,'afsefaafdse',69),(29,23,4,'ha ce fains',68),(30,23,2,'feafsefase',68),(31,23,4,'fewqfasf',68),(32,23,4,'fasdff',68),(33,23,4,'fasdfaefaf',81),(34,23,4,'asdfasf',81),(35,22,2,'afssdfas',68),(36,22,5,'jhlhkjh',82),(37,25,3,'foarte bun',83),(38,25,4,'fasdffdf',83),(41,19,3,'fasdf',82),(52,19,3,'fasef',68),(56,19,3,'fasef',68),(57,19,3,'afesfas',68),(58,19,3,'sfasf',68),(62,26,3,'gf',69),(64,19,4,'yer',69),(67,27,1,'fasefa',91),(69,27,3,'asfeafs',85);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `userphoto` varchar(45) NOT NULL DEFAULT 'https://i.pravatar.cc/300',
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'test1','$2b$10$ianbOIGFwEJXGw5Ri.2ZHuQMkz4YBCbTuSzMmPNpVNVaf./21oOZG','test1','https://i.pravatar.cc/300'),(20,'test2','$2b$10$o05B.ldzqIohyRdA0U40n.YlJBNJtXD0Y1KaiH.ypO9NkxwHDGEze','test2','https://i.pravatar.cc/300'),(21,'sorin','$2b$10$DjhuWq29UmVft68tH7y5rux7Z/hfVG7qkm5idpC9JvVN2gKwWADma','sorin','https://i.pravatar.cc/300'),(22,'sorin1','$2b$10$PRFpY5ieiSb5.RYhtCcLvOo6nmmugPkCIEFRPMhpLU6IzI0F5ADnq','sorin1','https://i.pravatar.cc/300'),(23,'sorin2','$2b$10$bShnWss85fEfVD8DQfbOY.9ojV5fJ8ZzIyCQW6TWdn/cpoAbkceBq','sorin2','https://i.pravatar.cc/300'),(24,'1234','$2b$10$MXLOXkxmG3DSs9RDZhQvCOtbExQD5jotiUO/HifnMCm6X526gVM.a','cristina.pop@gmail.com','https://i.pravatar.cc/300'),(25,'cris','$2b$10$K3Fg2hvthEpO351QDR5Jl.xCX7897WJLlRTVCTFYinRcIYZPAQvv.','cris','https://i.pravatar.cc/300'),(26,'s','$2b$10$e0CnkhWYhKMIPWBRG1IuhuF.I5IRNZGR3K/GWfJ7w1B8xFUtJfNL6','s','https://i.pravatar.cc/300'),(27,'monica','$2b$10$PJ4m2qhAJ/MHryQ0qFFxUedJRDeWMlaDxg/lYijONm.8GHEd6ILZa','monica','https://i.pravatar.cc/300');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `announces_ratings`
--

/*!50001 DROP VIEW IF EXISTS `announces_ratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `announces_ratings` AS select `reviews`.`idannounces` AS `idannounces`,coalesce(round(avg(`reviews`.`rating`),2),0.00) AS `average_rating` from `reviews` group by `reviews`.`idannounces` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-09 16:59:19
