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
-- Dumping data for table `dtpl_mst_business_unit`
--

LOCK TABLES `dtpl_mst_business_unit` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_business_unit` DISABLE KEYS */;
INSERT INTO `dtpl_mst_business_unit` (`id`, `description`, `name`) VALUES (1,'Perangkat desa unit kebersihan','kebersihan'),(2,'Perangkat desa unit keamanan','keamanan');
/*!40000 ALTER TABLE `dtpl_mst_business_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_cctv`
--

LOCK TABLES `dtpl_mst_cctv` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_cctv` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtpl_mst_cctv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_registration_info`
--

LOCK TABLES `dtpl_mst_registration_info` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_registration_info` DISABLE KEYS */;
INSERT INTO `dtpl_mst_registration_info` (`id`, `registration_date`) VALUES (1,'2022-10-28 21:38:21.329000');
/*!40000 ALTER TABLE `dtpl_mst_registration_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_residence`
--

LOCK TABLES `dtpl_mst_residence` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_residence` DISABLE KEYS */;
INSERT INTO `dtpl_mst_residence` (`id`, `description`, `name`) VALUES (1,'Deskripsi Perumahan A','Perumahan A'),(2,'Deskripsi Perumahan B','Perumahan B');
/*!40000 ALTER TABLE `dtpl_mst_residence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_role`
--

LOCK TABLES `dtpl_mst_role` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_role` DISABLE KEYS */;
INSERT INTO `dtpl_mst_role` (`id`, `description`, `name`) VALUES (1,'Role untuk Admin','admin'),(2,'Role untuk Perangkat Desa','perangkat_desa'),(3,'Role untuk Warga','warga');
/*!40000 ALTER TABLE `dtpl_mst_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_user`
--

LOCK TABLES `dtpl_mst_user` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_user` DISABLE KEYS */;
INSERT INTO `dtpl_mst_user` (`id`, `active`, `password`, `user_info_id`, `username`) VALUES (1,_binary '','password',NULL,'fauzi16'),(2,_binary '','password',1,'fauzi@ui.ac.id'),(3,_binary '','password',2,'hani@ui.ac.id'),(4,_binary '','password',3,'petugas1@edesa.com'),(5,_binary '','password',4,'petugas2@edesa.com'),(6,_binary '','password',5,'admin2@edesa.com'),(7,_binary '','password',6,'warga1@edesa.com');
/*!40000 ALTER TABLE `dtpl_mst_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_mst_user_info`
--

LOCK TABLES `dtpl_mst_user_info` WRITE;
/*!40000 ALTER TABLE `dtpl_mst_user_info` DISABLE KEYS */;
INSERT INTO `dtpl_mst_user_info` (`id`, `address`, `birth_date`, `business_unit_id`, `email`, `hp`, `name`, `registration_info_id`, `role_id`, `residence_id`) VALUES (1,'Jalan Jalan A',NULL,NULL,'fauzi@ui.ac.id','088784573853','Ahmad Fauzi',NULL,1,NULL),(2,'Jalan Jalan B',NULL,NULL,'hani@ui.ac.id','088784234853','Hanifa Fisalma',NULL,1,NULL),(3,'Jalan C',NULL,1,'petugas1@edesa.com','087747264274','Petugas 1',NULL,2,1),(4,'Jalan D',NULL,1,'petugas2@edesa.com','087747264274','Petugas 2',NULL,2,1),(5,'Jalan 3',NULL,NULL,'admin2@edesa.com','0879874242343','Admin 2',NULL,1,NULL),(6,'Jalan Kebenaran',NULL,NULL,'warga1@edesa.com','081744242343','Warga 1',1,3,NULL);
/*!40000 ALTER TABLE `dtpl_mst_user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dtpl_trs_issue`
--

LOCK TABLES `dtpl_trs_issue` WRITE;
/*!40000 ALTER TABLE `dtpl_trs_issue` DISABLE KEYS */;
INSERT INTO `dtpl_trs_issue` (`id`, `assigned_by`, `assignee`, `created_by`, `created_time`, `business_unit_id`, `coordinate`, `description`, `residence_id`, `status`) VALUES (1,1,4,7,'2022-10-28 21:38:45.833000',1,'8.28892849424,10.298349284','Ada maling',1,'CLOSED'),(2,1,4,7,'2022-10-28 21:52:32.217000',1,'8.28892849424,10.298349284','Ada Lobang di tengah jalan',1,'CLOSED');
/*!40000 ALTER TABLE `dtpl_trs_issue` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2022-10-29 19:06:05
