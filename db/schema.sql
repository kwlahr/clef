DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;
 
CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT,
    skill_level INT,
    instrument VARCHAR(100),
    genre VARCHAR(100),
    PRIMARY KEY (id)
);