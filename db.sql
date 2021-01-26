CREATE DATABASE mybooks;

USE mybooks;

CREATE TABLE book (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL ,
      author TEXT  NULL,
      release_year INT NOT NULL,
      evaluation TEXT NOT NULL
);