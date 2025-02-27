-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 26 fév. 2025 à 21:54
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `backend_pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `rang` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`categorie_id`, `titre`, `image`, `rang`, `created_at`, `updated_at`) VALUES
(1, 'sed', 'https://via.placeholder.com/640x480.png/009988?text=maiores', '88', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(2, 'aut', 'https://via.placeholder.com/640x480.png/0099dd?text=possimus', '2', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(3, 'voluptatum', 'https://via.placeholder.com/640x480.png/003355?text=fugit', '48', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(4, 'quo', 'https://via.placeholder.com/640x480.png/0011ee?text=ea', '65', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(5, 'rem', 'https://via.placeholder.com/640x480.png/00ff88?text=vitae', '87', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(6, 'qui', 'https://via.placeholder.com/640x480.png/0077ee?text=occaecati', '35', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(7, 'atque', 'https://via.placeholder.com/640x480.png/00ddee?text=aut', '95', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(8, 'aut', 'https://via.placeholder.com/640x480.png/00dd33?text=architecto', '11', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(9, 'ipsam', 'https://via.placeholder.com/640x480.png/0033dd?text=esse', '53', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(10, 'voluptatibus', 'https://via.placeholder.com/640x480.png/004422?text=hic', '23', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(11, 'ad', 'https://via.placeholder.com/640x480.png/004433?text=qui', '48', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(12, 'quisquam', 'https://via.placeholder.com/640x480.png/00cc22?text=molestias', '57', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(13, 'reiciendis', 'https://via.placeholder.com/640x480.png/0000aa?text=vero', '69', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(14, 'temporibus', 'https://via.placeholder.com/640x480.png/00eebb?text=consequatur', '80', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(15, 'sunt', 'https://via.placeholder.com/640x480.png/00aa77?text=esse', '6', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(16, 'hic', 'https://via.placeholder.com/640x480.png/0033cc?text=est', '90', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(17, 'delectus', 'https://via.placeholder.com/640x480.png/00aa33?text=est', '28', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(18, 'quos', 'https://via.placeholder.com/640x480.png/00cc55?text=itaque', '34', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(19, 'qui', 'https://via.placeholder.com/640x480.png/00ee00?text=amet', '39', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(20, 'rerum', 'https://via.placeholder.com/640x480.png/00bbdd?text=reiciendis', '18', '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(21, 'numquam', 'https://via.placeholder.com/640x480.png/009988?text=sit', '6', '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(22, 'ducimus', 'https://via.placeholder.com/640x480.png/00ff33?text=similique', '96', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(23, 'sit', 'https://via.placeholder.com/640x480.png/002299?text=ut', '20', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(24, 'magni', 'https://via.placeholder.com/640x480.png/007799?text=sunt', '18', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(25, 'in', 'https://via.placeholder.com/640x480.png/0033bb?text=debitis', '13', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(26, 'minima', 'https://via.placeholder.com/640x480.png/002299?text=quae', '32', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(27, 'repudiandae', 'https://via.placeholder.com/640x480.png/004488?text=dolores', '25', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(28, 'harum', 'https://via.placeholder.com/640x480.png/005566?text=dicta', '86', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(29, 'fugit', 'https://via.placeholder.com/640x480.png/0099bb?text=quod', '71', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(30, 'quo', 'https://via.placeholder.com/640x480.png/009922?text=itaque', '31', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(31, 'est', 'https://via.placeholder.com/640x480.png/00aa00?text=quae', '52', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(32, 'veritatis', 'https://via.placeholder.com/640x480.png/00ddbb?text=ut', '2', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(33, 'voluptates', 'https://via.placeholder.com/640x480.png/00bb55?text=voluptatem', '38', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(34, 'eveniet', 'https://via.placeholder.com/640x480.png/00ee44?text=eligendi', '80', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(35, 'reiciendis', 'https://via.placeholder.com/640x480.png/00cc33?text=nihil', '21', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(36, 'eveniet', 'https://via.placeholder.com/640x480.png/0077ff?text=et', '38', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(37, 'repellendus', 'https://via.placeholder.com/640x480.png/00ee33?text=quas', '25', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(38, 'facilis', 'https://via.placeholder.com/640x480.png/0099bb?text=enim', '31', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(39, 'laudantium', 'https://via.placeholder.com/640x480.png/00aa99?text=aut', '79', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(40, 'porro', 'https://via.placeholder.com/640x480.png/007700?text=non', '68', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(41, 'reprehenderit', 'https://via.placeholder.com/640x480.png/00bb11?text=dignissimos', '39', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(42, 'nostrum', 'https://via.placeholder.com/640x480.png/00bb33?text=autem', '24', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(43, 'tempora', 'https://via.placeholder.com/640x480.png/0033dd?text=reiciendis', '55', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(44, 'est', 'https://via.placeholder.com/640x480.png/008833?text=commodi', '75', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(45, 'et', 'https://via.placeholder.com/640x480.png/0000bb?text=sint', '63', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(46, 'quibusdam', 'https://via.placeholder.com/640x480.png/009955?text=amet', '63', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(47, 'et', 'https://via.placeholder.com/640x480.png/00ee55?text=voluptates', '55', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(48, 'alias', 'https://via.placeholder.com/640x480.png/002266?text=quo', '19', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(49, 'aut', 'https://via.placeholder.com/640x480.png/0077ee?text=cupiditate', '57', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(50, 'delectus', 'https://via.placeholder.com/640x480.png/000011?text=ratione', '29', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(51, 'porro', 'https://via.placeholder.com/640x480.png/00ff99?text=eos', '2', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(52, 'rerum', 'https://via.placeholder.com/640x480.png/00ff44?text=soluta', '95', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(53, 'voluptate', 'https://via.placeholder.com/640x480.png/00aa99?text=occaecati', '70', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(54, 'sed', 'https://via.placeholder.com/640x480.png/00bb11?text=dolores', '71', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(55, 'qui', 'https://via.placeholder.com/640x480.png/00ddbb?text=inventore', '88', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(56, 'architecto', 'https://via.placeholder.com/640x480.png/0033ff?text=neque', '45', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(57, 'qui', 'https://via.placeholder.com/640x480.png/0022dd?text=voluptatem', '50', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(58, 'ut', 'https://via.placeholder.com/640x480.png/00ccdd?text=velit', '17', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(59, 'dolor', 'https://via.placeholder.com/640x480.png/00dd33?text=voluptatibus', '75', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(60, 'odio', 'https://via.placeholder.com/640x480.png/008888?text=dolor', '64', '2025-02-26 19:52:19', '2025-02-26 19:52:19');

-- --------------------------------------------------------

--
-- Structure de la table `code_promotions`
--

CREATE TABLE `code_promotions` (
  `code_promotion_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(120) NOT NULL,
  `reduction` int(11) NOT NULL,
  `dateExpiration` date NOT NULL,
  `nbUtilisation` int(11) NOT NULL,
  `nbUtilisationMax` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `code_promotions`
--

