-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: project_1
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('08d4bc10-1a23-4039-aceb-54f9df95f456','d07ea245e9789edd4f5f0d2c6579c11dc9f0b78bfdfc075432474af7b02151e6','2025-01-04 19:04:27.115','20250102162246_add_user_model',NULL,NULL,'2025-01-04 19:04:27.110',1),('105ad476-253e-4d91-91a9-f80592f50942','2df64355a66da2b67504194ffbe3ff1041bb7d3c174eee19519436823c639b6d','2025-01-04 19:04:27.197','20250104172931_ticket_assignee',NULL,NULL,'2025-01-04 19:04:27.173',1),('16dfdf18-cf98-40e2-a028-61e5230f3a51','efeeaef35822363304692419165f91b852e779d7e69ecdb94e7c60cd28b7b151','2025-01-04 19:04:27.280','20250104185815_auto_gen_id_added',NULL,NULL,'2025-01-04 19:04:27.272',1),('419587fd-3019-44c2-bcfe-25269691d554','ac2bf38e542fcef781cde055a9a9fef3eceb4716ca7ad80eb3fcdd42e9e9d579','2025-01-04 19:12:03.812','20250104191203_update_message_field',NULL,NULL,'2025-01-04 19:12:03.801',1),('782cc438-3104-4e22-acfd-e385655ce6a0','32af5692cd728318e6b8d99b9c5f3670b9834868f9d5148426f6c386c9a7754a','2025-01-04 19:04:27.229','20250104174350_ticket_assignee_update',NULL,NULL,'2025-01-04 19:04:27.197',1),('a2dfa59a-2ca7-4c86-a570-2e0b80561ecd','449a5015fb58bf81785601efc903fa646a442546031504e62facfc5b1f19ab26','2025-01-04 19:04:27.109','20250102161236_add_user_model',NULL,NULL,'2025-01-04 19:04:27.104',1),('a777d32f-6b19-4df6-beb9-fb5beb55b69b','c07efb12a639e99711fd6895b18e64a756c5ad0b6c861eec7dafeeca7d6e0752','2025-01-04 19:04:27.172','20250104083334_ticket_model',NULL,NULL,'2025-01-04 19:04:27.168',1),('b618d071-eb50-491e-9d60-597731db4904','1eb9b27d4f5d3d8d5a9c208c3e56778b055eff1ab7e134efdc0ad3ef0c5c1238','2025-01-04 19:04:27.168','20250104082941_ticket_model',NULL,NULL,'2025-01-04 19:04:27.115',1),('ba87a275-947a-4814-aded-76db22aacee8','cb3ce53f1eb3e5a8c1aeff0cf6bc5ddef328330921da69a3145abb6137358a1b','2025-01-04 19:04:27.253','20250104175121_ticket_assignee_update',NULL,NULL,'2025-01-04 19:04:27.229',1),('dd30a521-ee44-42fa-b647-f257aab3db43','76017d6ac596e2f8b0181d9eb088a10fa9c985cf328f43ce08b1c3b4789b7126','2025-01-04 19:04:27.271','20250104175644_ticket_assignee_update',NULL,NULL,'2025-01-04 19:04:27.254',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ticketId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_ticketId_fkey` (`ticketId`),
  KEY `Message_userId_fkey` (`userId`),
  CONSTRAINT `Message_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (1,' I’ve been trying to log in to my account for the past few hours, but every time I enter my credentials','2025-01-04 19:10:50.349',2,1),(2,'I’ve tried accessing the support documentation on the website, but it says \"Page not found.\" Could you send me the link or fix the issue with the documentation page?','2025-01-04 19:12:43.333',3,1),(3,'We are working on this.Please be patient','2025-01-05 06:32:44.759',2,1),(4,'We are trying to solve this.','2025-01-05 06:34:06.098',2,2),(5,'Ok. I am eagerly waiting for you.','2025-01-05 06:35:40.125',2,1),(6,'New Message\n','2025-01-05 11:30:25.448',2,2);
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` enum('OPEN','SOLVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `customerId` int NOT NULL,
  `autoGenId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Ticket_autoGenId_key` (`autoGenId`),
  KEY `Ticket_customerId_fkey` (`customerId`),
  CONSTRAINT `Ticket_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (2,'Unable to log in to my account','2025-01-04 19:10:50.349','2025-01-05 11:30:14.785','OPEN',1,'#649101'),(3,'Can\'t access support documentation','2025-01-04 19:12:43.333','2025-01-05 10:35:21.599','CLOSED',1,'#237187');
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TicketAssignee`
--

DROP TABLE IF EXISTS `TicketAssignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TicketAssignee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticketId` int NOT NULL,
  `adminId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TicketAssignee_ticketId_adminId_key` (`ticketId`,`adminId`),
  KEY `TicketAssignee_adminId_fkey` (`adminId`),
  CONSTRAINT `TicketAssignee_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `TicketAssignee_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TicketAssignee`
--

LOCK TABLES `TicketAssignee` WRITE;
/*!40000 ALTER TABLE `TicketAssignee` DISABLE KEYS */;
INSERT INTO `TicketAssignee` VALUES (1,2,2),(2,3,2);
/*!40000 ALTER TABLE `TicketAssignee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `role` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'alamin@gmail.com','$2a$10$JzRE5SU18LHl7tC0t2O06eInIBUkvCLxwIIRSA7bpE0iBJFqT9z7K','Al-Amin Hossain','2025-01-04 19:07:40.508','CUSTOMER'),(2,'admin@admin.com','$2a$10$RCYvECTHMHTgnuTwPS.0huH.5LZ.1dj3k0Wd8N7WQs4/Of7aDonxq','Admin','2025-01-04 19:08:03.059','ADMIN'),(3,'abir@gmail.com','$2a$10$9KJNPhmk/nfXcND/vjRsYuBpywSoF5Fb1h3uGJcY6lDSUNX9msgnW','Abir Niloy','2025-01-04 19:08:22.162','CUSTOMER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'project_1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-05 19:27:01
