DROP DATABASE IF EXISTS lab_02;
CREATE DATABASE lab_02;
USE lab_02;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(50), 
    status VARCHAR(50), 
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

INSERT INTO users (username) VALUES
('moakarlssonns'),
('kingoftasks'),
('horselover'),
('multitask_queen'),
('rihanna');

INSERT INTO tasks (title, description, status, user_id) VALUES 
('Walk the dog', '1 hour walk with Sarah around the park', 'done', 1),
('Homework', 'Read course-literature Chapter 1-5', 'pending', 5),
('Prepare presentation', 'Slides for web development course', 'in-progress', 4),
('Study SQL', 'Practice joins and foreign keys', 'done', 2);

SHOW TABLES;
SELECT * FROM users;
SELECT * FROM tasks;