CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	priority INTEGER,
	due DATE,
	pomos INTEGER
	);
	
CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	date DATE,
	time TIME,
	location VARCHAR(255)
	);
	
CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	details VARCHAR(1000),
	date DATE DEFAULT CURRENT_TIMESTAMP
	);
	
INSERT INTO tasks
VALUES (1, 'Build Database', 'Three separate tables, see notebook for details', 1, DATE '2017-10-16', 4);

INSERT INTO events
VALUES (1, 'Canopus Potluck', 'Make salami-wrapped tomatoes', DATE '2017-10-19', TIME '17:30:00', 'Prime Digital Academy, 301 South 4th Street Minneapolis MN 55415');

INSERT INTO notes
VALUES (1, 'App Scope Updated Today', 'Millie pointed out that there was no need to create join tables between the three item categories if the MVP of the app does not include a search function', DATE '2017-10-16');
