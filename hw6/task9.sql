CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
INSERT INTO users (username, email, first_name, last_name, password)
VALUES ('user1', 'email1@example.com', 'Artem', 'Marchenko', 'password1'),
('user2', 'email2@example.com', 'Vasyl', 'Symonenko', 'password2'),
('user3', 'email3@example.com', 'Petro', 'Shevchenko', 'password3')
RETURNING *;
