CREATE EXTENSION CITEXT;

CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
	email CITEXT NOT NULL,
	password VARCHAR (64) NOT NULL,
	img_link VARCHAR
);