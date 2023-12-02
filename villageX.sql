-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema village
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `village` ;

-- -----------------------------------------------------
-- Schema village
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `village` DEFAULT CHARACTER SET utf8mb4 ;
USE `village` ;

-- -----------------------------------------------------
-- Table `village`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `village`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `village`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `village`.`contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(25) NULL,
  `linkedin` VARCHAR(255) NULL,
  `headline` VARCHAR(3000) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL,
  `photo` TINYINT NULL DEFAULT 0,
  `preferred` VARCHAR(10) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contacts_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_contacts_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `village`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `village`.`comms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `village`.`comms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commsDate` DATE NULL,
  `channel` VARCHAR(10) NULL,
  `company` VARCHAR(255) NULL,
  `status` VARCHAR(45) NULL,
  `summary` TEXT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  `contact_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comms_contacts1_idx` (`contact_id` ASC) VISIBLE,
  CONSTRAINT `fk_comms_contacts1`
    FOREIGN KEY (`contact_id`)
    REFERENCES `village`.`contacts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `village`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `village`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
