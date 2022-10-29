-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: edesadb
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `dtpl_mst_business_unit`
--

DROP TABLE IF EXISTS `dtpl_mst_business_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_business_unit` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_business_unit`
--

LOCK TABLES `dtpl_mst_business_unit` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_business_unit` DISABLE KEYS */;
INSERT INTO `dtpl_mst_business_unit` (`id`, `description`, `name`) VALUES (1,'Perangkat desa unit kebersihan','kebersihan'),(2,'Perangkat desa unit keamanan','keamanan');
/*!40000 ALTER TABLE `dtpl_mst_business_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_cctv`
--

DROP TABLE IF EXISTS `dtpl_mst_cctv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_cctv` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  `residence_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo7k0oerbts1nbj5fepmxljmnc` (`residence_id`),
  CONSTRAINT `FKo7k0oerbts1nbj5fepmxljmnc` FOREIGN KEY (`residence_id`) REFERENCES `dtpl_mst_residence` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_cctv`
--

LOCK TABLES `dtpl_mst_cctv` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_cctv` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtpl_mst_cctv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_registration_info`
--

DROP TABLE IF EXISTS `dtpl_mst_registration_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_registration_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `registration_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_registration_info`
--

LOCK TABLES `dtpl_mst_registration_info` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_registration_info` DISABLE KEYS */;
INSERT INTO `dtpl_mst_registration_info` (`id`, `registration_date`) VALUES (1,'2022-10-28 21:38:21.329000');
/*!40000 ALTER TABLE `dtpl_mst_registration_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_residence`
--

DROP TABLE IF EXISTS `dtpl_mst_residence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_residence` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_residence`
--

LOCK TABLES `dtpl_mst_residence` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_residence` DISABLE KEYS */;
INSERT INTO `dtpl_mst_residence` (`id`, `description`, `name`) VALUES (1,'Deskripsi Perumahan A','Perumahan A'),(2,'Deskripsi Perumahan B','Perumahan B');
/*!40000 ALTER TABLE `dtpl_mst_residence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_role`
--

DROP TABLE IF EXISTS `dtpl_mst_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_role`
--

LOCK TABLES `dtpl_mst_role` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_role` DISABLE KEYS */;
INSERT INTO `dtpl_mst_role` (`id`, `description`, `name`) VALUES (1,'Role untuk Admin','admin'),(2,'Role untuk Perangkat Desa','perangkat_desa'),(3,'Role untuk Warga','warga');
/*!40000 ALTER TABLE `dtpl_mst_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_user`
--

DROP TABLE IF EXISTS `dtpl_mst_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_info_id` bigint DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1er574danitd2y1l096exi1vl` (`user_info_id`),
  CONSTRAINT `FK1er574danitd2y1l096exi1vl` FOREIGN KEY (`user_info_id`) REFERENCES `dtpl_mst_user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_user`
--

LOCK TABLES `dtpl_mst_user` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_user` DISABLE KEYS */;
INSERT INTO `dtpl_mst_user` (`id`, `active`, `password`, `user_info_id`, `username`) VALUES (1,_binary '','password',NULL,'fauzi16'),(2,_binary '','password',1,'fauzi@ui.ac.id'),(3,_binary '','password',2,'hani@ui.ac.id'),(4,_binary '','password',3,'petugas1@edesa.com'),(5,_binary '','password',4,'petugas2@edesa.com'),(6,_binary '','password',5,'admin2@edesa.com'),(7,_binary '','password',6,'warga1@edesa.com');
/*!40000 ALTER TABLE `dtpl_mst_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_mst_user_info`
--

DROP TABLE IF EXISTS `dtpl_mst_user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_mst_user_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` text,
  `birth_date` date DEFAULT NULL,
  `business_unit_id` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hp` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `registration_info_id` bigint DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  `residence_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp5l8qa8t9ub70ar3jducqeyop` (`business_unit_id`),
  KEY `FKtj64wefylt4m88vmcb85uy8ht` (`registration_info_id`),
  KEY `FKgxf1o8rgxvpmvpak4n4evph4i` (`role_id`),
  KEY `FK4amut4rir082vai530tlyuc19` (`residence_id`),
  CONSTRAINT `FK4amut4rir082vai530tlyuc19` FOREIGN KEY (`residence_id`) REFERENCES `dtpl_mst_residence` (`id`),
  CONSTRAINT `FKgxf1o8rgxvpmvpak4n4evph4i` FOREIGN KEY (`role_id`) REFERENCES `dtpl_mst_role` (`id`),
  CONSTRAINT `FKp5l8qa8t9ub70ar3jducqeyop` FOREIGN KEY (`business_unit_id`) REFERENCES `dtpl_mst_business_unit` (`id`),
  CONSTRAINT `FKtj64wefylt4m88vmcb85uy8ht` FOREIGN KEY (`registration_info_id`) REFERENCES `dtpl_mst_registration_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_mst_user_info`
--

LOCK TABLES `dtpl_mst_user_info` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_user_info` DISABLE KEYS */;
INSERT INTO `dtpl_mst_user_info` (`id`, `address`, `birth_date`, `business_unit_id`, `email`, `hp`, `name`, `registration_info_id`, `role_id`, `residence_id`) VALUES (1,'Jalan Jalan A',NULL,NULL,'fauzi@ui.ac.id','088784573853','Ahmad Fauzi',NULL,1,NULL),(2,'Jalan Jalan B',NULL,NULL,'hani@ui.ac.id','088784234853','Hanifa Fisalma',NULL,1,NULL),(3,'Jalan C',NULL,1,'petugas1@edesa.com','087747264274','Petugas 1',NULL,2,1),(4,'Jalan D',NULL,1,'petugas2@edesa.com','087747264274','Petugas 2',NULL,2,1),(5,'Jalan 3',NULL,NULL,'admin2@edesa.com','0879874242343','Admin 2',NULL,1,NULL),(6,'Jalan Kebenaran',NULL,NULL,'warga1@edesa.com','081744242343','Warga 1',1,3,NULL);
/*!40000 ALTER TABLE `dtpl_mst_user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_trs_issue`
--

DROP TABLE IF EXISTS `dtpl_trs_issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_trs_issue` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assigned_by` bigint DEFAULT NULL,
  `assignee` bigint DEFAULT NULL,
  `created_by` bigint DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `business_unit_id` bigint DEFAULT NULL,
  `coordinate` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `residence_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjx5vgeaen8d47tw7nbwroyotv` (`assigned_by`),
  KEY `FK64ap4t4etu5vm6e1ujv2898ly` (`assignee`),
  KEY `FKrf97l3jb2mye3865j4dmd7sxn` (`created_by`),
  KEY `FK28alt08r2ti1kw0f644w2e0f9` (`business_unit_id`),
  KEY `FKk2jtav823cuh94darl8e25rw` (`residence_id`),
  CONSTRAINT `FK28alt08r2ti1kw0f644w2e0f9` FOREIGN KEY (`business_unit_id`) REFERENCES `dtpl_mst_business_unit` (`id`),
  CONSTRAINT `FK64ap4t4etu5vm6e1ujv2898ly` FOREIGN KEY (`assignee`) REFERENCES `dtpl_mst_user` (`id`),
  CONSTRAINT `FKjx5vgeaen8d47tw7nbwroyotv` FOREIGN KEY (`assigned_by`) REFERENCES `dtpl_mst_user` (`id`),
  CONSTRAINT `FKk2jtav823cuh94darl8e25rw` FOREIGN KEY (`residence_id`) REFERENCES `dtpl_mst_residence` (`id`),
  CONSTRAINT `FKrf97l3jb2mye3865j4dmd7sxn` FOREIGN KEY (`created_by`) REFERENCES `dtpl_mst_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_trs_issue`
--

LOCK TABLES `dtpl_trs_issue` WRITE;
/*!40000 ALTER TABLE `dtpl_trs_issue` DISABLE KEYS */;
INSERT INTO `dtpl_trs_issue` (`id`, `assigned_by`, `assignee`, `created_by`, `created_time`, `business_unit_id`, `coordinate`, `description`, `residence_id`, `status`) VALUES (1,1,4,7,'2022-10-28 21:38:45.833000',1,'8.28892849424,10.298349284','Ada maling',1,'CLOSED'),(2,1,4,7,'2022-10-28 21:52:32.217000',1,'8.28892849424,10.298349284','Ada Lobang di tengah jalan',1,'CLOSED');
/*!40000 ALTER TABLE `dtpl_trs_issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtpl_trs_issue_update`
--

DROP TABLE IF EXISTS `dtpl_trs_issue_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtpl_trs_issue_update` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` text,
  `issue_id` bigint DEFAULT NULL,
  `update_by_id` bigint DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK36x37yfnfngxt775sc5sdsgvs` (`issue_id`),
  CONSTRAINT `FK36x37yfnfngxt775sc5sdsgvs` FOREIGN KEY (`issue_id`) REFERENCES `dtpl_trs_issue` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtpl_trs_issue_update`
--

LOCK TABLES `dtpl_trs_issue_update` WRITE;
/*!40000 ALTER TABLE `dtpl_trs_issue_update` DISABLE KEYS */;
INSERT INTO `dtpl_trs_issue_update` (`id`, `comment`, `issue_id`, `update_by_id`, `update_time`, `status`) VALUES (1,'Malingnya udah ketangkep nih gan',1,1,'2022-10-28 21:49:16.233000','open'),(2,'Lobangnya udah ditambel gan',2,1,'2022-10-28 21:53:48.383000','closed');
/*!40000 ALTER TABLE `dtpl_trs_issue_update` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-29 19:03:13
