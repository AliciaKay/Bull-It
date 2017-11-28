CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) UNIQUE,
    password VARCHAR(200),
	);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	priority INTEGER,
	due DATE,
	pomos INTEGER,
	completedpomos INTEGER DEFAULT 0,
	completed BOOLEAN DEFAULT false,
	user_id INT NOT NULL
	);
	
CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	date DATE,
	time TIME,
	location VARCHAR(255),
	user_id INT NOT NULL
	);
	
CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	date DATE DEFAULT CURRENT_TIMESTAMP,
	user_id INT NOT NULL
	);

ALTER TABLE tasks
    ADD CONSTRAINT user_fk
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE;

ALTER TABLE events
    ADD CONSTRAINT user_fk
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE;

ALTER TABLE notes
    ADD CONSTRAINT user_fk
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE;		
	
INSERT INTO users
VALUES (1, 'alicia.kaye1@gmail.com', '$2a$10$8eXkBQUGwQo8CFt4LgYRQ.4nHFnpR96xaVHHyBKj6GtGSKDU/QOjO');

INSERT INTO tasks
VALUES (1, 'Build Database', 'Three separate tables, see notebook for details', 1, DATE '2017-12-24', 4, 0, false, 1);

INSERT INTO events
VALUES (1, 'Canopus Potluck', 'Make salami-wrapped tomatoes', DATE '2017-12-19', TIME '17:30:00', 'Prime Digital Academy, 301 South 4th Street Minneapolis MN 55415', 1);

INSERT INTO notes
VALUES (1, 'App Scope Updated Today', 'Millie pointed out that there was no need to create join tables between the three item categories if the MVP of the app does not include a search function', DATE '2017-12-16', 1);
