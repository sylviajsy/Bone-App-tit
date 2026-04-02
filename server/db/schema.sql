DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS places CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude NUMERIC(9,6) NOT NULL,
    longitude NUMERIC(9,6) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50),
    content TEXT NOT NULL,
    pet_friendly_rating INTEGER CHECK (pet_friendly_rating >= 1 AND pet_friendly_rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);