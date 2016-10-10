CREATE TABLE users(id SERIAL PRIMARY KEY, uname VARCHAR(40) UNIQUE NOT NULL, password VARCHAR(60) NOT NULL, created_at DATE NOT NULL, updated_at DATE NOT NULL)

CREATE TABLE notes (id SERIAL PRIMARY KEY, title VARCHAR(255) not null, content TEXT, version BIGINT, created_at DATE NOT NULL, updated_at DATE NOT NULL)
