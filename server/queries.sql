-- EXECUTE THE FOLLOWING SEQUENCE OF MYSQL QUERIES

CREATE DATABASE `MERN_AUTH`;

USE `MERN_AUTH`;

CREATE TABLE `User` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `firstName` VARCHAR(32) NOT NULL,
  `lastName` VARCHAR(32) NOT NULL,
  `username` VARCHAR(64) NOT NULL UNIQUE,
  `hashPassword` VARCHAR(255) NOT NULL
);

CREATE VIEW `userDetails` AS
SELECT `id`, `firstName`, `lastName`, `username`
FROM `User`;

DELIMITER $$

CREATE FUNCTION `generate_hash` (
  `_password` VARCHAR(32)
) RETURNS VARCHAR(255)
BEGIN
  RETURN SHA1(UNHEX(SHA1(`_password`)));
END$$

CREATE PROCEDURE `signup` (
  IN `_firstName` VARCHAR(32),
  IN `_lastName` VARCHAR(32),
  IN `_username` VARCHAR(64),
  IN `_password` VARCHAR(32)
) BEGIN
  SET @hashPassword = generate_hash(`_password`);
  INSERT INTO 
    `User`(`firstName`, `lastName`, `username`, `hashPassword`)
    VALUES(`_firstName`, `_lastName`, `_username`, @hashPassword);
END$$

CREATE PROCEDURE `authenticate` (
  IN `_username` VARCHAR(64),
  IN `_password` VARCHAR(32)
) BEGIN 
  SELECT `id`, `firstName`, `lastName`, `username`
  FROM `User`
  WHERE `username` = `_username` AND `hashPassword` = generate_hash(`_password`);
END$$

DELIMITER ;
