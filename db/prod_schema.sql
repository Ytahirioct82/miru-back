DROP DATABASE IF EXISTS daj9o01rd5cr2k;

CREATE DATABASE daj9o01rd5cr2k;

\c daj9o01rd5cr2k;

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code INT NOT NULL,
    category TEXT NOT NULL);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT,
    comment TEXT,
    name TEXT
    
    
    -- FOREIGN KEY (activity_id) REFERENCES activity(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT Null 
);

CREATE TABLE favorites (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	activity_id INT NOT NULL,
	UNIQUE (user_id, activity_id),
	FOREIGN KEY (activity_id) REFERENCES activity(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    content VARCHAR,
    fileName TEXT,
    contentType TEXT,
    activity_id INT,
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);