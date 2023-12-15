-- Drop the database if it exists
DROP DATABASE IF EXISTS miru_db;

-- Create the database
CREATE DATABASE miru_db;

-- Connect to the database
\c miru_db;


-- Users table to store user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Activity table to store activity details
CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- Foreign key to link activity with the user who created it
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code INT NOT NULL,
    category_id INT NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Foreign key constraint
);


-- Comments table to store comments on activities
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- Foreign key to link comment with the user who made it
    activity_id INT NOT NULL, -- Foreign key to link comment with the activity it belongs to
    comment TEXT,
    name TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id), -- Foreign key constraints
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);


-- Favorites table to store user's favorite activities
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- Foreign key to link favorite with the user who favorited it
    activity_id INT NOT NULL, -- Foreign key to link favorite with the activity it belongs to
    UNIQUE (user_id, activity_id),
    FOREIGN KEY (user_id) REFERENCES users(id), -- Foreign key constraints
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);


-- Images table to store activity images
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    content VARCHAR, -- Image content, you might consider using BLOB or BYTEA data type for images
    fileName TEXT,
    contentType TEXT,
    activity_id INT NOT NULL, -- Foreign key to link image with the activity it belongs to
    FOREIGN KEY (activity_id) REFERENCES activity(id) -- Foreign key constraint
);

-- categories table to store categories for the drop down menu
CREATE TABLE cities (
    id INT NOT NULL,
    name TEXT NOT NULL UNIQUE
);

-- cities table to store cities for the drop down menu
CREATE TABLE categories (
    id INT NOT NULL,
    name TEXT NOT NULL UNIQUE
);