INSERT INTO `code_promotions` (`code_promotion_id`, `code`, `reduction`, `dateExpiration`, `nbUtilisation`, `nbUtilisationMax`, `created_at`, `updated_at`) VALUES
(1, 'PROMO458', 19, '2025-09-16', 2, 23, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(2, 'PROMO123', 26, '2025-03-02', 9, 7, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(3, 'PROMO615', 19, '2025-12-02', 10, 35, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(4, 'PROMO258', 18, '2025-04-07', 9, 38, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(5, 'PROMO989', 87, '2025-04-19', 7, 22, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(6, 'PROMO682', 76, '2025-07-15', 7, 50, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(7, 'PROMO707', 70, '2025-05-19', 7, 39, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(8, 'PROMO577', 97, '2025-05-01', 6, 19, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(9, 'PROMO327', 82, '2025-11-08', 4, 37, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(10, 'PROMO514', 13, '2025-03-08', 3, 3, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(11, 'PROMO965', 71, '2026-02-14', 2, 5, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(12, 'PROMO503', 80, '2025-07-21', 8, 7, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(13, 'PROMO039', 36, '2025-11-16', 4, 30, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(14, 'PROMO116', 8, '2025-10-11', 8, 24, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(15, 'PROMO580', 21, '2025-07-10', 8, 12, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(16, 'PROMO168', 12, '2025-05-22', 1, 7, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(17, 'PROMO522', 12, '2025-08-17', 2, 49, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(18, 'PROMO656', 11, '2025-12-31', 7, 26, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(19, 'PROMO713', 58, '2025-10-28', 2, 28, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(20, 'PROMO849', 92, '2025-10-04', 1, 40, '2025-02-26 19:51:47', '2025-02-26 19:51:47'),
(21, 'PROMO028', 18, '2025-08-12', 6, 19, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(22, 'PROMO011', 9, '2025-07-22', 8, 33, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(23, 'PROMO698', 98, '2025-06-02', 1, 16, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(24, 'PROMO379', 51, '2025-06-10', 5, 49, '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(25, 'PROMO938', 3, '2025-04-20', 4, 50, '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(26, 'PROMO587', 8, '2025-10-11', 10, 12, '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(27, 'PROMO652', 53, '2025-07-31', 6, 50, '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(28, 'PROMO567', 31, '2025-11-16', 2, 42, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(29, 'PROMO188', 70, '2025-09-04', 2, 48, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(30, 'PROMO359', 72, '2025-11-12', 7, 6, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(31, 'PROMO527', 79, '2025-07-28', 3, 13, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(32, 'PROMO306', 34, '2026-01-18', 3, 5, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(33, 'PROMO239', 13, '2025-10-22', 7, 24, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(34, 'PROMO844', 38, '2025-10-14', 5, 48, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(35, 'PROMO307', 71, '2026-01-23', 9, 41, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(36, 'PROMO829', 11, '2025-05-27', 5, 37, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(37, 'PROMO090', 82, '2025-10-29', 6, 28, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(38, 'PROMO648', 46, '2025-08-02', 8, 13, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(39, 'PROMO818', 74, '2025-09-07', 1, 47, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(40, 'PROMO222', 12, '2025-08-10', 9, 12, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(41, 'PROMO913', 95, '2025-06-29', 9, 7, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(42, 'PROMO838', 88, '2026-01-14', 6, 34, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(43, 'PROMO903', 90, '2026-01-27', 2, 28, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(44, 'PROMO186', 68, '2026-02-18', 3, 3, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(45, 'PROMO021', 98, '2025-03-13', 3, 32, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(46, 'PROMO915', 98, '2025-10-04', 8, 49, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(47, 'PROMO309', 49, '2025-04-11', 3, 12, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(48, 'PROMO776', 82, '2025-05-24', 4, 26, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(49, 'PROMO287', 55, '2025-06-24', 6, 21, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(50, 'PROMO114', 25, '2025-03-30', 7, 9, '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(51, 'PROMO052', 27, '2025-09-05', 9, 40, '2025-02-26 19:52:07', '2025-02-26 19:52:07');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `commande_id` bigint(20) UNSIGNED NOT NULL,
  `panier_id` bigint(20) UNSIGNED NOT NULL,
  `code_promotion_id` bigint(20) UNSIGNED DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `etatCommande` enum('En attente','Traité','Expédiée','Livrée','Annulée') NOT NULL DEFAULT 'En attente',
  `modeLivraison` enum('CommandeLivraison','CommandeRetraitDrive') NOT NULL,
  `horaireRetrait` varchar(255) DEFAULT NULL,
  `livreur_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dateLivraison` date DEFAULT NULL,
  `etatLivraison` enum('Non livrée','En cours de livraison','Livrée','Livraison échouée') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`commande_id`, `panier_id`, `code_promotion_id`, `total`, `etatCommande`, `modeLivraison`, `horaireRetrait`, `livreur_id`, `dateLivraison`, `etatLivraison`, `created_at`, `updated_at`) VALUES
(1, 1, 21, 426.68, 'Expédiée', 'CommandeLivraison', NULL, NULL, '2025-03-04', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(2, 2, 22, 411.23, 'En attente', 'CommandeLivraison', NULL, NULL, '2025-03-19', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(3, 3, 23, 92.26, 'Livrée', 'CommandeLivraison', NULL, NULL, '2025-03-03', 'En cours de livraison', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(4, 4, NULL, 97.04, 'Annulée', 'CommandeLivraison', NULL, NULL, '2025-03-03', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(5, 5, NULL, 397.29, 'Expédiée', 'CommandeLivraison', NULL, 5, '2025-03-24', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(6, 6, 24, 12.37, 'Traité', 'CommandeLivraison', NULL, 7, '2025-03-16', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(7, 7, NULL, 184.90, 'Expédiée', 'CommandeLivraison', NULL, 9, '2025-03-15', 'Livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(8, 8, NULL, 49.43, 'Annulée', 'CommandeLivraison', NULL, NULL, '2025-03-21', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(9, 9, NULL, 426.06, 'En attente', 'CommandeLivraison', NULL, NULL, '2025-03-11', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(10, 10, 25, 360.77, 'Expédiée', 'CommandeLivraison', NULL, 13, '2025-03-06', 'Livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(11, 11, NULL, 203.95, 'En attente', 'CommandeLivraison', NULL, 15, '2025-03-23', 'Livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(12, 12, 26, 353.75, 'Livrée', 'CommandeLivraison', NULL, NULL, '2025-03-15', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(13, 13, NULL, 378.65, 'Expédiée', 'CommandeLivraison', NULL, 18, '2025-03-19', 'En cours de livraison', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(14, 14, NULL, 53.15, 'Traité', 'CommandeLivraison', NULL, 20, '2025-03-22', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(15, 15, NULL, 54.00, 'Livrée', 'CommandeLivraison', NULL, 22, '2025-03-11', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(16, 16, NULL, 197.52, 'Traité', 'CommandeLivraison', NULL, 24, '2025-03-13', 'Livraison échouée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(17, 17, NULL, 442.51, 'Annulée', 'CommandeLivraison', NULL, 26, '2025-03-05', 'Livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(18, 18, NULL, 86.10, 'En attente', 'CommandeLivraison', NULL, NULL, '2025-03-03', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(19, 19, 27, 158.00, 'En attente', 'CommandeLivraison', NULL, 29, '2025-03-04', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(20, 20, 28, 236.17, 'Expédiée', 'CommandeLivraison', NULL, NULL, '2025-03-22', 'Non livrée', '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(21, 21, NULL, 491.88, 'Traité', 'CommandeRetraitDrive', '21:10', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(22, 22, NULL, 126.47, 'Traité', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(23, 23, 29, 490.56, 'Traité', 'CommandeRetraitDrive', '04:41', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(24, 24, NULL, 221.42, 'Expédiée', 'CommandeRetraitDrive', '04:09', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(25, 25, NULL, 41.07, 'En attente', 'CommandeRetraitDrive', '17:24', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(26, 26, 30, 325.77, 'Livrée', 'CommandeRetraitDrive', '16:01', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(27, 27, NULL, 341.03, 'Traité', 'CommandeRetraitDrive', '19:33', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(28, 28, 31, 427.17, 'Traité', 'CommandeRetraitDrive', '07:25', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(29, 29, 32, 64.22, 'En attente', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(30, 30, NULL, 499.87, 'Traité', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(31, 31, 33, 461.62, 'Livrée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(32, 32, 34, 468.59, 'Livrée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(33, 33, 35, 225.20, 'Annulée', 'CommandeRetraitDrive', '02:26', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(34, 34, 36, 24.06, 'Livrée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(35, 35, 37, 46.87, 'Annulée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(36, 36, NULL, 348.47, 'Annulée', 'CommandeRetraitDrive', '02:54', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(37, 37, NULL, 476.36, 'Traité', 'CommandeRetraitDrive', '16:35', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(38, 38, 38, 229.02, 'Annulée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(39, 39, 39, 19.55, 'Traité', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(40, 40, 40, 181.23, 'Annulée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(41, 41, NULL, 443.71, 'Traité', 'CommandeRetraitDrive', '06:06', NULL, NULL, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(42, 42, 41, 209.75, 'En attente', 'CommandeLivraison', NULL, NULL, '2025-03-07', 'Livraison échouée', '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(43, 43, 42, 45.24, 'Expédiée', 'CommandeLivraison', NULL, NULL, '2025-03-14', 'Livrée', '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(44, 44, NULL, 250.71, 'Expédiée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(45, 45, NULL, 46.74, 'Traité', 'CommandeLivraison', NULL, NULL, '2025-03-02', 'Livrée', '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(46, 46, 43, 137.73, 'Traité', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(47, 47, NULL, 87.17, 'Annulée', 'CommandeLivraison', NULL, NULL, '2025-03-20', 'En cours de livraison', '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(48, 48, 44, 119.10, 'Annulée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(49, 49, 45, 447.70, 'Traité', 'CommandeRetraitDrive', '17:10', NULL, NULL, NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(50, 50, NULL, 352.14, 'Livrée', 'CommandeLivraison', NULL, NULL, '2025-03-09', 'En cours de livraison', '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(51, 51, NULL, 391.22, 'Traité', 'CommandeLivraison', NULL, 71, '2025-03-12', 'En cours de livraison', '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(52, 52, 46, 194.56, 'Annulée', 'CommandeRetraitDrive', '18:12', NULL, NULL, NULL, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(53, 53, 47, 360.34, 'Annulée', 'CommandeRetraitDrive', '05:25', NULL, NULL, NULL, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(54, 54, NULL, 412.95, 'En attente', 'CommandeLivraison', NULL, 75, '2025-03-14', 'Livraison échouée', '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(55, 55, NULL, 347.26, 'Annulée', 'CommandeLivraison', NULL, 77, '2025-03-10', 'Livrée', '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(56, 56, NULL, 89.01, 'Expédiée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(57, 57, NULL, 88.98, 'Livrée', 'CommandeRetraitDrive', '13:34', NULL, NULL, NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(58, 58, NULL, 304.69, 'Livrée', 'CommandeLivraison', NULL, NULL, '2025-03-15', 'Non livrée', '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(59, 59, NULL, 83.14, 'En attente', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(60, 60, NULL, 163.82, 'Traité', 'CommandeLivraison', NULL, NULL, '2025-03-13', 'Livrée', '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(61, 61, 48, 266.65, 'En attente', 'CommandeLivraison', NULL, 84, '2025-03-20', 'Livrée', '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(62, 62, 49, 37.05, 'En attente', 'CommandeRetraitDrive', '15:01', NULL, NULL, NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(63, 63, NULL, 267.11, 'Expédiée', 'CommandeRetraitDrive', NULL, NULL, NULL, NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(64, 64, NULL, 86.34, 'En attente', 'CommandeLivraison', NULL, NULL, '2025-03-24', 'Livrée', '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(65, 65, NULL, 42.91, 'Livrée', 'CommandeLivraison', NULL, NULL, '2025-03-01', 'En cours de livraison', '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(66, 66, NULL, 188.88, 'Traité', 'CommandeRetraitDrive', '18:11', NULL, NULL, NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(67, 67, NULL, 144.13, 'Livrée', 'CommandeLivraison', NULL, 91, '2025-03-01', 'En cours de livraison', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(68, 68, NULL, 229.08, 'Annulée', 'CommandeLivraison', NULL, 93, '2025-03-08', 'Livraison échouée', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(69, 69, 50, 294.00, 'Traité', 'CommandeLivraison', NULL, 95, '2025-03-25', 'Non livrée', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(70, 70, NULL, 389.32, 'Livrée', 'CommandeLivraison', NULL, 97, '2025-03-11', 'Livrée', '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(71, 71, 51, 205.16, 'Expédiée', 'CommandeLivraison', NULL, NULL, '2025-03-20', 'Non livrée', '2025-02-26 19:52:07', '2025-02-26 19:52:07');

-- --------------------------------------------------------

--
-- Structure de la table `couleurs`
--

CREATE TABLE `couleurs` (
  `couleur_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `code_hex` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `couleurs`
--

INSERT INTO `couleurs` (`couleur_id`, `nom`, `code_hex`) VALUES
(1, 'LightSteelBlue', '#4da2f1'),
(2, 'YellowGreen', '#98e7a4'),
(3, 'LightYellow', '#5abf2a'),
(4, 'DarkKhaki', '#4af51c'),
(5, 'YellowGreen', '#926f32'),
(6, 'Purple', '#3b72e2'),
(7, 'Fuchsia', '#3ad4fb'),
(8, 'Linen', '#3eeb4a'),
(9, 'DarkCyan', '#2b288f'),
(10, 'GhostWhite', '#e52201'),
(11, 'Crimson', '#c48224'),
(12, 'Teal', '#a1f58f'),
(13, 'MediumAquaMarine', '#542623'),
(14, 'Chartreuse', '#9fa490'),
(15, 'Salmon', '#63ce29'),
(16, 'PeachPuff', '#e9c3eb'),
(17, 'PaleGreen', '#ef23b0'),
(18, 'PaleGreen', '#cdcfcb'),
(19, 'MediumSlateBlue', '#b9d591'),
(20, 'RosyBrown', '#aba02e');

-- --------------------------------------------------------

--
-- Structure de la table `detail_factures`
--

CREATE TABLE `detail_factures` (
  `detail_facture_id` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `totalLigneHT` decimal(10,2) NOT NULL,
  `tvaLigne` decimal(10,2) NOT NULL,
  `totalLigneTTC` decimal(10,2) NOT NULL,
  `facture_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `detail_factures`
--

INSERT INTO `detail_factures` (`detail_facture_id`, `quantite`, `prix_unitaire`, `totalLigneHT`, `tvaLigne`, `totalLigneTTC`, `facture_id`, `created_at`, `updated_at`) VALUES
(1, 2, 45.20, 90.40, 18.08, 108.48, 1, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(2, 10, 383.66, 3836.60, 767.32, 4603.92, 2, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(3, 9, 187.98, 1691.82, 338.36, 2030.18, 3, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(4, 9, 95.90, 863.10, 172.62, 1035.72, 4, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(5, 8, 309.63, 2477.04, 495.41, 2972.45, 5, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(6, 5, 142.84, 714.20, 142.84, 857.04, 6, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(7, 5, 448.79, 2243.95, 448.79, 2692.74, 7, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(8, 6, 263.45, 1580.70, 316.14, 1896.84, 8, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(9, 10, 2.07, 20.70, 4.14, 24.84, 9, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(10, 6, 313.15, 1878.90, 375.78, 2254.68, 10, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(11, 8, 445.94, 3567.52, 713.50, 4281.02, 11, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(12, 9, 172.31, 1550.79, 310.16, 1860.95, 12, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(13, 5, 16.41, 82.05, 16.41, 98.46, 13, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(14, 2, 498.02, 996.04, 199.21, 1195.25, 14, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(15, 7, 139.90, 979.30, 195.86, 1175.16, 15, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(16, 5, 188.69, 943.45, 188.69, 1132.14, 16, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(17, 9, 340.73, 3066.57, 613.31, 3679.88, 17, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(18, 9, 229.26, 2063.34, 412.67, 2476.01, 18, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(19, 1, 391.29, 391.29, 78.26, 469.55, 19, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(20, 10, 342.84, 3428.40, 685.68, 4114.08, 20, '2025-02-26 19:52:02', '2025-02-26 19:52:02');

-- --------------------------------------------------------

--
-- Structure de la table `factures`
--

CREATE TABLE `factures` (
  `facture_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `tva` decimal(5,2) NOT NULL,
  `totalHT` decimal(10,2) NOT NULL,
  `totalTTC` decimal(10,2) NOT NULL,
  `dtype` enum('facture_commandes','facture_fournisseurs') NOT NULL,
  `commande_id` bigint(20) UNSIGNED DEFAULT NULL,
  `fournisseur_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remise` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `factures`
--

INSERT INTO `factures` (`facture_id`, `date`, `tva`, `totalHT`, `totalTTC`, `dtype`, `commande_id`, `fournisseur_id`, `remise`, `created_at`, `updated_at`) VALUES
(1, '1977-06-29', 16.43, 783.42, 912.14, 'facture_commandes', 41, NULL, 42.50, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(2, '1982-05-07', 4.11, 906.75, 944.02, 'facture_fournisseurs', NULL, 53, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(3, '2023-02-09', 11.84, 168.36, 188.29, 'facture_commandes', 42, NULL, 0.14, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(4, '2002-08-20', 13.70, 738.25, 839.39, 'facture_fournisseurs', NULL, 55, NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(5, '1993-09-12', 2.99, 257.28, 264.97, 'facture_fournisseurs', NULL, 56, NULL, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(6, '1992-09-26', 19.06, 64.27, 76.52, 'facture_commandes', 43, NULL, 33.49, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(7, '1997-12-12', 10.99, 476.12, 528.45, 'facture_fournisseurs', NULL, 58, NULL, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(8, '2018-04-20', 1.28, 661.68, 670.15, 'facture_fournisseurs', NULL, 59, NULL, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(9, '2013-12-19', 13.98, 436.64, 497.68, 'facture_fournisseurs', NULL, 60, NULL, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(10, '2008-02-20', 0.79, 572.85, 577.38, 'facture_commandes', 44, NULL, 2.29, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(11, '1971-01-01', 10.70, 522.61, 578.53, 'facture_commandes', 45, NULL, 17.26, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(12, '1990-02-16', 19.26, 777.59, 927.35, 'facture_fournisseurs', NULL, 63, NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(13, '2007-03-07', 0.68, 734.63, 739.63, 'facture_fournisseurs', NULL, 64, NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(14, '1994-10-27', 12.85, 53.00, 59.81, 'facture_commandes', 46, NULL, 23.28, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(15, '2024-03-28', 15.94, 308.10, 357.21, 'facture_commandes', 47, NULL, 38.59, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(16, '2013-02-04', 5.53, 829.87, 875.76, 'facture_commandes', 48, NULL, 9.74, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(17, '1976-08-07', 7.29, 695.28, 745.97, 'facture_commandes', 49, NULL, 36.12, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(18, '1973-02-24', 11.73, 15.05, 16.82, 'facture_fournisseurs', NULL, 69, NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(19, '2006-11-30', 1.81, 158.85, 161.73, 'facture_commandes', 50, NULL, 46.12, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(20, '1992-09-20', 5.45, 813.24, 857.56, 'facture_commandes', 51, NULL, 12.84, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(21, '1978-08-20', 19.97, 66.49, 79.77, 'facture_commandes', 52, NULL, 17.27, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(22, '2015-01-30', 15.01, 308.08, 354.32, 'facture_commandes', 53, NULL, 13.01, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(23, '2010-09-28', 15.78, 635.29, 735.54, 'facture_commandes', 54, NULL, 47.11, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(24, '2018-08-28', 6.51, 481.85, 513.22, 'facture_commandes', 55, NULL, 20.52, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(25, '2000-11-21', 18.21, 879.54, 1039.70, 'facture_commandes', 56, NULL, 34.43, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(26, '2003-05-30', 14.52, 976.22, 1117.97, 'facture_commandes', 57, NULL, 21.17, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(27, '2016-04-10', 17.49, 327.59, 384.89, 'facture_commandes', 58, NULL, 41.72, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(28, '2010-01-07', 16.65, 797.83, 930.67, 'facture_commandes', 59, NULL, 2.21, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(29, '1971-08-02', 5.86, 438.83, 464.55, 'facture_commandes', 60, NULL, 47.88, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(30, '1972-02-20', 17.82, 455.07, 536.16, 'facture_commandes', 61, NULL, 41.39, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(31, '2003-08-26', 3.05, 700.01, 721.36, 'facture_commandes', 62, NULL, 11.83, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(32, '2016-09-19', 8.84, 733.46, 798.30, 'facture_commandes', 63, NULL, 39.21, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(33, '2006-01-15', 7.13, 593.35, 635.66, 'facture_commandes', 64, NULL, 12.95, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(34, '2007-03-13', 5.83, 649.11, 686.95, 'facture_commandes', 65, NULL, 40.55, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(35, '2008-03-14', 2.68, 223.49, 229.48, 'facture_commandes', 66, NULL, 12.90, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(36, '1989-07-29', 12.32, 671.14, 753.82, 'facture_commandes', 67, NULL, 27.38, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(37, '2016-12-04', 8.13, 276.98, 299.50, 'facture_commandes', 68, NULL, 2.56, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(38, '2015-11-08', 16.25, 445.17, 517.51, 'facture_commandes', 69, NULL, 44.14, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(39, '2025-02-05', 8.80, 489.00, 532.03, 'facture_commandes', 70, NULL, 40.03, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(40, '2004-06-18', 15.79, 571.30, 661.51, 'facture_commandes', 71, NULL, 24.74, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(41, '1972-12-15', 10.15, 91.67, 100.97, 'facture_fournisseurs', NULL, 100, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(42, '2022-04-10', 19.56, 108.02, 129.15, 'facture_fournisseurs', NULL, 101, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(43, '1994-04-05', 12.12, 749.91, 840.80, 'facture_fournisseurs', NULL, 102, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(44, '1975-02-21', 3.98, 282.47, 293.71, 'facture_fournisseurs', NULL, 103, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(45, '2021-12-10', 2.52, 541.76, 555.41, 'facture_fournisseurs', NULL, 104, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(46, '2010-03-09', 3.67, 142.04, 147.25, 'facture_fournisseurs', NULL, 105, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(47, '1996-09-16', 8.33, 643.87, 697.50, 'facture_fournisseurs', NULL, 106, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(48, '1999-10-23', 12.62, 313.58, 353.15, 'facture_fournisseurs', NULL, 107, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(49, '2022-12-14', 5.67, 764.44, 807.78, 'facture_fournisseurs', NULL, 108, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(50, '2024-02-27', 9.81, 964.72, 1059.36, 'facture_fournisseurs', NULL, 109, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(51, '2013-05-07', 6.01, 592.73, 628.35, 'facture_fournisseurs', NULL, 110, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(52, '2014-07-13', 17.33, 575.14, 674.81, 'facture_fournisseurs', NULL, 111, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(53, '1985-08-14', 17.37, 784.36, 920.60, 'facture_fournisseurs', NULL, 112, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(54, '2006-08-02', 11.20, 817.80, 909.39, 'facture_fournisseurs', NULL, 113, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(55, '1999-08-31', 13.54, 470.46, 534.16, 'facture_fournisseurs', NULL, 114, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(56, '1970-11-05', 8.24, 724.40, 784.09, 'facture_fournisseurs', NULL, 115, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(57, '2014-11-20', 1.22, 305.60, 309.33, 'facture_fournisseurs', NULL, 116, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(58, '2010-04-13', 10.75, 928.29, 1028.08, 'facture_fournisseurs', NULL, 117, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(59, '1970-04-03', 18.44, 406.28, 481.20, 'facture_fournisseurs', NULL, 118, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(60, '2018-10-08', 6.34, 828.49, 881.02, 'facture_fournisseurs', NULL, 119, NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `horaires`
--

CREATE TABLE `horaires` (
  `horaire_id` bigint(20) UNSIGNED NOT NULL,
  `jour` enum('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') NOT NULL,
  `ouvert` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `horaires`
--

INSERT INTO `horaires` (`horaire_id`, `jour`, `ouvert`) VALUES
(1, 'Dimanche', 1),
(2, 'Vendredi', 0),
(3, 'Mardi', 1),
(4, 'Mercredi', 1),
(5, 'Lundi', 0),
(6, 'Samedi', 0),
(7, 'Jeudi', 1);

-- --------------------------------------------------------

--
-- Structure de la table `horaire_periode_horaire`
--

CREATE TABLE `horaire_periode_horaire` (
  `horaire_id` bigint(20) UNSIGNED NOT NULL,
  `periode_horaire_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jour_feries`
--

CREATE TABLE `jour_feries` (
  `jour_ferie_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `jour_feries`
--

INSERT INTO `jour_feries` (`jour_ferie_id`, `title`, `start`, `end`) VALUES
(1, 'in', '2025-06-09', '2025-06-10'),
(2, 'sunt', '2025-09-12', '2025-09-15'),
(3, 'molestias', '2025-10-26', '2025-10-28'),
(4, 'aliquam', '2025-08-22', '2025-08-22'),
(5, 'fuga', '2025-12-06', '2025-12-08'),
(6, 'culpa', '2025-12-01', '2025-12-03'),
(7, 'consequuntur', '2025-04-25', '2025-04-25'),
(8, 'explicabo', '2025-07-27', '2025-07-30'),
(9, 'nulla', '2025-08-21', '2025-08-23'),
(10, 'cumque', '2024-12-17', '2024-12-18'),
(11, 'quisquam', '2025-10-11', '2025-10-13'),
(12, 'omnis', '2025-05-07', '2025-05-10'),
(13, 'quas', '2026-01-25', '2026-01-27'),
(14, 'dolores', '2025-09-14', '2025-09-16'),
(15, 'laboriosam', '2024-04-24', '2024-04-27'),
(16, 'dolores', '2024-03-09', '2024-03-09'),
(17, 'incidunt', '2024-05-16', '2024-05-17'),
(18, 'error', '2025-04-15', '2025-04-17'),
(19, 'eos', '2025-04-25', '2025-04-27'),
(20, 'inventore', '2024-11-07', '2024-11-10');

-- --------------------------------------------------------

--
-- Structure de la table `marques`
--

CREATE TABLE `marques` (
  `marque_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `marques`
--

INSERT INTO `marques` (`marque_id`, `nom`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Heller PLC', 'https://via.placeholder.com/640x480.png/004466?text=ipsa', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(2, 'Bednar-Hamill', 'https://via.placeholder.com/640x480.png/008833?text=est', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(3, 'Kling-Kovacek', 'https://via.placeholder.com/640x480.png/004433?text=atque', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(4, 'Kihn Inc', 'https://via.placeholder.com/640x480.png/007711?text=et', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(5, 'Shields, McCullough and Sanford', 'https://via.placeholder.com/640x480.png/008855?text=amet', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(6, 'Rau-McLaughlin', 'https://via.placeholder.com/640x480.png/001111?text=architecto', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(7, 'Stoltenberg, Jenkins and Collier', 'https://via.placeholder.com/640x480.png/0055cc?text=autem', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(8, 'Beatty-Murphy', 'https://via.placeholder.com/640x480.png/0055ee?text=tenetur', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(9, 'O\'Connell-Waelchi', 'https://via.placeholder.com/640x480.png/004488?text=vel', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(10, 'Botsford LLC', 'https://via.placeholder.com/640x480.png/00aa44?text=officia', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(11, 'Roob Ltd', 'https://via.placeholder.com/640x480.png/00bbdd?text=et', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(12, 'Medhurst-Predovic', 'https://via.placeholder.com/640x480.png/00dd99?text=nihil', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(13, 'Rempel Ltd', 'https://via.placeholder.com/640x480.png/00dd33?text=unde', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(14, 'Mayer Inc', 'https://via.placeholder.com/640x480.png/005544?text=optio', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(15, 'Ward, Lang and Daugherty', 'https://via.placeholder.com/640x480.png/00aacc?text=ut', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(16, 'Zulauf-Cassin', 'https://via.placeholder.com/640x480.png/0055ee?text=exercitationem', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(17, 'Schiller Group', 'https://via.placeholder.com/640x480.png/00cc44?text=deserunt', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(18, 'Jast-Fay', 'https://via.placeholder.com/640x480.png/00cc66?text=placeat', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(19, 'Hettinger, Quitzon and Bergnaum', 'https://via.placeholder.com/640x480.png/001122?text=dolorem', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(20, 'Ortiz-Kerluke', 'https://via.placeholder.com/640x480.png/0055bb?text=tenetur', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(21, 'Becker, Yundt and Stehr', 'https://via.placeholder.com/640x480.png/009911?text=reprehenderit', '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(22, 'Wiegand, Runte and Tillman', 'https://via.placeholder.com/640x480.png/00dd66?text=in', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(23, 'Simonis, Nitzsche and Douglas', 'https://via.placeholder.com/640x480.png/0099dd?text=ea', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(24, 'Fadel, McClure and Hintz', 'https://via.placeholder.com/640x480.png/0099bb?text=vitae', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(25, 'Rice Inc', 'https://via.placeholder.com/640x480.png/000066?text=quis', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(26, 'Leannon-Corwin', 'https://via.placeholder.com/640x480.png/00bb11?text=repellat', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(27, 'Adams, Bernier and Durgan', 'https://via.placeholder.com/640x480.png/000033?text=sapiente', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(28, 'Kihn Group', 'https://via.placeholder.com/640x480.png/0033ee?text=quod', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(29, 'Jacobs, Bernhard and Towne', 'https://via.placeholder.com/640x480.png/00ee99?text=qui', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(30, 'Reichel, Rippin and Morar', 'https://via.placeholder.com/640x480.png/00eeff?text=modi', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(31, 'Kassulke-Huels', 'https://via.placeholder.com/640x480.png/006655?text=voluptas', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(32, 'Daugherty-Hyatt', 'https://via.placeholder.com/640x480.png/003355?text=accusantium', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(33, 'Prosacco-Bednar', 'https://via.placeholder.com/640x480.png/00ffcc?text=odit', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(34, 'Bailey-Leffler', 'https://via.placeholder.com/640x480.png/00cc55?text=inventore', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(35, 'Erdman-Stamm', 'https://via.placeholder.com/640x480.png/0099cc?text=velit', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(36, 'Kessler-Wisozk', 'https://via.placeholder.com/640x480.png/0066bb?text=odit', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(37, 'Hagenes, Weissnat and Mayer', 'https://via.placeholder.com/640x480.png/0000aa?text=ad', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(38, 'Roberts PLC', 'https://via.placeholder.com/640x480.png/007711?text=et', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(39, 'Bednar, Dare and Corwin', 'https://via.placeholder.com/640x480.png/004466?text=perferendis', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(40, 'Nitzsche-Kirlin', 'https://via.placeholder.com/640x480.png/00ffff?text=et', '2025-02-26 19:52:19', '2025-02-26 19:52:19');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_02_10_173014_create_categories_table', 1),
(5, '2025_02_10_173245_create_code_promotions_table', 1),
(6, '2025_02_10_173255_create_promotions_table', 1),
(7, '2025_02_10_173302_create_marques_table', 1),
(8, '2025_02_11_173008_create_sous_categories_table', 1),
(9, '2025_02_13_173314_create_jour_feries_table', 1),
(10, '2025_02_13_173330_create_periode_horaires_table', 1),
(11, '2025_02_14_173322_create_horaires_table', 1),
(12, '2025_02_14_173328_create_horaire_periode_horaire_table', 1),
(13, '2025_02_15_172958_create_produits_table', 1),
(14, '2025_02_15_173028_create_paniers_table', 1),
(15, '2025_02_16_173028_create_panier_produit_table', 1),
(16, '2025_02_17_173159_create_commandes_table', 1),
(17, '2025_02_17_173407_create_factures_table', 1),
(18, '2025_02_18_122243_create_personal_access_tokens_table', 1),
(19, '2025_02_18_173102_create_detail_factures_table', 1),
(20, '2025_02_25_110716_create_couleurs_table', 1),
(21, '2025_02_25_110843_create_produit_couleur_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `paniers`
--

CREATE TABLE `paniers` (
  `panier_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `paniers`
--

INSERT INTO `paniers` (`panier_id`, `client_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 6),
(6, 8),
(7, 10),
(8, 11),
(9, 12),
(10, 14),
(11, 16),
(12, 17),
(13, 19),
(14, 21),
(15, 23),
(16, 25),
(17, 27),
(18, 28),
(19, 30),
(20, 31),
(21, 32),
(22, 33),
(23, 34),
(24, 35),
(25, 36),
(26, 37),
(27, 38),
(28, 39),
(29, 40),
(30, 41),
(31, 42),
(32, 43),
(33, 44),
(34, 45),
(35, 46),
(36, 47),
(37, 48),
(38, 49),
(39, 50),
(40, 51),
(41, 52),
(42, 54),
(43, 57),
(44, 61),
(45, 62),
(46, 65),
(47, 66),
(48, 67),
(49, 68),
(50, 70),
(51, 72),
(52, 73),
(53, 74),
(54, 76),
(55, 78),
(56, 79),
(57, 80),
(58, 81),
(59, 82),
(60, 83),
(61, 85),
(62, 86),
(63, 87),
(64, 88),
(65, 89),
(66, 90),
(67, 92),
(68, 94),
(69, 96),
(70, 98),
(71, 99),
(72, 120),
(73, 121),
(74, 122),
(75, 123),
(76, 124),
(77, 125),
(78, 126),
(79, 127),
(80, 128),
(81, 129),
(82, 130),
(83, 131),
(84, 132),
(85, 133),
(86, 134),
(87, 135),
(88, 136),
(89, 137),
(90, 138),
(91, 139);

-- --------------------------------------------------------

--
-- Structure de la table `panier_produit`
--

CREATE TABLE `panier_produit` (
  `panier_id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `periode_horaires`
--

CREATE TABLE `periode_horaires` (
  `periode_horaire_id` bigint(20) UNSIGNED NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `periode_horaires`
--

INSERT INTO `periode_horaires` (`periode_horaire_id`, `heure_debut`, `heure_fin`) VALUES
(1, '19:51:00', '21:48:00'),
(2, '05:49:00', '03:09:00'),
(3, '22:24:00', '22:33:00'),
(4, '08:59:00', '07:42:00'),
(5, '11:35:00', '05:21:00'),
(6, '02:49:00', '16:49:00'),
(7, '09:31:00', '06:01:00'),
(8, '00:15:00', '22:33:00'),
(9, '10:45:00', '17:11:00'),
(10, '07:26:00', '02:36:00'),
(11, '03:18:00', '21:05:00'),
(12, '08:38:00', '01:32:00'),
(13, '08:07:00', '20:24:00'),
(14, '14:09:00', '05:24:00'),
(15, '02:09:00', '17:23:00'),
(16, '03:25:00', '23:23:00'),
(17, '00:34:00', '13:05:00'),
(18, '23:51:00', '19:32:00'),
(19, '20:54:00', '08:10:00'),
(20, '18:00:00', '23:20:00');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Users\\User', 180, ' ', 'bf65f833960fd705b3e3df27797a960828b56eb1bfa2fd283d255a12687cdd0c', '[\"*\"]', '2025-02-26 19:53:35', NULL, '2025-02-26 19:53:34', '2025-02-26 19:53:35');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `marque_id` bigint(20) UNSIGNED NOT NULL,
  `sous_categorie_id` bigint(20) UNSIGNED NOT NULL,
  `promotion_id` bigint(20) UNSIGNED DEFAULT NULL,
  `fournisseur_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `status` enum('Disponible','Rupture de stock','En promotion','Hors vente') NOT NULL DEFAULT 'Disponible',
  `description` varchar(255) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`produit_id`, `marque_id`, `sous_categorie_id`, `promotion_id`, `fournisseur_id`, `nom`, `status`, `description`, `prix`, `image`, `created_at`, `updated_at`) VALUES
(1, 21, 1, 1, 140, 'et', 'Disponible', 'Quis ex quo sit provident porro aliquid voluptate.', 465.74, 'https://via.placeholder.com/640x480.png/000022?text=pariatur', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(2, 22, 2, 2, 141, 'eveniet', 'Disponible', 'Tempora cupiditate eligendi nihil error ullam nihil quasi.', 604.22, 'https://via.placeholder.com/640x480.png/0066cc?text=amet', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(3, 23, 3, 3, 142, 'velit', 'Hors vente', 'Nisi ab reiciendis facere.', 424.32, 'https://via.placeholder.com/640x480.png/00ee22?text=molestiae', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(4, 24, 4, 4, 143, 'illo', 'Disponible', 'Est sint neque accusamus quis optio est et.', 384.06, 'https://via.placeholder.com/640x480.png/00bb33?text=ea', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(5, 25, 5, 5, 144, 'qui', 'Disponible', 'Debitis iusto ipsam doloremque quibusdam.', 650.27, 'https://via.placeholder.com/640x480.png/00bb33?text=rem', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(6, 26, 6, 6, 145, 'quos', 'Hors vente', 'Qui et officia eos possimus sunt voluptate vero.', 956.73, 'https://via.placeholder.com/640x480.png/009966?text=quia', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(7, 27, 7, 7, 146, 'dolores', 'Disponible', 'Error perferendis inventore aut dolor iste nostrum qui.', 249.32, 'https://via.placeholder.com/640x480.png/00cc00?text=optio', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(8, 28, 8, 8, 147, 'consequuntur', 'Hors vente', 'Enim et commodi repudiandae quo aperiam nesciunt.', 457.87, 'https://via.placeholder.com/640x480.png/0077bb?text=omnis', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(9, 29, 9, 9, 148, 'cum', 'En promotion', 'Harum nulla dicta dolorem magnam repellat autem.', 577.68, 'https://via.placeholder.com/640x480.png/00ffcc?text=ut', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(10, 30, 10, 10, 149, 'earum', 'En promotion', 'Suscipit sit enim quia adipisci voluptas sunt.', 874.37, 'https://via.placeholder.com/640x480.png/00ccdd?text=eum', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(11, 31, 11, 11, 150, 'dolores', 'Rupture de stock', 'Dolores quo quia iste sunt autem nostrum.', 321.42, 'https://via.placeholder.com/640x480.png/0077cc?text=recusandae', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(12, 32, 12, 12, 151, 'neque', 'Rupture de stock', 'In laboriosam sint est eos accusamus provident ratione velit.', 502.25, 'https://via.placeholder.com/640x480.png/0099aa?text=ea', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(13, 33, 13, 13, 152, 'ea', 'En promotion', 'Facilis voluptatum est fuga hic et est.', 687.07, 'https://via.placeholder.com/640x480.png/0033bb?text=natus', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(14, 34, 14, 14, 153, 'necessitatibus', 'En promotion', 'Mollitia consequatur maxime aut corporis voluptate illo et.', 711.28, 'https://via.placeholder.com/640x480.png/00ee55?text=nihil', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(15, 35, 15, 15, 154, 'blanditiis', 'En promotion', 'Voluptatem autem dolor sunt qui fuga quia.', 118.74, 'https://via.placeholder.com/640x480.png/00dd44?text=ad', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(16, 36, 16, 16, 155, 'aut', 'En promotion', 'Repellat mollitia porro rerum deserunt impedit.', 143.76, 'https://via.placeholder.com/640x480.png/00cc66?text=quia', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(17, 37, 17, 17, 156, 'et', 'Rupture de stock', 'Quo maxime quis qui quia quia doloremque ipsam.', 945.95, 'https://via.placeholder.com/640x480.png/0055dd?text=repudiandae', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(18, 38, 18, 18, 157, 'in', 'En promotion', 'Architecto reiciendis quis hic id.', 734.40, 'https://via.placeholder.com/640x480.png/004455?text=cumque', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(19, 39, 19, 19, 158, 'quia', 'Rupture de stock', 'Qui neque animi exercitationem et ea accusamus exercitationem.', 161.04, 'https://via.placeholder.com/640x480.png/0033ff?text=soluta', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(20, 40, 20, 20, 159, 'aut', 'Rupture de stock', 'Est porro nulla quis inventore qui in iusto incidunt.', 486.76, 'https://via.placeholder.com/640x480.png/006611?text=ex', '2025-02-26 19:52:19', '2025-02-26 19:52:19');

-- --------------------------------------------------------

--
-- Structure de la table `produit_couleur`
--

CREATE TABLE `produit_couleur` (
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `couleur_id` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `reduction` int(11) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `promotions`
--

INSERT INTO `promotions` (`promotion_id`, `nom`, `reduction`, `dateDebut`, `dateFin`, `created_at`, `updated_at`) VALUES
(1, 'aut Promo', 9, '2025-01-22', '2025-03-21', '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(2, 'a Promo', 14, '2025-01-13', '2025-03-09', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(3, 'sapiente Promo', 37, '2025-01-26', '2025-03-21', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(4, 'velit Promo', 43, '2025-01-01', '2025-03-18', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(5, 'quia Promo', 24, '2025-02-02', '2025-03-11', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(6, 'et Promo', 16, '2025-01-19', '2025-03-09', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(7, 'numquam Promo', 7, '2025-01-31', '2025-03-20', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(8, 'et Promo', 50, '2025-02-07', '2025-03-18', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(9, 'voluptatum Promo', 32, '2025-01-10', '2025-03-05', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(10, 'nihil Promo', 25, '2025-02-16', '2025-03-09', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(11, 'reprehenderit Promo', 7, '2025-02-10', '2025-03-22', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(12, 'optio Promo', 45, '2025-02-05', '2025-03-09', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(13, 'quibusdam Promo', 15, '2025-01-31', '2025-03-10', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(14, 'maxime Promo', 36, '2025-01-07', '2025-03-21', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(15, 'soluta Promo', 49, '2025-02-26', '2025-03-03', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(16, 'vel Promo', 46, '2025-01-01', '2025-03-01', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(17, 'veniam Promo', 30, '2025-01-17', '2025-03-18', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(18, 'reiciendis Promo', 28, '2025-02-02', '2025-02-28', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(19, 'similique Promo', 24, '2025-01-18', '2025-03-04', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(20, 'assumenda Promo', 42, '2025-01-15', '2025-03-18', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(21, 'ea Promo', 50, '2025-01-03', '2025-03-25', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(22, 'sint Promo', 47, '2025-01-01', '2025-03-06', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(23, 'nobis Promo', 50, '2025-02-06', '2025-03-16', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(24, 'cumque Promo', 25, '2025-02-18', '2025-03-25', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(25, 'harum Promo', 30, '2025-01-02', '2025-03-09', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(26, 'molestias Promo', 32, '2025-01-14', '2025-03-07', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(27, 'dolorem Promo', 45, '2025-01-30', '2025-03-15', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(28, 'dolorem Promo', 45, '2025-01-17', '2025-03-10', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(29, 'corrupti Promo', 12, '2025-01-09', '2025-03-24', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(30, 'ducimus Promo', 41, '2025-01-22', '2025-03-10', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(31, 'ipsa Promo', 13, '2025-01-19', '2025-03-20', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(32, 'est Promo', 11, '2025-01-02', '2025-03-06', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(33, 'quaerat Promo', 16, '2025-01-28', '2025-03-11', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(34, 'ut Promo', 12, '2025-01-17', '2025-03-23', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(35, 'nam Promo', 25, '2025-02-23', '2025-02-27', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(36, 'molestiae Promo', 43, '2025-02-14', '2025-03-20', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(37, 'consectetur Promo', 41, '2025-01-22', '2025-03-26', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(38, 'ad Promo', 32, '2025-02-05', '2025-03-06', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(39, 'accusamus Promo', 48, '2025-02-12', '2025-03-15', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(40, 'eos Promo', 15, '2025-02-22', '2025-03-07', '2025-02-26 19:52:19', '2025-02-26 19:52:19');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sous_categories`
--

CREATE TABLE `sous_categories` (
  `sous_categorie_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sous_categories`
--

INSERT INTO `sous_categories` (`sous_categorie_id`, `categorie_id`, `titre`, `image`, `created_at`, `updated_at`) VALUES
(1, 21, 'ipsam Sous-Categorie', 'https://via.placeholder.com/640x480.png/00bbee?text=products+voluptatem', '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(2, 22, 'impedit Sous-Categorie', 'https://via.placeholder.com/640x480.png/0011dd?text=products+quas', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(3, 23, 'numquam Sous-Categorie', 'https://via.placeholder.com/640x480.png/00cc33?text=products+voluptate', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(4, 24, 'officiis Sous-Categorie', 'https://via.placeholder.com/640x480.png/00cccc?text=products+praesentium', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(5, 25, 'commodi Sous-Categorie', 'https://via.placeholder.com/640x480.png/00aacc?text=products+voluptatem', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(6, 26, 'autem Sous-Categorie', 'https://via.placeholder.com/640x480.png/0055cc?text=products+asperiores', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(7, 27, 'commodi Sous-Categorie', 'https://via.placeholder.com/640x480.png/00bb99?text=products+qui', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(8, 28, 'exercitationem Sous-Categorie', 'https://via.placeholder.com/640x480.png/00cc44?text=products+rerum', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(9, 29, 'eaque Sous-Categorie', 'https://via.placeholder.com/640x480.png/00cc88?text=products+ipsam', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(10, 30, 'non Sous-Categorie', 'https://via.placeholder.com/640x480.png/00dd22?text=products+amet', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(11, 31, 'fugit Sous-Categorie', 'https://via.placeholder.com/640x480.png/00cc33?text=products+ut', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(12, 32, 'consequuntur Sous-Categorie', 'https://via.placeholder.com/640x480.png/003399?text=products+et', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(13, 33, 'porro Sous-Categorie', 'https://via.placeholder.com/640x480.png/003344?text=products+quod', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(14, 34, 'praesentium Sous-Categorie', 'https://via.placeholder.com/640x480.png/0077cc?text=products+qui', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(15, 35, 'harum Sous-Categorie', 'https://via.placeholder.com/640x480.png/0088ee?text=products+et', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(16, 36, 'culpa Sous-Categorie', 'https://via.placeholder.com/640x480.png/0066cc?text=products+nesciunt', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(17, 37, 'omnis Sous-Categorie', 'https://via.placeholder.com/640x480.png/0022aa?text=products+iste', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(18, 38, 'nihil Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ffbb?text=products+unde', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(19, 39, 'non Sous-Categorie', 'https://via.placeholder.com/640x480.png/00aaee?text=products+architecto', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(20, 40, 'fugiat Sous-Categorie', 'https://via.placeholder.com/640x480.png/0011bb?text=products+dolores', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(21, 41, 'sint Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ccdd?text=products+nobis', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(22, 42, 'minima Sous-Categorie', 'https://via.placeholder.com/640x480.png/000044?text=products+illo', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(23, 43, 'deleniti Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ddbb?text=products+odit', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(24, 44, 'doloremque Sous-Categorie', 'https://via.placeholder.com/640x480.png/008800?text=products+magnam', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(25, 45, 'dolores Sous-Categorie', 'https://via.placeholder.com/640x480.png/001100?text=products+id', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(26, 46, 'atque Sous-Categorie', 'https://via.placeholder.com/640x480.png/00aa55?text=products+aperiam', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(27, 47, 'eveniet Sous-Categorie', 'https://via.placeholder.com/640x480.png/009966?text=products+ducimus', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(28, 48, 'aut Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ddff?text=products+porro', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(29, 49, 'esse Sous-Categorie', 'https://via.placeholder.com/640x480.png/0022cc?text=products+neque', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(30, 50, 'aut Sous-Categorie', 'https://via.placeholder.com/640x480.png/0033bb?text=products+commodi', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(31, 51, 'accusamus Sous-Categorie', 'https://via.placeholder.com/640x480.png/009955?text=products+quos', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(32, 52, 'debitis Sous-Categorie', 'https://via.placeholder.com/640x480.png/00dddd?text=products+provident', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(33, 53, 'quia Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ddee?text=products+maxime', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(34, 54, 'vel Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ff77?text=products+eos', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(35, 55, 'sunt Sous-Categorie', 'https://via.placeholder.com/640x480.png/005522?text=products+ut', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(36, 56, 'error Sous-Categorie', 'https://via.placeholder.com/640x480.png/0099bb?text=products+a', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(37, 57, 'omnis Sous-Categorie', 'https://via.placeholder.com/640x480.png/00ddbb?text=products+architecto', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(38, 58, 'totam Sous-Categorie', 'https://via.placeholder.com/640x480.png/0033bb?text=products+illum', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(39, 59, 'nihil Sous-Categorie', 'https://via.placeholder.com/640x480.png/0077aa?text=products+aut', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(40, 60, 'illum Sous-Categorie', 'https://via.placeholder.com/640x480.png/004477?text=products+ut', '2025-02-26 19:52:19', '2025-02-26 19:52:19');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `date_naissance` varchar(255) NOT NULL,
  `role` enum('admin','client','fournisseur','livreur') NOT NULL DEFAULT 'client',
  `adresse` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `compositionFoyer` varchar(255) DEFAULT NULL,
  `typeLogement` varchar(255) DEFAULT NULL,
  `statusLogement` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `email_verified_at`, `password`, `telephone`, `genre`, `date_naissance`, `role`, `adresse`, `region`, `ville`, `compositionFoyer`, `typeLogement`, `statusLogement`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jackson', 'Schroeder', 'larkin.kendra@example.net', NULL, '$2y$12$CGFHhUJCEJHoXNTAD.GzbOwrp100664d7VuXRsuYul6KFu3tsM58.', '1-212-583-0403', 'female', '2025-01-30', 'client', '82389 Joannie Keys Apt. 140\nLillianside, RI 50188-0209', 'North Dakota', 'Laurencechester', 'Ab animi perspiciatis consequatur veritatis.', 'ad', 'loué', NULL, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(2, 'Esteban', 'Fisher', 'alvina41@example.com', NULL, '$2y$12$rbXFMLvM7RLa0r1aVDTu8eKThZK7b69vrrKj6UytX9t6jMxGHr8oC', '(361) 844-6677', 'male', '1972-07-09', 'client', '1661 Missouri Glen Apt. 574\nAlycestad, CA 83535', 'Indiana', 'Marlinberg', 'Esse adipisci quaerat corporis velit fuga fugiat esse.', 'dicta', 'propriétaire', NULL, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(3, 'Marcelina', 'Wyman', 'bednar.lolita@example.org', NULL, '$2y$12$sEjE0yN2UsrlfQO4ZZaZ.OfWbVLsQMicq4.bePY2yTOIXs1aoBMxm', '+1 (660) 676-6137', 'female', '1987-07-19', 'client', '58108 Brandyn Orchard\nSandrinehaven, MO 76143', 'Missouri', 'South Blaise', 'Voluptatem ut nesciunt voluptatem ea quia quod nesciunt molestiae.', 'occaecati', 'colocation', NULL, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(4, 'Frida', 'Dare', 'mireille.greenholt@example.net', NULL, '$2y$12$VvLYemMUfPsk572JukRrQOWEETW5KIjnXmXoA8YQ/kDuCcwBFORTi', '864.704.1673', 'male', '2005-01-11', 'client', '228 Asia Points Apt. 425\nEast Kennastad, IL 21799-9997', 'Alaska', 'South Frederick', 'Dolor officia similique explicabo velit.', 'eius', 'propriétaire', NULL, '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(5, 'Brain', 'Paucek', 'fern46@example.net', NULL, '$2y$12$vE6pPhYMbCvbl0KF6CIEeuz6e8m4CSzqk5v2geTiPYFQcbTUe5pWi', '+17063351230', 'male', '1998-06-17', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'dnQhW7YKYS', '2025-02-26 19:51:48', '2025-02-26 19:51:48'),
(6, 'Lewis', 'Vandervort', 'epaucek@example.net', NULL, '$2y$12$mkgp5LDztvDIHAiGI4q3B.tyi7rBmgCpnpyWqV0CQ1llsMPzEv6ze', '(731) 308-0974', 'male', '1973-08-14', 'client', '19450 Lonzo Spur\nPort Lempi, DC 89818', 'Hawaii', 'West Parker', 'Quia et sint et itaque aspernatur.', 'et', 'loué', NULL, '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(7, 'Nicolette', 'Abshire', 'sarah90@example.org', NULL, '$2y$12$wdXw.HUTk3BwpHZZK3.yauI/ebNuUeHn.itoDgGPr/Igvm.FbKcEO', '+1.662.226.1000', 'male', '2000-02-24', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 't1esSYYVG5', '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(8, 'Eleanora', 'Stroman', 'hyman68@example.com', NULL, '$2y$12$GZaqvDThGEp9/kAJmbesyONtako284Vvgsx.L662kLUiGYo69TYsa', '1-657-265-4440', 'female', '1975-04-09', 'client', '60912 Hudson Inlet Apt. 610\nLake Herbert, WY 46463', 'Illinois', 'South Gerhardchester', 'Officia in quasi repudiandae vel.', 'consequatur', 'colocation', NULL, '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(9, 'Kailee', 'McLaughlin', 'otilia48@example.org', NULL, '$2y$12$YG9sna/lY2nZg34HXO9VQeEk2CmeouO./pOrcIP/O2kLx.FmGWBJa', '+1.260.350.3492', 'female', '2017-04-05', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'k1BcpHxTmL', '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(10, 'Jadyn', 'Marks', 'dayana86@example.net', NULL, '$2y$12$C/P97ushjWWkZCpx8wvpmuBpWlwezXYPl2oaaHzBYICKds8h3S8zW', '1-872-593-4911', 'female', '2010-12-24', 'client', '84736 Carolyn Courts Apt. 938\nPort Gretchenview, NJ 02291-9124', 'Ohio', 'Schmelerstad', 'Eligendi deserunt eos sint quia.', 'vero', 'loué', NULL, '2025-02-26 19:51:49', '2025-02-26 19:51:49'),
(11, 'Kellen', 'Kuvalis', 'schimmel.lexi@example.com', NULL, '$2y$12$XYTut7.CiI3ferIW4k6T9unApehgK/r9DazciE0wPRpA9amAC6SVq', '1-620-589-5900', 'male', '1984-05-23', 'client', '2250 Stiedemann Wells\nJeanetteburgh, HI 98563', 'Wyoming', 'South Dannie', 'Numquam quia ut ut iste et dolorem.', 'error', 'propriétaire', NULL, '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(12, 'Erica', 'Baumbach', 'okuneva.ricky@example.org', NULL, '$2y$12$MFMiG2NCgk32jm/1RH5nfehTpH/SpJV4lllm/g2wseXigk2xMnrPq', '706-340-8852', 'male', '1983-03-11', 'client', '56406 Torphy Landing\nSouth Julianafurt, IN 50643', 'District of Columbia', 'South Antoniettafurt', 'Ipsum accusantium dolores sed aut.', 'ex', 'colocation', NULL, '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(13, 'Kenya', 'Dickens', 'ashly.wuckert@example.net', NULL, '$2y$12$4z0J6GLjvU0f3sp8jc4AwOvGv2R4R6/OKK0AVX7fx4ks4j4gsAi5S', '+1 (858) 558-6502', 'male', '1971-01-28', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, '56biWXXnYU', '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(14, 'Jaida', 'Morar', 'willie.quigley@example.org', NULL, '$2y$12$XuOlo3MZbrdodaw3nrGRQOBQhxfQauB..1Togkynt.Xd9JbYqVnqm', '646-207-8928', 'male', '2011-10-02', 'client', '435 Beahan Loaf\nEast Ethabury, MI 93068-8621', 'Massachusetts', 'Estelmouth', 'Aut sint dignissimos ut incidunt incidunt nulla.', 'officiis', 'loué', NULL, '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(15, 'Chaya', 'Bailey', 'vivianne.medhurst@example.com', NULL, '$2y$12$VrOvRhpzl.ZRTKF118dKau4p8FF98.hhHHY1y1lTacsg6rrhnnEZi', '+1.313.522.6621', 'female', '1992-10-19', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, '5n72zhy0Fs', '2025-02-26 19:51:50', '2025-02-26 19:51:50'),
(16, 'Mireille', 'Swift', 'josh47@example.org', NULL, '$2y$12$AZHIPppI0931h01U9HGypOFYGmbAQWgbZlWHE346jTujQrFvv9saa', '820-499-6710', 'female', '2020-03-28', 'client', '319 Aiyana Unions Suite 773\nCarolborough, MD 83875', 'Montana', 'Lake Veda', 'Quis et enim adipisci delectus beatae quidem.', 'magnam', 'propriétaire', NULL, '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(17, 'Jesus', 'Boehm', 'eleazar28@example.net', NULL, '$2y$12$2yfPNApp7Z.f3v.vZCaYp.v..fddTgpuk6R0CoUQO3oNUYTYJS5hi', '+1-608-743-3865', 'female', '1974-07-04', 'client', '71002 Hagenes Shoal Apt. 131\nLeannonmouth, MS 24824', 'Idaho', 'South Solon', 'A sit dolor quae ad.', 'voluptas', 'colocation', NULL, '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(18, 'Veronica', 'Leffler', 'cary88@example.com', NULL, '$2y$12$SssbYyyd2RL6anw4tJ/JvevDOX0MMNygQl4kDiECLcXsHF/bmQVD2', '1-419-469-9791', 'male', '2010-01-12', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'jbAzHl7Xtc', '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(19, 'Fred', 'Macejkovic', 'jaren96@example.com', NULL, '$2y$12$SrCPxKWCUuRgSKs0Clbixe51gDlTdbrhGT5hElh8WKH8PdElmHSF6', '860-732-3755', 'male', '2020-09-04', 'client', '67655 Ryan Crest Suite 070\nNew Leetown, MN 04342-1568', 'New Jersey', 'Shadfort', 'Fugiat omnis ex sunt perspiciatis nihil assumenda odio.', 'perferendis', 'propriétaire', NULL, '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(20, 'Tyrique', 'Gibson', 'edythe.corwin@example.org', NULL, '$2y$12$GJtept3gjMVCfgNrXy7LqeRzuukkHxUd3KgOCpuk3N0/XoommPMCO', '+1.727.568.6472', 'female', '2012-12-06', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'mMSpv6IV1W', '2025-02-26 19:51:51', '2025-02-26 19:51:51'),
(21, 'Alene', 'Collins', 'kaylee13@example.com', NULL, '$2y$12$NjKJhpZe5.t3MkjhcpWWR.SQZ0FimISRpQpwn.FqweKAu/VcEJQJu', '+1-331-419-1309', 'male', '2019-03-16', 'client', '356 Lavon Island\nKoreyhaven, MD 57005-4681', 'Ohio', 'Lilyberg', 'Debitis quis rerum et autem.', 'non', 'propriétaire', NULL, '2025-02-26 19:51:52', '2025-02-26 19:51:52'),
(22, 'Ollie', 'Pollich', 'mbalistreri@example.net', NULL, '$2y$12$PRpttbRW9nk9XGVvEIBAWuBbfLwVne0W/TjKZtKeJ3wzE7w3SG/ja', '(732) 704-3991', 'male', '1995-09-21', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'Eqt2ncA4JM', '2025-02-26 19:51:52', '2025-02-26 19:51:52'),
(23, 'Cecelia', 'Kilback', 'elowe@example.net', NULL, '$2y$12$YN8GaLKqZEcXIx8j/GPFje85kF1vbIGPeXftWWOx/J5H7hKEmQfWu', '+1 (818) 402-8889', 'female', '2018-09-23', 'client', '38079 Janessa Squares\nWest Annabelleview, NJ 80598', 'Tennessee', 'New Efrain', 'Est temporibus in debitis est veniam velit commodi.', 'cupiditate', 'colocation', NULL, '2025-02-26 19:51:52', '2025-02-26 19:51:52'),
(24, 'Blake', 'Effertz', 'sierra48@example.net', NULL, '$2y$12$cT.RVucjSvSu2rX8vguSz.SgQKIzfnAaDeIUTQPhpHIt2TjcZT6NO', '1-678-819-5755', 'female', '2001-04-15', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'pTjpPgFDpZ', '2025-02-26 19:51:52', '2025-02-26 19:51:52'),
(25, 'Dariana', 'O\'Conner', 'twalker@example.com', NULL, '$2y$12$ftnriZDKDiuZQC3gxeZ1GuRaS0/TuCjlvah7R9Yso1RLEKmR7rNd.', '650.233.8694', 'male', '1983-11-03', 'client', '13143 Earl Glen Suite 717\nPort Mohammed, CT 90096-4936', 'New Jersey', 'Alvinashire', 'Consequatur minima numquam debitis aut modi a.', 'voluptatem', 'colocation', NULL, '2025-02-26 19:51:52', '2025-02-26 19:51:52'),
(26, 'Elyse', 'Lang', 'kaden.lemke@example.org', NULL, '$2y$12$2tug6nOmW.9oq7zlF65TIuIUZz9vKV4/703daVmeaL7tvsj6ydNuS', '+1 (310) 742-1175', 'female', '2012-01-21', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'Hx01esO6Gg', '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(27, 'Lewis', 'Brakus', 'watson74@example.net', NULL, '$2y$12$zScpr6BcY.ryPUrEZo.2Z.l7l0281ojxXHMFHXSjFST/Qo/rlCnT.', '+1-346-298-2218', 'male', '1971-07-04', 'client', '816 Mayer Centers\nNew Avis, SD 79837-0756', 'Arkansas', 'New Erlingstad', 'Sunt recusandae accusantium omnis molestiae fuga quo cum.', 'et', 'propriétaire', NULL, '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(28, 'Justyn', 'Mayer', 'kylie98@example.com', NULL, '$2y$12$r9BC2HGPBmoqMXVuH5oAH.N7YfQ4RgFAt6xLkuVgaaG6LN9k106hG', '+1.760.214.3985', 'male', '2000-08-14', 'client', '596 Kassulke Crossing\nDanikaborough, TN 64682', 'South Carolina', 'Stokesbury', 'Animi impedit hic necessitatibus nesciunt.', 'optio', 'loué', NULL, '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(29, 'Micah', 'Hoppe', 'sschneider@example.com', NULL, '$2y$12$0GEZJYKo8b/3GLp7HC2/2O6cr/DYd5BpKZnAb7RLFBKCgM9pKi7qW', '+1-223-915-1383', 'female', '1999-05-26', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'XE4QJJ1tpC', '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(30, 'Darby', 'Bechtelar', 'xcremin@example.org', NULL, '$2y$12$xTcwF6ZQytdIDquP2YfW7.7b6.jzamDJeuYErfdSd2n0QLXjlcApS', '+1 (863) 701-1273', 'male', '1988-08-04', 'client', '453 Adonis Dam Apt. 694\nNew Haskell, DC 72876-0505', 'Washington', 'South Esmeralda', 'Aut necessitatibus rerum illo aperiam.', 'repudiandae', 'loué', NULL, '2025-02-26 19:51:53', '2025-02-26 19:51:53'),
(31, 'Reinhold', 'Haley', 'weston13@example.org', NULL, '$2y$12$Ns2gK0HqjimiKOOoiZSqBuBgI.MrTNcnIE4yuag/L2u8YFaGjxtd6', '(240) 799-3800', 'female', '1972-05-17', 'client', '60513 Konopelski Fields Apt. 544\nJosehaven, DC 64497', 'Oregon', 'Hirtheside', 'Ut quaerat ducimus earum ut non delectus necessitatibus rerum.', 'repellat', 'loué', NULL, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(32, 'Jermain', 'Ankunding', 'huel.reina@example.net', NULL, '$2y$12$9D6Ghobr0zBLRMmdTObDk.G4gA1Uac6x5lhK23Nw0.5MiLr.elqf2', '(830) 939-2923', 'male', '1996-09-25', 'client', '6789 Batz Fall Apt. 629\nWest Caleville, RI 99661-1264', 'South Dakota', 'Lake Sanfordport', 'Dolore itaque occaecati cupiditate cum est nostrum.', 'necessitatibus', 'loué', NULL, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(33, 'Rashawn', 'Pollich', 'gabrielle.bashirian@example.org', NULL, '$2y$12$g9MuUdmGgfBHLylMduA.iuDxfkCFjspyb6FxPh3GBNbAse9TXdQ7O', '815-430-9744', 'male', '1971-03-20', 'client', '43438 Purdy Lodge Apt. 201\nWest Helena, MA 01290', 'Kentucky', 'Lehnerburgh', 'Fugit quam laboriosam quis et consequuntur aperiam.', 'saepe', 'colocation', NULL, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(34, 'Adriana', 'Gerlach', 'alexane.fisher@example.com', NULL, '$2y$12$hknc1yALb4zEZ6smb6DhZuMLXfZg0H3ZCKi8oR9wYwfQbT5V/0gYO', '651.945.4332', 'male', '1987-05-31', 'client', '326 Eleanore Vista Apt. 884\nSouth Brainland, VT 79442-6475', 'New Mexico', 'McKenziestad', 'Nihil non fuga quas dignissimos.', 'tempora', 'colocation', NULL, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(35, 'Emiliano', 'Nikolaus', 'osinski.celia@example.org', NULL, '$2y$12$52DFDsiBLT2x1Gh/MNU/6uMVTryDXGK7NQASVBfIWjPjliP/1Ek5C', '971-838-2729', 'female', '2012-02-26', 'client', '845 Jimmie Lock\nSophiatown, IN 35226-2321', 'Nebraska', 'Ebbaborough', 'Ad expedita alias nisi.', 'temporibus', 'loué', NULL, '2025-02-26 19:51:54', '2025-02-26 19:51:54'),
(36, 'Zita', 'Connelly', 'lbergnaum@example.com', NULL, '$2y$12$ZnqsRbqDTKXJExWJ4TOyj.1xVMwaz05071tWwCFSh23RlhTw.046m', '+1-505-658-1322', 'male', '1974-06-16', 'client', '61271 Tina Brooks Suite 427\nEast Janie, SC 99696-3876', 'Wyoming', 'East Maiya', 'Aliquam esse occaecati in qui id qui.', 'ut', 'propriétaire', NULL, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(37, 'Clifford', 'Thiel', 'dickinson.ezra@example.net', NULL, '$2y$12$BjjU7vHRWDrNLw10Jvq9TOQF3n6eaLeS3t38Fz.rTRkWV4bMI8Wzu', '+1.352.430.3619', 'female', '1997-07-17', 'client', '6127 Shields Stream\nNorth Parkerview, MI 07269-6697', 'Alaska', 'North Freemanhaven', 'Atque voluptas eum explicabo omnis ut.', 'libero', 'loué', NULL, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(38, 'Reagan', 'Ledner', 'christine26@example.com', NULL, '$2y$12$ts2/yTeTmA4LWq86u4eCEOgclqt0gsyvvnKhVnnSBK5oLQDmVs0fi', '551.296.9464', 'female', '2025-02-23', 'client', '10060 Sally Shore Apt. 857\nAlvahberg, OH 31518', 'Mississippi', 'East Laviniaport', 'Explicabo impedit ea fuga ea et quam fugiat culpa.', 'soluta', 'loué', NULL, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(39, 'Anita', 'Emard', 'elliott.macejkovic@example.org', NULL, '$2y$12$DS3eFTWoEnsG9TTJVRRSaukSeay/EIpj5XW9c8L4hTFMUavsi3LuG', '+19596607494', 'male', '2015-09-15', 'client', '3258 Kayli Vista\nLedaville, ME 03149', 'Indiana', 'East Davidville', 'Eum nisi nostrum officia illo quia ad.', 'nulla', 'loué', NULL, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(40, 'Jacques', 'Volkman', 'layne.harris@example.net', NULL, '$2y$12$zTsYx4SUX3ciJ.rLm5fymOI56SOT/L8lXgp.WrKysWFV3d6TJbcrK', '+1 (618) 490-0739', 'female', '2022-08-23', 'client', '6767 Howell Ways\nWatersville, WA 06042-6953', 'West Virginia', 'Lake Lina', 'Eaque id possimus distinctio quo corrupti ad magni.', 'cum', 'propriétaire', NULL, '2025-02-26 19:51:55', '2025-02-26 19:51:55'),
(41, 'Arjun', 'Rosenbaum', 'isaac06@example.org', NULL, '$2y$12$Vk0vAeiQKpg7SJ0Z.Wik3Olmxtk7vxG8wbrJbqwXULan0ny329NyW', '+1-541-930-1507', 'male', '1990-03-10', 'client', '831 Borer Turnpike Suite 784\nStarkton, MA 59486-7328', 'Rhode Island', 'New Kitty', 'Fuga sint odio non dicta.', 'tenetur', 'loué', NULL, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(42, 'Ricky', 'Raynor', 'taryn.cormier@example.net', NULL, '$2y$12$VcNz0M5S7wuKinUXDq8DhO6BbQGC6HSpQ03d4ZgIcF0hk0p76g4Iu', '214-413-1103', 'female', '2005-11-30', 'client', '8430 Nestor Shore Suite 497\nLessiemouth, WY 92989-6186', 'Nebraska', 'Port Phoebe', 'Veniam voluptas exercitationem illo doloribus.', 'dicta', 'colocation', NULL, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(43, 'Patsy', 'Pfeffer', 'horacio82@example.org', NULL, '$2y$12$BOezcfR4mqRq.fdQ.pGfbOivTX9B9xsIPu7OQD6YcboDAn9arbTtq', '231-855-3919', 'male', '2014-03-26', 'client', '1521 Labadie Mountains\nPort Lolitamouth, MS 79461-4721', 'Ohio', 'Lake Jan', 'Quis facere a expedita accusantium.', 'culpa', 'propriétaire', NULL, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(44, 'May', 'Metz', 'pokuneva@example.net', NULL, '$2y$12$xJ5sqy6XOXO79U558ygmdeLHBzFUOHHL1ldSAtv9eyAdRP3wZrvsS', '(312) 633-8565', 'male', '2016-12-16', 'client', '1339 Rolfson Creek\nBauchstad, MA 97449-9120', 'Indiana', 'Moniquebury', 'Sapiente quos voluptatum ullam assumenda in doloremque.', 'voluptatem', 'loué', NULL, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(45, 'Lisandro', 'Krajcik', 'mwelch@example.com', NULL, '$2y$12$VZKZt4mFU2YgugCdfNrsOeq2VXfEgHLHR3IfP/ipIvVkN9xhThdr.', '(904) 306-9482', 'male', '1976-06-16', 'client', '652 Huel Cliff\nSouth Trevershire, NC 84835-6366', 'Idaho', 'East Alexanneview', 'Consequuntur incidunt eveniet et quis sit.', 'atque', 'propriétaire', NULL, '2025-02-26 19:51:56', '2025-02-26 19:51:56'),
(46, 'Cornelius', 'Doyle', 'hberge@example.org', NULL, '$2y$12$sE8Ttf9mrkrnSZL/G2jB4.IdMTcJEuR6AGjlooVr3e2gJUnBbz/sy', '1-951-486-2491', 'female', '1984-01-08', 'client', '8868 Spinka Forks\nBauchburgh, OK 41217', 'Pennsylvania', 'South Afton', 'Possimus consequatur minima sint et.', 'itaque', 'colocation', NULL, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(47, 'Morton', 'Pouros', 'keaton27@example.net', NULL, '$2y$12$AtUBxIwJldrNSeT40gRILOW0VH0qzWUMECmki2T/DQhe3/tRhcXe.', '+1-734-996-8167', 'female', '1986-04-10', 'client', '85389 Sipes Isle Apt. 294\nMayerbury, WI 89807-7115', 'New Jersey', 'West Lindsay', 'Voluptas quas impedit repellat in.', 'architecto', 'colocation', NULL, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(48, 'Amani', 'Cremin', 'laverna.donnelly@example.net', NULL, '$2y$12$81MS9N9DG9I0hUAcEy4iX.oMNmvrpq.qbvpVwAAy0RYLT.inx0F32', '+1 (909) 799-5793', 'female', '1996-01-06', 'client', '6475 Labadie Route Apt. 721\nWest Jacinthe, FL 44653', 'Minnesota', 'West Gay', 'Fugit assumenda qui adipisci placeat velit ipsam maiores.', 'accusantium', 'colocation', NULL, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(49, 'Madge', 'Cronin', 'becker.noelia@example.net', NULL, '$2y$12$OLJd.V7viUUWd4sVoDVOr.o6R1N.zWrxurIUyYcxJuoEJP.VDKdAS', '(754) 570-0769', 'female', '1997-07-12', 'client', '438 Upton Causeway\nLake Shakira, DE 99001-2319', 'Maryland', 'New Lolitashire', 'Laboriosam et qui consequatur rerum sit.', 'non', 'propriétaire', NULL, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(50, 'Laurence', 'Marvin', 'wiley86@example.com', NULL, '$2y$12$3ENkYcN41N1IMRExeyIEEuW87QYwAWVR1TYV21/RO9FH1gCsXSIw.', '+19368106441', 'female', '1979-12-29', 'client', '12692 Shields Drive Suite 924\nNew Titus, NH 68077', 'Oregon', 'West Frieda', 'Aspernatur molestiae est ipsum eveniet quae.', 'voluptates', 'loué', NULL, '2025-02-26 19:51:57', '2025-02-26 19:51:57'),
(51, 'Braxton', 'Keebler', 'rhudson@example.com', NULL, '$2y$12$s5201WlpGJ1lvObzVbjAcuzu4IBWRYfc1LEwXlBZlOUdtoYfBoh8C', '(347) 687-9182', 'female', '1974-08-03', 'client', '8164 Hudson Motorway\nEdastad, MS 46858-3334', 'Iowa', 'Josephinefurt', 'Dolor molestias repudiandae veniam quia.', 'aut', 'colocation', NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(52, 'Haylie', 'Fritsch', 'luisa36@example.org', NULL, '$2y$12$A1av19JWQljOee/fPLUMHO/XoMCws4L1pZBqhLmaXMgZIZh9KxZ.a', '+17865093348', 'male', '2016-02-11', 'client', '81037 Gibson Passage Apt. 743\nSabrynaborough, WI 61897-2778', 'Missouri', 'West Wilmerside', 'Et quam aspernatur non labore suscipit.', 'voluptatem', 'colocation', NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(53, 'Nedra', 'Jones', 'vilma75@example.net', NULL, '$2y$12$KUwHeiAQDME98LN1uQCs5ec0zdcuhKZJSpp2/N5rvlFVSWXounstG', '+15806392580', 'female', '1987-12-18', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'IIiEuK5ab8', '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(54, 'Newell', 'Kreiger', 'wilhelm.mayert@example.net', NULL, '$2y$12$WjK2zj6hZGDiylkPJbdFZeVnRp03mbJUPZ.os.u9oCjnjnqWizFJm', '+1.934.573.5519', 'female', '1999-07-10', 'client', '59772 Jedediah Lane Suite 717\nLake Zoieton, OK 35248-4710', 'Virginia', 'Kathlynburgh', 'Ducimus non provident ut ab.', 'eum', 'colocation', NULL, '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(55, 'Effie', 'Kris', 'luettgen.mallie@example.net', NULL, '$2y$12$1qtQUIE10Yaek0.T1B44e.0vYQIk4JMKUGI5n8PIroTFdxJ6733cq', '+16787502726', 'male', '1979-02-10', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'BVkxz7qKnF', '2025-02-26 19:51:58', '2025-02-26 19:51:58'),
(56, 'Kolby', 'Bartell', 'tauer@example.com', NULL, '$2y$12$lQR2BsQcdTXpJ0kIhL/j.OWybxVC4Y7WQp.JqVywRK/37owOQiVs6', '1-223-789-8848', 'female', '1999-01-22', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, '6RZSK3Cztn', '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(57, 'Carli', 'Hills', 'bart87@example.net', NULL, '$2y$12$hxOcH73978w3UIhkUU.gPuGYz3Y34PiKRRzn67BlqBVUJfvSAWIQ.', '(740) 690-2217', 'female', '1978-07-24', 'client', '552 Osvaldo Skyway\nPort Zachary, FL 62654', 'Michigan', 'Lake Lempiside', 'Error in in voluptas fugit sunt nulla harum.', 'eos', 'loué', NULL, '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(58, 'Camille', 'Rolfson', 'erling.roberts@example.org', NULL, '$2y$12$J9QHts.za0DUVen5Cl.4DewZPXMZeQYFpwm3xRC0KluFmHE/3pz96', '401.961.7394', 'female', '1993-07-16', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'GvJXH5AVov', '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(59, 'Cecilia', 'Swift', 'upfannerstill@example.net', NULL, '$2y$12$PPRsSr0nbIs1WHVl0LTkteQWK.uf6QYXgOzAxQq3FQ5Kr8F0rbeZ.', '(503) 431-0493', 'female', '1985-12-25', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'gTg6t1zGNs', '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(60, 'Eugene', 'Brekke', 'erdman.vicky@example.com', NULL, '$2y$12$V5.fBxCKJVmPYD175uNQY.JkrAQm6rnpqGdbEpOj/1IGvXc9zMFh2', '786-875-3718', 'male', '1970-02-13', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'uHU3YdfsmJ', '2025-02-26 19:51:59', '2025-02-26 19:51:59'),
(61, 'Veronica', 'Orn', 'garrison.vandervort@example.net', NULL, '$2y$12$BZq/2lC3ADVvkNzpEDW0iOirgEeWAUsbz5vMuTLuGvddOLyLbs/Nu', '+18155601082', 'male', '2002-02-13', 'client', '550 Citlalli Island Apt. 259\nFerminmouth, NY 03629-8216', 'Washington', 'North Jacinto', 'Aspernatur quam quia in quia aut quam dolorem.', 'soluta', 'loué', NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(62, 'Ara', 'Harvey', 'jayde.wuckert@example.net', NULL, '$2y$12$ti.NDmoYZP6SOOImsYJSCOW4.9pkAz6nWo5k1t9H1sEm2I3AV8f/.', '+1-458-927-1619', 'male', '1971-10-11', 'client', '4091 Zulauf Union\nStreichshire, HI 47938', 'West Virginia', 'New Violet', 'Nihil est eaque doloremque corporis.', 'corrupti', 'colocation', NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(63, 'Kira', 'Smith', 'carole73@example.com', NULL, '$2y$12$Oi1eLVIRsE23PwtYCGAPD.bsf4LjtRi1INk7YLDudi6a1R3zkduUK', '(630) 326-7033', 'female', '1988-05-06', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'qdvEJyWKhc', '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(64, 'Alexandra', 'Littel', 'lucius46@example.org', NULL, '$2y$12$EvWxxB.3FUmFzR8VNPQGcOPbFljvxZHhCh9GXOijf76aaCdFYwFDW', '463.563.5768', 'female', '2013-05-21', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'F8CWBeUBLj', '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(65, 'Norris', 'Gusikowski', 'mhermann@example.net', NULL, '$2y$12$4LuD9lEAlP1/rpJqM4rpeOcz1v8AWspZ1CnRcG8muG6VfRBer/ToK', '+1-405-929-8202', 'female', '2018-12-21', 'client', '647 Stokes Tunnel Suite 839\nPort Amy, AL 06996', 'Maine', 'Watersburgh', 'Ipsum expedita qui delectus iusto totam.', 'voluptatem', 'loué', NULL, '2025-02-26 19:52:00', '2025-02-26 19:52:00'),
(66, 'Richard', 'Funk', 'bartell.hailee@example.com', NULL, '$2y$12$CoitH527StslFgm/RorWgOakvN1p8xHoPkqvmDQjUWHwRGl9Dg3ya', '1-341-807-7200', 'female', '1977-11-19', 'client', '6582 Ericka Place Suite 148\nGilbertview, SC 12282', 'Illinois', 'North Russel', 'Earum quae quos qui perspiciatis occaecati quia culpa.', 'nesciunt', 'loué', NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(67, 'Corrine', 'Swift', 'elizabeth.dach@example.net', NULL, '$2y$12$7TztWpmBxLIM7s9P3Et7SO/oYqa9aX01/q.fDFX4Nw61NfU3KODdK', '360-499-4855', 'female', '2010-07-09', 'client', '6711 Larkin Viaduct\nMozellport, LA 44188', 'West Virginia', 'South Brandi', 'Ex atque ad ut dolor qui accusantium.', 'optio', 'loué', NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(68, 'Abigale', 'Wiza', 'lindgren.jayde@example.com', NULL, '$2y$12$55aVgIGMGvq7N0N.4gxeROtGlrw0egfH5eNPZ7v31dkyQQgPcP4GK', '+13105597980', 'male', '2006-07-15', 'client', '46418 Kassulke Prairie\nPort Lela, ND 95983-9797', 'South Dakota', 'North Scottieberg', 'Et necessitatibus alias est est blanditiis qui.', 'non', 'colocation', NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(69, 'Rickie', 'Lesch', 'cristian.mckenzie@example.org', NULL, '$2y$12$K8r7dATCnYNwz4o30wzhZuAuYT0ikIdKfvMOrj829k55pyWSd3CsK', '+1.440.617.3873', 'female', '2023-03-03', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'yOpf8NAamk', '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(70, 'Dameon', 'Larkin', 'diana61@example.org', NULL, '$2y$12$Xf9Byzr96euvC7rId6/Tdu8fOBXSmFmsquNbRQ.Wk7GY.LbpNfeBi', '+1.551.816.9206', 'female', '2023-12-13', 'client', '8551 America Rue\nNorth Wilfred, VT 33915-6244', 'Minnesota', 'Emmaleemouth', 'Fuga ullam impedit quibusdam consequatur ut repudiandae.', 'doloribus', 'colocation', NULL, '2025-02-26 19:52:01', '2025-02-26 19:52:01'),
(71, 'Mitchel', 'Grimes', 'rwindler@example.com', NULL, '$2y$12$rUHQcnyqtB/rUfH58OT4FOGrMvCQdhk1OO0TPRSRn63xvENk2.36y', '229-645-7510', 'female', '2007-07-11', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'dyF14C3vBp', '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(72, 'Rachel', 'Feeney', 'dschneider@example.net', NULL, '$2y$12$4qzJkt/IuO6AxHIoLa2bn.27rflrSgk1Wea5CWuI06TL6UQLTkPJq', '(520) 535-3958', 'female', '1980-04-20', 'client', '8887 Itzel Ramp Apt. 376\nEast Maggieburgh, PA 17592-4823', 'Rhode Island', 'Adastad', 'Rerum ut voluptatem sunt.', 'eaque', 'loué', NULL, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(73, 'Jay', 'Douglas', 'frieda.nienow@example.net', NULL, '$2y$12$qAf5Mvtl4ju9BLWaj4n0IOf6VGp3CuDvXwWUTTQL047Sq43gCLseS', '+18628633667', 'male', '1983-11-22', 'client', '69467 Margarett Burgs\nKiannabury, MA 76684', 'Rhode Island', 'North Brianneborough', 'Incidunt blanditiis dicta temporibus non id.', 'eos', 'loué', NULL, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(74, 'Peggie', 'Tillman', 'aliya39@example.net', NULL, '$2y$12$UgzawO9OC7jkg2NHJxQYIOKBFT1Qh.kyD.aHv39o64bbRIrd10iWu', '+1-917-209-4592', 'female', '1980-12-18', 'client', '14997 Kunde Union\nSouth Shyanne, UT 62229', 'Florida', 'Lake Angiehaven', 'Doloribus aut quas illum qui quia voluptatibus perspiciatis.', 'earum', 'propriétaire', NULL, '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(75, 'Kiera', 'Cormier', 'glover.edwin@example.org', NULL, '$2y$12$3nub/yf4jAI9NSNHbUcjlOQZY0rK6uytuIpyYxuViBPuaiUsbApmG', '772-932-7368', 'female', '1984-05-29', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'EN1iA2drJt', '2025-02-26 19:52:02', '2025-02-26 19:52:02'),
(76, 'Stewart', 'Huel', 'loyal03@example.net', NULL, '$2y$12$tyA7u30ztFt42w8BlHnGIeBQ1gaLhne.WHGQ06kgbj/zPymMN3tOi', '+12672416738', 'male', '2021-05-27', 'client', '67608 Adrianna Shore Suite 925\nNorth Hugh, PA 80246', 'New York', 'South Marinaland', 'Et dolorem id possimus dolorum nisi voluptatem voluptas ipsam.', 'aut', 'loué', NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(77, 'Shaylee', 'Lakin', 'deborah.robel@example.net', NULL, '$2y$12$geFeakW.ra3iN2NnKS1/0eLMLgtgBi5vYLCpKKiyT6kFtPwPWvSaK', '(360) 290-8348', 'female', '2008-04-15', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'HguhAF9LzQ', '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(78, 'Godfrey', 'Collier', 'wwintheiser@example.net', NULL, '$2y$12$Ab36LVk0PS2w0pJwTaj0EO.fYAPF5/zLOU1IRUzTe3VB0ssrrf6FW', '1-423-484-4403', 'female', '2022-07-17', 'client', '3962 Precious Hills Apt. 063\nLitzyland, NV 56593', 'Missouri', 'South Gussie', 'Ipsa et quisquam sunt debitis temporibus exercitationem.', 'sint', 'loué', NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(79, 'Elisha', 'Becker', 'kihn.jerel@example.org', NULL, '$2y$12$ktKgZQdqoHRkb0Wlh8Q9mOBEMy.7ChEJnofvMYCY6B7Jfa1sCYKPu', '872-785-6123', 'female', '2005-08-25', 'client', '451 Jakubowski Points\nLoisfort, WI 34199', 'New Jersey', 'East Eldamouth', 'Nesciunt cum quia officiis nesciunt numquam sunt non.', 'illum', 'loué', NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(80, 'Sherwood', 'Windler', 'bpagac@example.com', NULL, '$2y$12$yx4L0TRAHhNPEExYg/tr7e6ruf/5bVvGHztniF34iDrXF4QDRyk.e', '1-240-900-8940', 'male', '2010-01-31', 'client', '554 Franecki Turnpike Apt. 509\nNew Dion, MO 08442', 'Hawaii', 'South Dylan', 'Repellendus voluptatem illum in debitis.', 'minima', 'propriétaire', NULL, '2025-02-26 19:52:03', '2025-02-26 19:52:03'),
(81, 'Forest', 'Wiegand', 'enrico88@example.com', NULL, '$2y$12$0AoxYPiRjGvLvtFjR.rmjOG3j8smZE5HsGy6cNWTmdAEze0N8.C26', '+1 (323) 477-5824', 'male', '1981-09-08', 'client', '66168 Felipa Villages\nReinholdbury, WV 04760-1445', 'Connecticut', 'Lake Cary', 'Deserunt fugit omnis totam commodi adipisci.', 'est', 'propriétaire', NULL, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(82, 'Joey', 'Weimann', 'domenica54@example.net', NULL, '$2y$12$.oH2Bs.stXt/UjuIIN5da.eR4VXBoLEz9HL0.SC.k7GIA647bjL76', '+1-838-377-9650', 'female', '1988-04-25', 'client', '8685 Gislason Lane\nReedville, WY 65718', 'Tennessee', 'Darbyport', 'Perferendis fuga deserunt quaerat ut ex temporibus delectus.', 'eveniet', 'loué', NULL, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(83, 'Monty', 'Runolfsdottir', 'prohaska.osbaldo@example.org', NULL, '$2y$12$q1NqIIAwUQwdSphIDArJPepj27JUU3VnRGpZQYt4fSN5ytgnUKjY2', '+1 (386) 960-8096', 'female', '2002-01-25', 'client', '713 Juvenal Course\nWest Micahstad, MS 77696', 'Alaska', 'Jodyport', 'Necessitatibus placeat incidunt quaerat ratione perspiciatis.', 'pariatur', 'propriétaire', NULL, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(84, 'Theodore', 'Lehner', 'stamm.cloyd@example.net', NULL, '$2y$12$lXiccGQXUDtB2YCQRB9it.v6n97JBHx7fWVs/q5HmV/rwecOqArVe', '781-676-9024', 'female', '1978-12-03', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'cLNy8SVKdp', '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(85, 'Martine', 'Lang', 'nolan.rebecca@example.org', NULL, '$2y$12$T5rQUoZdFGthNSnanqJYoum8gUFjlxmpmc7pedY1Khh/tLOHrebey', '+14589845895', 'female', '2002-01-19', 'client', '6207 Zechariah Highway\nLake Edgardo, IN 91840-4822', 'Wisconsin', 'Jessycaside', 'Laudantium distinctio incidunt laborum ab ullam.', 'harum', 'propriétaire', NULL, '2025-02-26 19:52:04', '2025-02-26 19:52:04'),
(86, 'Blaze', 'Watsica', 'alverta.wunsch@example.com', NULL, '$2y$12$Xmj04Zk.BWqUOYoQr4zB/.4zifRx5JjuVTkkMCNhCBWuASy5ovI.O', '347-836-5259', 'male', '1970-12-24', 'client', '37616 Bayer Ranch\nLake Reginald, ME 96094', 'New Hampshire', 'Port Dixieberg', 'Sit odit similique perspiciatis distinctio sit ut.', 'odit', 'propriétaire', NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(87, 'Jordi', 'Dietrich', 'nicolas.kacey@example.net', NULL, '$2y$12$7WXxUrR4QJsKAMbYAeDDzOjG.xHvhJMjQcynd96KqGHiUOhfkruce', '251-581-0450', 'female', '2000-01-29', 'client', '57229 Ramona Fork\nSouth Antonette, IN 07940', 'Mississippi', 'East Deontaeborough', 'Fuga rerum et deleniti temporibus vitae culpa.', 'qui', 'colocation', NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(88, 'Alyson', 'Cartwright', 'qrutherford@example.org', NULL, '$2y$12$GHjkNzje951G/TmFTrC6f.3vk4/rQgJucJCGPSCbHc9OKvtcqeAtG', '(614) 672-7443', 'male', '1992-11-02', 'client', '57773 Wisoky Haven\nKuphalstad, MT 70380', 'Arkansas', 'Port Fernandoborough', 'Delectus libero voluptatem blanditiis non ut.', 'quae', 'colocation', NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(89, 'Modesto', 'Bednar', 'xroberts@example.net', NULL, '$2y$12$ibHXv8bVhmX4I9WNkEdm4eljZH4wYn9uXJnhz3FfDSkuezObhDKFG', '+17089579667', 'female', '1971-07-15', 'client', '35111 Erdman Manors\nSouth Declanbury, LA 18342-9291', 'Missouri', 'Haagtown', 'Est exercitationem voluptas ducimus voluptate.', 'saepe', 'loué', NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(90, 'Nickolas', 'D\'Amore', 'konopelski.emilie@example.net', NULL, '$2y$12$pKr2RNX8HjRdlLWRgpCo5eZquXi/w/xTps7gUt8rLOEgVoxG8jrEO', '573.707.2512', 'male', '2023-02-02', 'client', '264 Abshire Ridge\nPort Chetfort, WA 28972', 'Missouri', 'North Josephine', 'Sit a maxime quia quia.', 'et', 'propriétaire', NULL, '2025-02-26 19:52:05', '2025-02-26 19:52:05'),
(91, 'Kip', 'Botsford', 'vada.conroy@example.com', NULL, '$2y$12$aHni.np1Ama.aHet.GZHYeUBURKeClX0eQKOhUdVmaJnm7.1daGnq', '+1.570.332.8074', 'female', '1979-04-30', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'XXqH9RNrPN', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(92, 'Kaela', 'Eichmann', 'pollich.kobe@example.net', NULL, '$2y$12$I/N/s6V/83Q3y3r/TWYCoei7AIJpNkWA1UhKSBtgnUVIcVf.X41x.', '(757) 529-8845', 'male', '2021-06-16', 'client', '64434 Towne Ridges Apt. 989\nDaveshire, PA 58413', 'Virginia', 'Miloton', 'Voluptatum recusandae et a et culpa quo doloremque.', 'saepe', 'loué', NULL, '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(93, 'Mae', 'Daugherty', 'grayce60@example.net', NULL, '$2y$12$VztCbe4LQIZfpasVV/oQpuFUOL1z/C7fo.eiNTPJyin9UM5yoC02O', '1-337-639-3214', 'female', '2015-03-04', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'YYk2Tklkcy', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(94, 'Frederick', 'Goldner', 'hodkiewicz.ivory@example.com', NULL, '$2y$12$cN2DSMLgHpB.ppUvjKRsOOYnQjvGwIMjgyhniZD2Xnnq.ZR/pP46q', '+13252028028', 'male', '2018-02-05', 'client', '86710 Runte Freeway\nEast Vivienland, WY 18565-1427', 'Wisconsin', 'North Laisha', 'Impedit dolores sit eius et et doloribus.', 'et', 'loué', NULL, '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(95, 'Esta', 'Renner', 'dashawn17@example.com', NULL, '$2y$12$InGkbaj0i9OvYBz6YWbnR.RLAvdHwH86opgZQArvMr4f7kTHGsTPa', '+1-318-681-0868', 'female', '2006-01-01', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, '6muWPNDqf6', '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(96, 'Joel', 'Murphy', 'idell.schulist@example.net', NULL, '$2y$12$i4JC1Km82HH6bBtG7IkOt.byONgwpJzIRnH.HOmlvWbkL29KANn6a', '+1 (424) 718-3035', 'female', '2010-06-04', 'client', '1633 Considine Extensions\nPort Jannieport, VT 38837', 'Idaho', 'Klockoport', 'Corrupti velit et delectus perspiciatis.', 'reprehenderit', 'propriétaire', NULL, '2025-02-26 19:52:06', '2025-02-26 19:52:06'),
(97, 'Janessa', 'Pfannerstill', 'lavern88@example.net', NULL, '$2y$12$wEAoMVb0RFPDgwrbwW3U0.eZUz8Wvz2EHc19nGs459ad9wTkTK7Bq', '+1 (412) 722-8769', 'male', '2012-04-28', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'uevP0kvRUP', '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(98, 'Callie', 'Quitzon', 'schaefer.ella@example.org', NULL, '$2y$12$KQFR9raLZlIb7XJnE4JfduBHUEnmi.l/LqHD5qZieIcmRgu/xaEfe', '(412) 658-0827', 'female', '2007-07-07', 'client', '35216 Allie Branch Apt. 549\nEast Vladimirfurt, NH 14049', 'Hawaii', 'South Ofelia', 'Et nulla molestiae distinctio expedita eveniet sunt.', 'neque', 'propriétaire', NULL, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(99, 'Emerson', 'Pacocha', 'brianne58@example.net', NULL, '$2y$12$name5Q8uhZJgVhKSLClPW.Et2oiGmbfzy.IPxKkVMoCzJsULW.3Cm', '973-790-1935', 'female', '2023-10-05', 'client', '64009 Armand Bypass\nNew Dixie, AK 75825', 'West Virginia', 'Port Maribel', 'Quibusdam at incidunt eos.', 'et', 'loué', NULL, '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(100, 'Alana', 'Bernhard', 'preynolds@example.net', NULL, '$2y$12$HGY/oymp2ILrThbJmmWSX..d3XArhHedFf8SgH5QLoP2dWiIw0k9C', '+13513065960', 'female', '1972-09-23', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'Psoy8Oi9q7', '2025-02-26 19:52:07', '2025-02-26 19:52:07'),
(101, 'Caesar', 'Johnson', 'carlotta05@example.net', NULL, '$2y$12$ognU3JDRpGleZL7j5ODAheCRCBiDBoI/bmfy0qqBLanaHlLLg4z4a', '321-351-2717', 'male', '2022-08-28', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, '4lIZZCJVZZ', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(102, 'Rafael', 'Brown', 'alfonzo47@example.net', NULL, '$2y$12$UBjYp7.iaWEnqZEIpWkk5OCxVWf2F44OL0MVMkpMRXF0oRubxSIYe', '239.414.5822', 'male', '2023-04-14', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, '1Ob68oQdyf', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(103, 'Meaghan', 'Nader', 'djenkins@example.org', NULL, '$2y$12$2WH7kTPkVsfU7Ulok4VOq./BOisBt3Ao7z2ZrluLFJfxQ1A92.oga', '(254) 881-2653', 'female', '1987-04-01', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'dVPdjDVrtr', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(104, 'Heath', 'Gleason', 'travon38@example.com', NULL, '$2y$12$1vgoOftG1rDbnIg0ZKSz.u8JMAJrfEciOitk2WvJny7cH7WJyqjx6', '531-909-4272', 'male', '1998-09-25', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'eyb3DQIIDm', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(105, 'Madilyn', 'Bahringer', 'senger.hailee@example.org', NULL, '$2y$12$Vrg2xNIe/ZzN1ra0zAf9Gel83PUV0YRaUXzwbx5btwdUcz0faFccW', '(475) 333-1202', 'female', '1991-08-14', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'IbwZjkRy1k', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(106, 'Makayla', 'Harber', 'raheem25@example.org', NULL, '$2y$12$gSqMaiJmOMZZOAzUqa2VPel.I74w7pN4l74w4t.XBvdFkb81kJYA.', '385-475-3403', 'male', '2021-04-26', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'bNt3wQroZh', '2025-02-26 19:52:08', '2025-02-26 19:52:08'),
(107, 'Kayleigh', 'Roberts', 'kolby60@example.com', NULL, '$2y$12$y.FmpM9Z.VS5.gxwEWlkduGr3z1I.2eI0waI4xJK9v7D/B/nomLCm', '(929) 221-9036', 'male', '2022-10-20', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'iCsU0NfJbU', '2025-02-26 19:52:09', '2025-02-26 19:52:09'),
(108, 'Ernestine', 'Pfeffer', 'bartell.isom@example.net', NULL, '$2y$12$MU0/jR.uULQYbBzriHN7buB/BreczZ/847H2ozNUvVtTyUfc7TAjK', '+14155771682', 'male', '1993-02-05', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'Y2vo2ZlDvs', '2025-02-26 19:52:09', '2025-02-26 19:52:09'),
(109, 'Tyrese', 'Senger', 'hallie17@example.com', NULL, '$2y$12$33PWkPzaxsSZ6ZCVcfeHTORLmH2K2Zn8Vj385BzVWSKL7FOgZga.O', '269.726.1377', 'male', '2006-06-14', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'gEWqveMTKy', '2025-02-26 19:52:09', '2025-02-26 19:52:09'),
(110, 'Keshawn', 'Lind', 'jnicolas@example.net', NULL, '$2y$12$SWpbluPjFQJaudmNkETPRuvHofkj0zX9CBVJ3aMuWhyGC.UdldXQO', '+1-260-566-1292', 'female', '2003-10-27', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'Z0j5WxxkuP', '2025-02-26 19:52:09', '2025-02-26 19:52:09'),
(111, 'Ethyl', 'Cummerata', 'trinity.dare@example.net', NULL, '$2y$12$f78DoJb/ha6TVNaICh.MmeC.pKOuYnfAHwZTe7ukJRo0wyyfZvkUC', '469.818.0613', 'male', '1995-03-21', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'dMHgepdGQA', '2025-02-26 19:52:09', '2025-02-26 19:52:09'),
(112, 'Amira', 'Wintheiser', 'damore.bernardo@example.net', NULL, '$2y$12$89bdNFXkawU27tHLdJVp/.ckWCTAPvEAr8ZKcee.5jV/llaZfuH/2', '+1-518-763-4527', 'male', '2024-04-17', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'oJhFjT8mkf', '2025-02-26 19:52:10', '2025-02-26 19:52:10'),
(113, 'Zora', 'Carter', 'dandre45@example.net', NULL, '$2y$12$QZKbANb4Wn0GeJaOe/DvP.7ksOSgr6OloWJm.htyWmaRMd..C7AMO', '347-391-8800', 'female', '2004-08-25', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'CmwnZSQ8tH', '2025-02-26 19:52:10', '2025-02-26 19:52:10'),
(114, 'Nora', 'Jacobson', 'dayana10@example.com', NULL, '$2y$12$ZmTeM/R0RW/V.FBXGLj7UOoosvC5fip2dsPA3UWylRjhURPqWujI6', '+1 (419) 487-2634', 'female', '1981-04-17', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'EWrqL5rSBA', '2025-02-26 19:52:10', '2025-02-26 19:52:10'),
(115, 'Morgan', 'Nienow', 'hmccullough@example.org', NULL, '$2y$12$XTROheXMfijxTj2Kq9yaPecnhotZSvYwfsTslq2X8qDTbIkdET6hu', '+1-432-415-9431', 'female', '2007-03-27', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'a1AGjMcYtR', '2025-02-26 19:52:10', '2025-02-26 19:52:10'),
(116, 'Rocio', 'Terry', 'willow.boyle@example.org', NULL, '$2y$12$BJ8uvkEoshCVX8YaQRWQGOqAz8KKL6JHHAddLGRW2c6RFGJRa07iy', '+1 (223) 758-2472', 'male', '1988-10-12', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, '4oqNqzCWGE', '2025-02-26 19:52:10', '2025-02-26 19:52:10'),
(117, 'Kadin', 'Kuhic', 'alize98@example.com', NULL, '$2y$12$TeQQW1g3zH5JOBKmMXfj0.kXqlfPACdB4o3drzXpLp6v1h58NUGIy', '541-921-8445', 'male', '1971-02-06', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'TPvsVlzFSn', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(118, 'Erik', 'Luettgen', 'jeichmann@example.com', NULL, '$2y$12$JlWtLX6UXG6zXtWIwO6QHudtridRYQswq72NQ/dga2GXUIQlVJbz6', '1-870-718-2473', 'male', '2012-07-21', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'VPMJMYOgq3', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(119, 'Kirsten', 'Quitzon', 'melba79@example.com', NULL, '$2y$12$bcuz5VbQxGVS19/DY8Q4k.hp8c/PteZM0jb93Ap7bEhJbY5.9JJRC', '734-936-2955', 'female', '2020-07-05', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'Q0lxbMLwz7', '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(120, 'Jeramy', 'Wyman', 'auer.camden@example.net', NULL, '$2y$12$dfAtRq25bqGCBk8p5Jp02O5v5btHAuXnyqiTHFof5Anyd/jcaAT5i', '+15862356292', 'female', '1972-06-13', 'client', '16412 Bahringer Extensions\nPort Mackenzie, NC 93363', 'Iowa', 'Alisashire', 'Eveniet ullam voluptatem vel ut praesentium error.', 'et', 'colocation', NULL, '2025-02-26 19:52:11', '2025-02-26 19:52:11'),
(121, 'Kaylah', 'Reinger', 'francisca.mann@example.net', NULL, '$2y$12$JXJNDffo8g0E4L.9bhEnBO.WxGzW0awhtDtT.7m/HkvgVhltB9AtG', '+1.910.923.2601', 'male', '2010-01-23', 'client', '89885 Hoppe Well Suite 364\nPurdyborough, ID 35197', 'Maryland', 'South Heloisechester', 'Molestiae sit quia voluptate unde voluptas cum omnis.', 'sequi', 'propriétaire', NULL, '2025-02-26 19:52:12', '2025-02-26 19:52:12'),
(122, 'Miracle', 'Gulgowski', 'mcclure.leatha@example.net', NULL, '$2y$12$1nLqYMyW6i//WAyEB/nUju3gPqoxP2wcUubnm9YRa1XOTSybSGmIK', '+1-228-891-0685', 'male', '1973-04-13', 'client', '279 Senger Groves\nNorth Jilliantown, IA 48198', 'Hawaii', 'Fredville', 'Libero dolorem quidem delectus fugiat molestiae facilis eius.', 'sapiente', 'colocation', NULL, '2025-02-26 19:52:12', '2025-02-26 19:52:12'),
(123, 'Nat', 'Reinger', 'tleannon@example.org', NULL, '$2y$12$K1Hs.ZyfhgJ3EVwQVUcWH.7wRSlOS20hHeWTCLmNTCjA2yJMSYBh2', '1-602-998-4638', 'female', '1980-09-11', 'client', '1064 Stamm Mountain\nNew Bustershire, ND 32685', 'Oklahoma', 'Port Kendrick', 'Vitae cupiditate magni fugiat minus vero.', 'consequatur', 'colocation', NULL, '2025-02-26 19:52:12', '2025-02-26 19:52:12'),
(124, 'Albertha', 'Lynch', 'sipes.annabel@example.net', NULL, '$2y$12$eFSNCpjbT36XSuxn./NHVuIHxA/NTDSMB7wsU0u4k7zgQ4ZBFUPlG', '(253) 230-5403', 'female', '2023-06-08', 'client', '298 Shields Street Apt. 680\nRyleighchester, MA 64564-5540', 'Alaska', 'East Joshuahfort', 'Sapiente facere officia voluptatum odit facilis.', 'quis', 'loué', NULL, '2025-02-26 19:52:12', '2025-02-26 19:52:12'),
(125, 'Kelsi', 'Leannon', 'glind@example.org', NULL, '$2y$12$m5DqHvcT4Pvd2FS20ZaJh.xCLMbgTncGCgR7e2.kaaNbrePZFjF0W', '820-905-1712', 'female', '2002-03-10', 'client', '58066 Bashirian Viaduct Apt. 064\nSouth Clint, ID 74818', 'Kansas', 'Weimannmouth', 'Ut ea vero eius aut deserunt nemo dolores.', 'consectetur', 'colocation', NULL, '2025-02-26 19:52:12', '2025-02-26 19:52:12'),
(126, 'Jules', 'Hartmann', 'elaina64@example.com', NULL, '$2y$12$mqrn5ma1YNpCMqR5BcpGVeh4Uv0riO/xwpOqEuCgtjJR1nFNGw7HK', '(872) 662-7812', 'male', '2013-08-23', 'client', '30833 Emmerich Turnpike Apt. 598\nKlockostad, WA 73192', 'Connecticut', 'Damianville', 'Sit est officia non maiores.', 'fugiat', 'colocation', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(127, 'Norma', 'VonRueden', 'wehner.shaun@example.com', NULL, '$2y$12$a830H060TIfV94Djk5Wt9uhxtPUUYKVFZw6/xqd1mqLD4WkO7xNry', '1-657-586-8816', 'male', '2021-10-07', 'client', '353 Roberts Port\nFriesenton, GA 32222', 'North Dakota', 'East Everettborough', 'Repudiandae eos vel nisi eos odio.', 'amet', 'propriétaire', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(128, 'Asia', 'Kessler', 'pstreich@example.org', NULL, '$2y$12$eK/AG3vLmpppo6zSfe1lDunYyxSlfNBeHmByI.qggg5WJMUUIeoTG', '+1-856-846-8006', 'female', '2004-08-31', 'client', '12191 O\'Conner Island Suite 694\nPurdyville, MD 63732', 'West Virginia', 'East Melynatown', 'Voluptatem sed commodi officia aspernatur.', 'assumenda', 'loué', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(129, 'Burley', 'Thiel', 'erica.king@example.org', NULL, '$2y$12$QZMsm6bojR3Ap8hXBxzcvuV1r6lN/mB.WcgJazSg1N3.fTRrpoAhu', '+1-773-966-8783', 'male', '1970-09-25', 'client', '61597 Greenholt Green\nMeggieton, TX 75691', 'Arkansas', 'West Ewaldshire', 'Voluptatem sed velit repellat deleniti sed.', 'quis', 'propriétaire', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(130, 'Megane', 'Shields', 'ian.schumm@example.org', NULL, '$2y$12$0VsXhRHkmLy7e4nfpuWZDOPRlKjc46/RJgAVVWS8reURjjcM5G1D.', '1-973-327-1225', 'male', '1980-07-12', 'client', '15873 Jerde Estates Suite 254\nEast Aaronburgh, ND 57546-1804', 'District of Columbia', 'New Quincy', 'Omnis assumenda consectetur possimus sit.', 'ut', 'propriétaire', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(131, 'Cleveland', 'Hammes', 'providenci.tromp@example.net', NULL, '$2y$12$4eSiyZs9ekNZFMQx6TYzleCQW9ZNt7sfYqrJoHZsuEDJFeFzFQDn2', '+1-346-310-9411', 'male', '1982-01-27', 'client', '37402 Bernier Courts Apt. 093\nAmelyfurt, VT 52066-4528', 'Minnesota', 'Donnellychester', 'Ratione commodi nobis tenetur aut assumenda.', 'quisquam', 'loué', NULL, '2025-02-26 19:52:13', '2025-02-26 19:52:13'),
(132, 'Efrain', 'Wolf', 'vschaden@example.com', NULL, '$2y$12$4iQjO4d3PoRl/nfSo0B9L.5M435T4hyaoFCxu2be0eYZeFx0Nn35m', '218-319-5410', 'male', '2023-06-07', 'client', '395 Yolanda Inlet Suite 264\nBerthabury, IN 20655', 'North Carolina', 'Kuhictown', 'Numquam sed ullam nam quidem occaecati pariatur consequatur.', 'et', 'propriétaire', NULL, '2025-02-26 19:52:14', '2025-02-26 19:52:14'),
(133, 'Stanford', 'Rempel', 'stewart17@example.org', NULL, '$2y$12$sILr7pyqsx/uK5WnwbvvY.tGF2FjVX0Oc8Unj1u7fdvVSA0v.itlq', '910.405.1594', 'male', '1974-03-12', 'client', '50539 Marianna Crossing Apt. 752\nWest Frankiehaven, IA 59856-8514', 'Illinois', 'Quitzonshire', 'Maiores et ex accusamus rem voluptas rerum.', 'in', 'colocation', NULL, '2025-02-26 19:52:14', '2025-02-26 19:52:14'),
(134, 'Arno', 'Franecki', 'wolf.kieran@example.org', NULL, '$2y$12$ZqC/bOBqfKGTIxXDUwg5VejwlhltIXOOIXn3GvLjUBSx7CNR8F9iK', '616-742-1459', 'female', '2009-05-18', 'client', '9542 Simonis Rapids Suite 862\nNolaside, IL 63191', 'Wisconsin', 'Port Robin', 'Harum recusandae molestiae sed asperiores consectetur rerum.', 'et', 'loué', NULL, '2025-02-26 19:52:14', '2025-02-26 19:52:14'),
(135, 'Lisandro', 'Collier', 'arturo.muller@example.com', NULL, '$2y$12$p.XpxsP95UOxqLCNbQHFwucdyYy8phekBlnhSgPT7w.Y7GZtEF3sW', '1-812-608-4088', 'female', '2013-04-08', 'client', '4200 Jacky Glens\nWest Elliemouth, MN 13000-4976', 'Mississippi', 'South Kirstinhaven', 'Dolores ut minima inventore quae dolores iste.', 'nesciunt', 'propriétaire', NULL, '2025-02-26 19:52:14', '2025-02-26 19:52:14'),
(136, 'Elroy', 'Runte', 'hheathcote@example.net', NULL, '$2y$12$sMghpxCf.Gt9QZhbIhz4dOGKr1SnhNUdCA2wxZnnA2LbCPNfUsBrS', '1-424-759-6173', 'male', '1996-02-09', 'client', '953 Enrico Course Suite 924\nKathleenburgh, WV 55759', 'Tennessee', 'East Russelside', 'Qui debitis tempora nihil amet quae voluptatem.', 'quia', 'propriétaire', NULL, '2025-02-26 19:52:14', '2025-02-26 19:52:14'),
(137, 'Lura', 'Haag', 'abigayle75@example.net', NULL, '$2y$12$NQd1WWWQOAgUizhsOMptQuQwGXQgeRkAilbU9CmjNNQJa4TMLNBcy', '1-551-347-9927', 'female', '2002-06-23', 'client', '660 Ruth Avenue Suite 212\nLake Lailaview, OH 40992-8671', 'Nebraska', 'Cortezfort', 'Unde expedita quia laudantium quia ut rerum.', 'rerum', 'propriétaire', NULL, '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(138, 'Efrain', 'Armstrong', 'stehr.fay@example.net', NULL, '$2y$12$9zbNijw3lq3n0o7/nHG42uAIZb91JOLeDPkJ1TEdSpG/cci20LMIu', '+1.424.295.5174', 'male', '2011-09-02', 'client', '965 Murazik Junction\nLake Geraldineville, MA 57275-7002', 'Kansas', 'Rowechester', 'Ipsam temporibus quo eius quaerat consectetur.', 'error', 'propriétaire', NULL, '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(139, 'Marianna', 'Boyer', 'collier.kelsi@example.net', NULL, '$2y$12$L/3Tdqi/U8uoOJg5Uy7e5.JfLVnT3TYCyVdC3C3MG395jaDq8/WM2', '361.926.8212', 'male', '1977-11-18', 'client', '2390 Murazik Terrace Apt. 393\nFilomenatown, IL 43938-2626', 'Idaho', 'Legrosburgh', 'Itaque tempore nesciunt fugit et praesentium.', 'qui', 'loué', NULL, '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(140, 'Mazie', 'Hermann', 'dwight.gleichner@example.com', NULL, '$2y$12$UVmNpJ4zMTcefzqcf94HAu9g5Gx5JkrUFsTL9qgqJhU5xZeA/uoeW', '1-312-930-5144', 'male', '1978-10-23', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, '5IWnrT7kgZ', '2025-02-26 19:52:15', '2025-02-26 19:52:15'),
(141, 'Cydney', 'Marquardt', 'watsica.leland@example.net', NULL, '$2y$12$vKPKK8EYmD8Dx4VTJTybse0qrgna7Xypa80cuhD4gNPwR2c0asTPq', '708-232-4873', 'male', '2013-12-29', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'lG8Tzi5Ev2', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(142, 'Jevon', 'Stark', 'lowe.delfina@example.com', NULL, '$2y$12$qMhaD5kLPf0kVtZx5.PquOjMIX7nSz1RtXZdQd6nAOrcWZa3t5vf2', '(231) 625-8891', 'male', '1975-11-22', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'o5t2xNodF5', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(143, 'Leatha', 'Bailey', 'bart91@example.net', NULL, '$2y$12$iVK25Z4Bpmv.Rko2NSA13eNI/u3/dA8SjB3t40b5EWRlWVQFG.Ctu', '+1-530-678-5032', 'male', '1998-01-23', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'E0L0y2sqBA', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(144, 'Garnet', 'Boyer', 'ldenesik@example.com', NULL, '$2y$12$7VyS9jRhOG1CX9LhHoGxu.zHBj2ixM4BSKGVjOQOVQFPNRm0rOFP.', '+1.484.532.6190', 'male', '2016-11-04', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'F71jyngyVo', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(145, 'Zackery', 'Gutmann', 'michele26@example.com', NULL, '$2y$12$42hjdJwZft1XFXxbTJPD2ug8DFvGNJjdyrHUogDMq01SeAyb7dFoG', '+1-304-753-7102', 'male', '2020-09-23', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'ikFiNJWoLF', '2025-02-26 19:52:16', '2025-02-26 19:52:16'),
(146, 'Eliza', 'Steuber', 'blowe@example.com', NULL, '$2y$12$dOMjbcJDqf/wMTb94.4hCO4zrIW325kOQFXylg7TPYhWLUYB2mhBW', '541-448-1038', 'male', '1986-10-17', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'mIT4OjYJE3', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(147, 'Logan', 'Gleason', 'leola18@example.net', NULL, '$2y$12$g3C/siofIFqadb1/ZlDV1uL7RBk0v1mnEFF8yuC/HuHARbu28Rtnu', '(470) 682-9362', 'female', '1971-09-06', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'YOiUBPr0tJ', '2025-02-26 19:52:17', '2025-02-26 19:52:17');
INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `email_verified_at`, `password`, `telephone`, `genre`, `date_naissance`, `role`, `adresse`, `region`, `ville`, `compositionFoyer`, `typeLogement`, `statusLogement`, `remember_token`, `created_at`, `updated_at`) VALUES
(148, 'Gage', 'Tillman', 'boehm.arlene@example.org', NULL, '$2y$12$V5v7RLR8GW8cWn0YqHVE2.6H1HvaA5uQQCNBn4NnE6kn3/kTCZdzW', '(223) 579-8967', 'male', '2002-06-18', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'm2wEnrb38s', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(149, 'Damaris', 'Wyman', 'alvena.gerhold@example.net', NULL, '$2y$12$jW2Ih6RFx9kXkGPsB/FSQecLiy64ZqtxqYXyRrgPSSLYdJdo9CPzu', '678-377-5810', 'female', '1973-12-25', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'ONRj9csgmM', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(150, 'Mervin', 'Sanford', 'jennifer.crist@example.org', NULL, '$2y$12$uT8GFdEJMwqD5TVDcfbu7ufavpAdxx6SV.QiHIJGG1L1VsHjIgh5O', '(360) 810-7119', 'male', '2023-03-12', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'VONfvodpcc', '2025-02-26 19:52:17', '2025-02-26 19:52:17'),
(151, 'Ara', 'Hegmann', 'elta.graham@example.net', NULL, '$2y$12$WM7LAYKX2306Y5uI4fVpredJtZP5lVGWzFdmmrJKBx6QZwc782JYe', '+1-463-931-3468', 'male', '2002-01-28', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'gf1IUtGeIg', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(152, 'Diamond', 'Hill', 'grayce.jaskolski@example.net', NULL, '$2y$12$lDX.Fp913jpzmPNYOOq.1.Ay4ytp4oJVjpBBhQWYsTZlGJuVDL7VK', '+16627273913', 'male', '1977-12-09', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 're5PMcyUhF', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(153, 'Orlando', 'Russel', 'haley.randi@example.org', NULL, '$2y$12$IJ0E1SkSffPKlgehw2Y4ruSs4vQsSdSSFXXYSYYwzvGjsvE3b4BWW', '+1.231.515.6863', 'male', '1994-05-11', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'Ln9PqTuaau', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(154, 'Mikel', 'Predovic', 'hahn.jack@example.org', NULL, '$2y$12$UFyNn9ayhCdV6Lbnc4/Ryun9YnyGR/Me047TLtteQkBWH4RzRgcvC', '410.679.8506', 'male', '2018-04-12', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'cgXLVkrm77', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(155, 'Isom', 'Tromp', 'cedrick89@example.com', NULL, '$2y$12$EhxfayffY4TXniZ8fkleIOQPr9yPhpmhhglkr2e8qyEU2Au1KEDua', '+1.458.941.2989', 'male', '1989-04-08', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'lCyFguUfuU', '2025-02-26 19:52:18', '2025-02-26 19:52:18'),
(156, 'Sophie', 'Jacobson', 'mhane@example.org', NULL, '$2y$12$.TPS/OAzrlQ9OrttUsT3fuNNPUzw0.l5h4hOSDZj8xS0OSugsC.LG', '520.727.2915', 'female', '1990-07-22', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'SOPTo5HtYl', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(157, 'Jensen', 'Reynolds', 'sauer.sally@example.net', NULL, '$2y$12$wQ/yUu6J0ooiwM7x6ZtTjutMB/x6BltriYu8ZpHGUvZS1lNdGoXgO', '+1-847-427-9815', 'female', '1994-06-10', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'viRki5QATi', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(158, 'Ava', 'Bradtke', 'kurt05@example.org', NULL, '$2y$12$FDeTkkS8DnmcRG36VlJnie5DgWjmJZRtspT1bTIAJEP0reTSh8/g6', '+1 (678) 585-1047', 'female', '2015-10-10', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'oUwbNoyw2T', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(159, 'Kobe', 'Kerluke', 'fahey.sunny@example.org', NULL, '$2y$12$7nsX8AuPlDkUtXK2MsPnLumhsIwY1mfjKWewNBm55Wn7It.Dd6jVu', '901.512.3001', 'male', '2011-03-28', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'sxl2rhTHkr', '2025-02-26 19:52:19', '2025-02-26 19:52:19'),
(160, 'Rosalind', 'Lueilwitz', 'monica25@example.net', NULL, '$2y$12$PUsyaAMOu.42HCBNB8GDceXiZupK1LdN/7l5.s84NaYK8nJp29Dru', '234-654-2890', 'female', '1977-02-13', 'client', '68160 Isabel Cove Apt. 797\nLake Bertview, MN 26858-4449', 'Washington', 'Port Tia', 'Numquam placeat dolores eum quibusdam repudiandae quae.', 'tempora', 'loué', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(161, 'Myron', 'Yundt', 'granville00@example.org', NULL, '$2y$12$QhTTEoha.aSuutXD8EkM.eiWuS0KPgQ.UKHttBPVo2Lu6OwOvuoZ6', '+14095622778', 'male', '1989-03-21', 'client', '832 Antonette Orchard Apt. 766\nNorth Aglae, NV 30850-2155', 'North Dakota', 'Ocieville', 'Aperiam qui ad qui ipsa in natus.', 'quia', 'propriétaire', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(162, 'Bethel', 'Fritsch', 'hintz.avery@example.com', NULL, '$2y$12$sWkZLSgRmKgzas/pY9ZlMu450BAfR/tIqVAFxo.QmwvcY7LH.NJWG', '+1-458-222-3675', 'male', '1972-01-19', 'client', '8474 Jerel Ranch Apt. 241\nNew Henriette, KS 51597', 'Kansas', 'Darianachester', 'Sed quasi maiores maiores occaecati necessitatibus excepturi reprehenderit omnis.', 'deleniti', 'loué', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(163, 'Mia', 'Hackett', 'fhoppe@example.org', NULL, '$2y$12$iN/EebaCwWDNIDL0VVwow.CptVZVDoAK91RC9/caNJQoDwrkvSTW6', '+1-925-965-3372', 'female', '1972-02-11', 'client', '8365 Jamel Falls\nStokesberg, TN 02142-7415', 'Louisiana', 'East Monicaland', 'Maxime consequatur ea molestias veniam officiis similique.', 'ex', 'loué', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(164, 'Michele', 'Nikolaus', 'johnson.darlene@example.net', NULL, '$2y$12$N9c2LrXFYkFeDlqCKcaaN.GZwt9XmKX69KFo5epUdSw9aAWbZnhF6', '909-293-3995', 'male', '1990-04-22', 'client', '5192 Madalyn Lakes Suite 724\nNorth Ashlee, MS 08353-6338', 'Idaho', 'Cordiebury', 'Quam aliquid saepe omnis dolor labore accusamus repellat.', 'exercitationem', 'loué', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(165, 'Kelvin', 'Flatley', 'jerome.reilly@example.org', NULL, '$2y$12$a3uY/vpRKAmviIjgxwTDmOUPTVMKy5rrL62e1Jc2u8OICooEiL5j2', '1-901-412-2266', 'male', '1991-03-29', 'client', '796 Tom Flats\nPatbury, MO 79781', 'South Carolina', 'Haleyview', 'Provident mollitia consectetur possimus et aut alias quis unde.', 'tempore', 'propriétaire', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(166, 'Freddy', 'Ruecker', 'rylan.halvorson@example.org', NULL, '$2y$12$oJJbIIdw4wSluLYtPoFiLutuszoqiZwxe5OBAql5kMYwHk6p/Y/86', '+1-360-313-8176', 'male', '1996-01-20', 'client', '3785 Crooks Stravenue\nKutchhaven, GA 75262-9556', 'Georgia', 'East Casimirborough', 'Cupiditate delectus alias consequuntur corporis ex numquam ex.', 'omnis', 'propriétaire', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(167, 'Quinton', 'Hyatt', 'phyllis.franecki@example.net', NULL, '$2y$12$XKhKdDzCIm4ayigDJAWwE.G7CDsxUNMaXP.R1UJYHn18WHCDIhM9e', '+1-364-309-8462', 'female', '1975-06-24', 'client', '900 Lexie Divide\nEast Laruebury, AK 81035-4319', 'Minnesota', 'O\'Reillyview', 'Assumenda omnis possimus corrupti voluptatem quas.', 'voluptas', 'propriétaire', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(168, 'Scottie', 'Howell', 'zieme.tracy@example.com', NULL, '$2y$12$RHHcEw2OclhSQW8x4T.T6ecOkk2LJRVl/FffUhgCCGXqcXVl0y.Em', '1-971-617-2802', 'male', '2008-03-09', 'client', '148 Conroy Mountains Suite 029\nLake Samaraville, MI 68986', 'Idaho', 'South Shakirabury', 'Optio doloremque ut placeat et et necessitatibus repellat doloribus.', 'reprehenderit', 'colocation', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(169, 'Martina', 'Maggio', 'beer.simeon@example.net', NULL, '$2y$12$2u9XyM.zXgUMXmDZw1OjG.J8ucidmxqTzmHp4NJwUf/kGUD23stsS', '+1 (770) 472-6391', 'male', '1999-01-27', 'client', '3647 Beier Loaf\nBaileeshire, KY 00287-5367', 'Florida', 'West Wendy', 'Tempora adipisci sequi et beatae illo.', 'cumque', 'colocation', NULL, '2025-02-26 19:52:21', '2025-02-26 19:52:21'),
(170, 'Orie', 'Daniel', 'brandon.armstrong@example.org', NULL, '$2y$12$k9/NCBKu0SN5MmQCik19uO8YgqJd6KaRXfsrYTq0MOrot7sxl9TZm', '+1 (480) 725-7942', 'female', '1976-08-22', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'vnXBwPyc4Y', '2025-02-26 19:52:22', '2025-02-26 19:52:22'),
(171, 'Jamar', 'McKenzie', 'bertrand.mclaughlin@example.org', NULL, '$2y$12$xPsMx0Od/EUmLLTcay4Fs.QxpRPksyNWDlG.ffFsMvdGepOtZ..5.', '+17579777670', 'male', '1995-05-04', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'ewtmomwr1X', '2025-02-26 19:52:22', '2025-02-26 19:52:22'),
(172, 'Elfrieda', 'Weimann', 'hahn.coby@example.com', NULL, '$2y$12$6vbEwRZ.AJJiPJ3.jKfNAODwUuiGk3cwpcZiytsWVdRWOZJJjHVvS', '(918) 221-2257', 'male', '2010-08-24', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'rzvAxsQAX3', '2025-02-26 19:52:22', '2025-02-26 19:52:22'),
(173, 'Dillon', 'Kuhic', 'karley27@example.com', NULL, '$2y$12$Zofz2uTHfUd/XOjadEVbMudZPhqihuxnytzyngXRetvGdSRdI2V2i', '1-352-981-8125', 'male', '1995-08-14', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'G1H2Lk2JCv', '2025-02-26 19:52:22', '2025-02-26 19:52:22'),
(174, 'Zoey', 'Emard', 'crona.bart@example.com', NULL, '$2y$12$QoXTsrhOsnC7/qxxErtgSO8augsUnKCsdmAPX34gHwDxg863efyKC', '918-719-1340', 'female', '1984-05-04', 'fournisseur', NULL, NULL, NULL, NULL, NULL, NULL, 'pj7BYVvWlN', '2025-02-26 19:52:22', '2025-02-26 19:52:22'),
(175, 'Mortimer', 'Swift', 'ekilback@example.com', NULL, '$2y$12$rwnM2H7y9rIDRJv.6zU1aeKLzg3z4Ywqv7Uud5f5w5DElCZYJ0iUm', '+1-757-233-5916', 'female', '1980-05-27', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'JmWAP8BQ7P', '2025-02-26 19:52:23', '2025-02-26 19:52:23'),
(176, 'Margaretta', 'Littel', 'naomie55@example.com', NULL, '$2y$12$8w.JpGE2k6NsDLl0GNR/q.RI1OPbWycM9hl/q1peaPgYl8V66wswC', '+1.559.375.8239', 'female', '2000-09-12', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'kmNhkeQkZg', '2025-02-26 19:52:23', '2025-02-26 19:52:23'),
(177, 'Marco', 'Anderson', 'rbahringer@example.net', NULL, '$2y$12$CbpRfjaWNEc1oDmkwLtNQ.GKQtFug6GAcFsywVNB69pZlU2zdlInG', '(253) 399-2130', 'male', '1997-10-30', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'qfkjMUNVbc', '2025-02-26 19:52:23', '2025-02-26 19:52:23'),
(178, 'Percival', 'Labadie', 'gennaro.crona@example.org', NULL, '$2y$12$PkEOAQgVCNFi/CiSSwSvuOMCnekVQQk2pliUZa4Xse0Nc5FScPUJW', '240.286.5075', 'female', '2022-03-22', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'wXEaGGwdKP', '2025-02-26 19:52:23', '2025-02-26 19:52:23'),
(179, 'Helmer', 'Ortiz', 'lhayes@example.com', NULL, '$2y$12$9TlVhADi4lI2nGng6M7iQuzZMipsB4oh5G3.lbQHobnLnvS5ZXn0q', '+15205736450', 'male', '1994-08-11', 'livreur', NULL, NULL, NULL, NULL, NULL, NULL, 'huqYxtVzIM', '2025-02-26 19:52:23', '2025-02-26 19:52:23'),
(180, 'Dashawn', 'Buckridge', 'admin@gmail.com', NULL, '$2y$12$wWpfh2tipo2iGdgeFEkonev9aSFKcrjsX5sWOtzR4E86D5r/yvdEC', '(458) 732-2458', 'male', '2019-09-16', 'admin', NULL, NULL, NULL, NULL, NULL, NULL, 'GwgkgTl7SQ', '2025-02-26 19:52:23', '2025-02-26 19:52:23');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categorie_id`);

--
-- Index pour la table `code_promotions`
--
ALTER TABLE `code_promotions`
  ADD PRIMARY KEY (`code_promotion_id`),
  ADD UNIQUE KEY `code_promotions_code_unique` (`code`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`commande_id`),
  ADD KEY `commandes_panier_id_foreign` (`panier_id`),
  ADD KEY `commandes_code_promotion_id_foreign` (`code_promotion_id`),
  ADD KEY `commandes_livreur_id_foreign` (`livreur_id`);

--
-- Index pour la table `couleurs`
--
ALTER TABLE `couleurs`
  ADD PRIMARY KEY (`couleur_id`);

--
-- Index pour la table `detail_factures`
--
ALTER TABLE `detail_factures`
  ADD PRIMARY KEY (`detail_facture_id`),
  ADD KEY `detail_factures_facture_id_foreign` (`facture_id`);

--
-- Index pour la table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`facture_id`),
  ADD KEY `factures_commande_id_foreign` (`commande_id`),
  ADD KEY `factures_fournisseur_id_foreign` (`fournisseur_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD PRIMARY KEY (`horaire_id`),
  ADD UNIQUE KEY `horaires_jour_unique` (`jour`);

--
-- Index pour la table `horaire_periode_horaire`
--
ALTER TABLE `horaire_periode_horaire`
  ADD PRIMARY KEY (`horaire_id`,`periode_horaire_id`),
  ADD KEY `horaire_periode_horaire_periode_horaire_id_foreign` (`periode_horaire_id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `jour_feries`
--
ALTER TABLE `jour_feries`
  ADD PRIMARY KEY (`jour_ferie_id`);

--
-- Index pour la table `marques`
--
ALTER TABLE `marques`
  ADD PRIMARY KEY (`marque_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paniers`
--
ALTER TABLE `paniers`
  ADD PRIMARY KEY (`panier_id`),
  ADD KEY `paniers_client_id_foreign` (`client_id`);

--
-- Index pour la table `panier_produit`
--
ALTER TABLE `panier_produit`
  ADD PRIMARY KEY (`panier_id`,`produit_id`),
  ADD KEY `panier_produit_produit_id_foreign` (`produit_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `periode_horaires`
--
ALTER TABLE `periode_horaires`
  ADD PRIMARY KEY (`periode_horaire_id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`produit_id`),
  ADD KEY `produits_marque_id_foreign` (`marque_id`),
  ADD KEY `produits_sous_categorie_id_foreign` (`sous_categorie_id`),
  ADD KEY `produits_promotion_id_foreign` (`promotion_id`),
  ADD KEY `produits_fournisseur_id_foreign` (`fournisseur_id`);

--
-- Index pour la table `produit_couleur`
--
ALTER TABLE `produit_couleur`
  ADD PRIMARY KEY (`produit_id`,`couleur_id`),
  ADD KEY `produit_couleur_couleur_id_foreign` (`couleur_id`);

--
-- Index pour la table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  ADD PRIMARY KEY (`sous_categorie_id`),
  ADD KEY `sous_categories_categorie_id_foreign` (`categorie_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `categorie_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `code_promotions`
--
ALTER TABLE `code_promotions`
  MODIFY `code_promotion_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `commande_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT pour la table `couleurs`
--
ALTER TABLE `couleurs`
  MODIFY `couleur_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `detail_factures`
--
ALTER TABLE `detail_factures`
  MODIFY `detail_facture_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `factures`
--
ALTER TABLE `factures`
  MODIFY `facture_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `horaires`
--
ALTER TABLE `horaires`
  MODIFY `horaire_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jour_feries`
--
ALTER TABLE `jour_feries`
  MODIFY `jour_ferie_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `marques`
--
ALTER TABLE `marques`
  MODIFY `marque_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `paniers`
--
ALTER TABLE `paniers`
  MODIFY `panier_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `periode_horaires`
--
ALTER TABLE `periode_horaires`
  MODIFY `periode_horaire_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `produit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  MODIFY `sous_categorie_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_code_promotion_id_foreign` FOREIGN KEY (`code_promotion_id`) REFERENCES `code_promotions` (`code_promotion_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commandes_livreur_id_foreign` FOREIGN KEY (`livreur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commandes_panier_id_foreign` FOREIGN KEY (`panier_id`) REFERENCES `paniers` (`panier_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `detail_factures`
--
ALTER TABLE `detail_factures`
  ADD CONSTRAINT `detail_factures_facture_id_foreign` FOREIGN KEY (`facture_id`) REFERENCES `factures` (`facture_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `factures_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`commande_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `factures_fournisseur_id_foreign` FOREIGN KEY (`fournisseur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `horaire_periode_horaire`
--
ALTER TABLE `horaire_periode_horaire`
  ADD CONSTRAINT `horaire_periode_horaire_horaire_id_foreign` FOREIGN KEY (`horaire_id`) REFERENCES `horaires` (`horaire_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `horaire_periode_horaire_periode_horaire_id_foreign` FOREIGN KEY (`periode_horaire_id`) REFERENCES `periode_horaires` (`periode_horaire_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paniers`
--
ALTER TABLE `paniers`
  ADD CONSTRAINT `paniers_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `panier_produit`
--
ALTER TABLE `panier_produit`
  ADD CONSTRAINT `panier_produit_panier_id_foreign` FOREIGN KEY (`panier_id`) REFERENCES `paniers` (`panier_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `panier_produit_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`produit_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_fournisseur_id_foreign` FOREIGN KEY (`fournisseur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produits_marque_id_foreign` FOREIGN KEY (`marque_id`) REFERENCES `marques` (`marque_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produits_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produits_sous_categorie_id_foreign` FOREIGN KEY (`sous_categorie_id`) REFERENCES `sous_categories` (`sous_categorie_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produit_couleur`
--
ALTER TABLE `produit_couleur`
  ADD CONSTRAINT `produit_couleur_couleur_id_foreign` FOREIGN KEY (`couleur_id`) REFERENCES `couleurs` (`couleur_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produit_couleur_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`produit_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  ADD CONSTRAINT `sous_categories_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`categorie_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
