DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;
 
CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT,
    PRIMARY KEY (id)
);
 
CREATE TABLE skill
(
	id int NOT NULL AUTO_INCREMENT,
	level ENUM ( '1 - beginner' , '2 - early intermediate' , '3 - intermediate', '4 - late intermediate' , '5 - expert'),
    PRIMARY KEY (id)
);
 
CREATE TABLE instruments
(
	id int NOT NULL AUTO_INCREMENT,
	instrument ENUM ( 'bass', 'bassoon', 'clarinet', 'guitar', 'drums' ),
    PRIMARY KEY (id)
);

CREATE TABLE genres
(
	id int NOT NULL AUTO_INCREMENT,
	genre ENUM ( 'pop' , 'rock' , 'jazz' ),
    PRIMARY KEY (id)
);