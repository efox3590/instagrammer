-- UP

CREATE TABLE Users(
	id INTEGER PRIMARY KEY NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
);

CREATE TABLE Follows(
	user_id INTEGER,
	follow_id INTEGER
);

-- this might need some tweaking
CREATE TABLE Activity(
	user_id INTEGER NOT NULL,
	activity_id INTEGER NOT NULL,
	activity_payload TEXT NOT NULL
);

-- DOWN

DROP TABLE Users;
DROP TABLE Follows;	
DROP TABLE Activity;