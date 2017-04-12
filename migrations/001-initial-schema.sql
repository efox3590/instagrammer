-- UP

CREATE TABLE Users(
	id INTEGER PRIMARY KEY NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
);



-- DOWN

DROP TABLE Users;