-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hacker_glory_mading
CREATE DATABASE IF NOT EXISTS `hacker_glory_mading` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hacker_glory_mading`;

-- Dumping structure for table hacker_glory_mading.analytics
CREATE TABLE IF NOT EXISTS `analytics` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `magazine_id` bigint unsigned NOT NULL,
  `views` bigint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `analytics_magazine_id_foreign` (`magazine_id`),
  CONSTRAINT `analytics_magazine_id_foreign` FOREIGN KEY (`magazine_id`) REFERENCES `magazines` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.analytics: ~0 rows (approximately)

-- Dumping structure for table hacker_glory_mading.bookmarks
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `magazine_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookmarks_user_id_foreign` (`user_id`),
  KEY `bookmarks_magazine_id_foreign` (`magazine_id`),
  CONSTRAINT `bookmarks_magazine_id_foreign` FOREIGN KEY (`magazine_id`) REFERENCES `magazines` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.bookmarks: ~0 rows (approximately)

-- Dumping structure for table hacker_glory_mading.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  UNIQUE KEY `categories_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.categories: ~2 rows (approximately)
INSERT INTO `categories` (`id`, `slug`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'ekstrakurikuler', 'Ekstrakurikuler', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(2, 'kegiatan', 'Kegiatan', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(3, 'pembelajaran', 'Pembelajaran', '2023-12-17 16:44:45', '2023-12-17 16:44:45');

-- Dumping structure for table hacker_glory_mading.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table hacker_glory_mading.magazines
CREATE TABLE IF NOT EXISTS `magazines` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article` text COLLATE utf8mb4_unicode_ci,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `important` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `magazines_slug_unique` (`slug`),
  KEY `magazines_category_id_foreign` (`category_id`),
  KEY `magazines_author_id_foreign` (`author_id`),
  CONSTRAINT `magazines_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `magazines_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.magazines: ~24 rows (approximately)
INSERT INTO `magazines` (`id`, `category_id`, `author_id`, `slug`, `title`, `description`, `thumbnail`, `article`, `approved`, `important`, `published_at`, `created_at`, `updated_at`) VALUES
	(1, 1, 2, 'ini-contoh-tanpa-artikel', 'Ini Contoh Tanpa Artikel', 'Enim odio corporis magni ipsum. Ut sed natus iusto doloribus accusamus. Sapiente aut voluptas fugiat recusandae.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(2, 2, 2, 'ini-contoh-dengan-artikel', 'Ini Contoh Dengan Artikel', 'Ex libero et et corporis consequatur et accusantium. Qui voluptatum cumque rerum velit soluta. Delectus voluptas ut et possimus repudiandae eveniet illum.', 'uploads/sample.jpg', '<p>Ini adalah contoh dalam membuat artikel dalam mading, semua hal disini bersifat rich text, jadi mulai dari embed gambar link list dan format format lainnya juga didukung</p><p><br></p><p>Akses smk koding website <a href="https://smkcoding.id/" rel="noopener noreferrer" target="_blank">disini</a></p><p><br></p><p>todo ku hari ini</p><ol><li>Makan</li><li>Minum</li><li>Mandi</li><li>Bermain Bersama</li></ol><p><br></p><blockquote>Aku pengen jadi juara di SMK CODING hehehehe</blockquote><p><br></p><p>Untuk fitur lainnya dapat dicoba pada bagian dashboard yang dapat diakses oleh admin dan juga penulis</p>', 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(3, 3, 1, 'molestiae-iusto-voluptatum-molestiae-reprehenderit-labore-sit-voluptates-neque', 'Molestiae iusto voluptatum molestiae reprehenderit labore sit voluptates neque.', 'Rem reiciendis corrupti molestiae corporis laborum beatae quos. Rerum enim delectus nobis et. Eligendi ratione nihil repellat. Nam porro iste mollitia iste quis recusandae eveniet.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(4, 2, 1, 'molestiae-dolorem-dolor-eos-similique-rerum-est-ab-accusantium', 'Molestiae dolorem dolor eos similique rerum est ab accusantium.', 'Repellat ad libero ut est tempora inventore voluptatum. Quod aut omnis mollitia blanditiis aut quisquam. Rerum accusantium voluptatum deleniti vel expedita dolore. Aliquam debitis accusamus ut consequatur delectus.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(5, 3, 2, 'ea-aut-alias-velit', 'Ea aut alias velit.', 'Totam rem facere saepe. Et et minus ratione vitae reiciendis aut. Ex libero in dolorem ab asperiores perferendis labore. Iste vel et ad.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(6, 2, 2, 'dolores-autem-nihil-optio-molestiae-numquam', 'Dolores autem nihil optio molestiae numquam.', 'Cupiditate sint saepe et esse ab. Corporis veritatis ut saepe voluptas sint vitae porro. Quod fugit ut aut in et esse dolorum dolore. Id amet ea pariatur fugit laborum exercitationem ad.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(7, 3, 1, 'quidem-itaque-porro-alias-vitae-laboriosam-numquam-necessitatibus', 'Quidem itaque porro alias vitae laboriosam numquam necessitatibus.', 'Qui corrupti est mollitia deserunt quo commodi autem beatae. Et quis sed a non officiis.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(8, 1, 1, 'error-ea-aut-sed-unde-qui-recusandae-laudantium-autem', 'Error ea aut sed unde qui recusandae laudantium autem.', 'Vel provident quis quia ratione aut et. Sapiente totam mollitia voluptates similique. Rerum optio officiis tempore fugiat.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(9, 2, 2, 'deleniti-aliquam-est-corporis-illo-quam', 'Deleniti aliquam est corporis illo quam.', 'Atque et qui in cum quia. Voluptas quia aut non et facere non. Ex nulla provident nulla ut sint.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(10, 2, 2, 'at-velit-odit-sit-eaque', 'At velit odit sit eaque.', 'Debitis suscipit pariatur saepe et. Et et nobis aliquam nam consequuntur sint sed. Animi ea officia nihil magni pariatur occaecati aspernatur. Modi in aut quibusdam dicta repellendus fuga.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(11, 3, 1, 'dicta-possimus-ea-nostrum-dolor-a-distinctio', 'Dicta possimus ea nostrum dolor a distinctio.', 'Ea laudantium beatae sit accusantium aut. Eius nemo voluptatem autem voluptatum sequi debitis sint tempora. Voluptas et quia similique et tempora dolorem ut.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(12, 3, 2, 'dolorem-nesciunt-est-suscipit-nostrum-voluptatum-odio-dicta-a', 'Dolorem nesciunt est suscipit nostrum voluptatum odio dicta a.', 'Enim officiis sit aperiam voluptatem velit architecto. Architecto inventore quasi doloremque et natus doloribus. Exercitationem ut dolores omnis.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(13, 2, 2, 'et-molestias-officiis-est-placeat', 'Et molestias officiis est placeat.', 'Consectetur occaecati reprehenderit suscipit unde. Officia molestias corporis at exercitationem. Velit praesentium voluptatem voluptas quia molestiae possimus. Eius et qui error qui consequatur tenetur eveniet.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(14, 3, 2, 'eos-eius-eum-in-magnam-vel-sint', 'Eos eius eum in magnam vel sint.', 'Distinctio nostrum quo et facere pariatur. Tempore omnis dolor neque animi enim provident. Magni velit repellendus ullam illum enim quae ratione.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(15, 2, 2, 'enim-enim-veniam-blanditiis-consectetur', 'Enim enim veniam blanditiis consectetur.', 'Alias corrupti distinctio voluptas distinctio eos vel aliquam. Veritatis sit voluptatem optio ad voluptatem hic. Sequi consequuntur et porro cupiditate. Eveniet accusantium dolores aut magnam.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(16, 1, 2, 'pariatur-totam-atque-reprehenderit-dolorem-enim-eos-natus', 'Pariatur totam atque reprehenderit dolorem enim eos natus.', 'Distinctio sapiente adipisci quisquam nisi quas. Ab quaerat quas maiores vero. Vel ut hic facilis et odio.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(17, 2, 2, 'aut-dolorum-blanditiis-aut-nostrum-repellat-dolor', 'Aut dolorum blanditiis aut nostrum repellat dolor.', 'Et dolorem temporibus quaerat occaecati iste similique mollitia. Adipisci quam odio cum fugit. Quasi deserunt velit sapiente vitae est eos placeat ratione.', 'uploads/sample.jpg', NULL, 1, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(18, 3, 2, 'quo-et-consequatur-cum-aliquam-aliquam', 'Quo et consequatur cum aliquam aliquam.', 'Ut dolorum qui animi reprehenderit voluptatem dolore maiores. Praesentium nemo ipsa sit tempore veniam non incidunt. Et sed et quo sunt.', 'uploads/sample.jpg', NULL, 0, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(19, 3, 2, 'quae-iure-ut-et-quidem-earum-exercitationem', 'Quae iure ut et quidem earum exercitationem.', 'Quo ut omnis sequi incidunt. Molestias ut exercitationem voluptatem molestiae sunt. Quae dolorum et qui quae.', 'uploads/sample.jpg', NULL, 0, 0, '2023-12-17 16:44:45', '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(20, 3, 2, 'doloremque-voluptatem-esse-sint-quibusdam-qui', 'Doloremque voluptatem esse sint quibusdam qui.', 'Velit eius dolores quibusdam ullam magnam mollitia. Tempora rerum reiciendis quia autem voluptatem mollitia saepe. Blanditiis ipsam voluptatem at sed voluptatem et omnis.', 'uploads/sample.jpg', NULL, 0, 0, '2023-12-20 16:44:45', '2023-12-17 16:44:46', '2023-12-17 16:44:46'),
	(21, 2, 2, 'autem-repudiandae-sit-iure-exercitationem-consectetur-non', 'Autem repudiandae sit iure exercitationem consectetur non.', 'Et qui earum dicta fuga. Ad dolor laborum et ipsum et. Ut voluptatem id tempore nemo illo. Numquam sequi debitis quis illum soluta velit consequatur.', 'uploads/sample.jpg', NULL, 0, 0, '2023-12-20 16:44:45', '2023-12-17 16:44:46', '2023-12-17 16:44:46'),
	(22, 1, 2, 'mollitia-eos-et-aut-dolorum-saepe-recusandae-nulla', 'Mollitia eos et aut dolorum saepe recusandae nulla.', 'Quibusdam recusandae molestiae deserunt autem doloremque recusandae fugiat. Voluptas qui eveniet iste praesentium repellat blanditiis nulla. Eligendi nostrum et consequatur ullam aliquid ut corporis. Sapiente fuga consequatur voluptas aspernatur porro.', 'uploads/sample.jpg', NULL, 1, 1, '2023-12-17 16:44:46', '2023-12-17 16:44:46', '2023-12-17 16:44:46'),
	(23, 2, 2, 'recusandae-rem-et-exercitationem', 'Recusandae rem et exercitationem.', 'Repellat enim velit aliquam accusamus numquam sunt. Ea officiis nobis repellendus accusantium porro odit neque. Similique ipsum quasi sequi dolores. Ipsum beatae velit rem adipisci perferendis eos.', 'uploads/sample.jpg', NULL, 1, 1, '2023-12-17 16:44:46', '2023-12-17 16:44:46', '2023-12-17 16:44:46'),
	(24, 3, 2, 'quia-quas-fugiat-rem-ratione', 'Quia quas fugiat rem ratione.', 'Repellendus explicabo neque sunt quibusdam recusandae aut culpa. Pariatur molestiae non a. Laudantium nulla repellat fugit ducimus voluptate eligendi. Maiores soluta sequi delectus iusto numquam aut.', 'uploads/sample.jpg', NULL, 1, 1, '2023-12-17 16:44:46', '2023-12-17 16:44:46', '2023-12-17 16:44:46');

-- Dumping structure for table hacker_glory_mading.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.migrations: ~0 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(5, '2023_12_11_195210_create_categories_table', 1),
	(6, '2023_12_11_195248_create_magazines_table', 1),
	(7, '2023_12_13_232922_create_bookmarks_table', 1),
	(8, '2023_12_14_225504_create_analytics_table', 1);

-- Dumping structure for table hacker_glory_mading.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table hacker_glory_mading.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.personal_access_tokens: ~0 rows (approximately)

-- Dumping structure for table hacker_glory_mading.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nis` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','penulis','siswa') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'siswa',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_nis_unique` (`nis`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table hacker_glory_mading.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `username`, `email`, `nis`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Admin Ganteng', 'admin', 'admin@hackerglory.id', NULL, 'admin', NULL, '$2y$12$pajjCLnOb3SQf6.1t8MOQ.K.4AOv/MyEmSyfuVcLpJrsSRbxUFZxe', NULL, '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(2, 'Jono Doe', 'jono', 'jonodoe@hackerglory.id', NULL, 'penulis', NULL, '$2y$12$WSAfpo2gucPZVxkhsTv.s.GPsyLV/3qAMUSlYIR4ZwkUIwkVUKCR.', NULL, '2023-12-17 16:44:45', '2023-12-17 16:44:45'),
	(3, 'Joni Doe', 'joni', 'jonidoe@hackerglory.id', '3719281823', 'siswa', NULL, '$2y$12$bYtyWeqMFQQm2Vg3Pn/4deK2CNViQpLjx1.irVSVNhsIxF9xHsu8a', NULL, '2023-12-17 16:44:45', '2023-12-17 16:44:45');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
