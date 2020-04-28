CREATE EXTENSION CITEXT;

CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
	email CITEXT NOT NULL,
	password VARCHAR (64) NOT NULL
);

--

CREATE TABLE IF NOT EXISTS gear (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	name VARCHAR NOT NULL,
	type VARCHAR NOT NULL,
	img_link VARCHAR,
	notes VARCHAR
);

--

CREATE TABLE IF NOT EXISTS pedalboards (
	id serial PRIMARY KEY,
	name VARCHAR NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

--

CREATE TABLE IF NOT EXISTS lists (
	id serial PRIMARY KEY,
	name VARCHAR NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

--

CREATE TABLE IF NOT EXISTS pedalboards_gear (
	id serial PRIMARY KEY,
	pedalboard_id INTEGER REFERENCES pedalboards(id) ON DELETE CASCADE,
	gear_id INTEGER REFERENCES gear(id) ON DELETE CASCADE,
	gear_order INTEGER
);

--

CREATE TABLE IF NOT EXISTS lists_pedalboards (
	id serial PRIMARY KEY,
	list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
	pedalboard_id INTEGER REFERENCES pedalboards(id) ON DELETE CASCADE
);