-- UP

CREATE TABLE user(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
	profile_pic TEXT
);

CREATE TABLE followers(
	id INTEGER NOT NULL,
	follow_id INTEGER NOT NULL
);

CREATE TABLE activity(
	id INTEGER NOT NULL,
	activity_id INTEGER NOT NULL,
	activity_payload TEXT
);

-- activity_type_id - something for future proofing your app; if you wanted to display more than just posts (ie: likes, checkins).


INSERT into user (first_name, last_name, email, password) VALUES ('emily', 'fox', 'emily@nycda.com', 'testing1234');
INSERT into user (first_name, last_name, email, password) VALUES ('linda', 'yu', 'linda@nycda.com', 'chickenricer');
INSERT into user (first_name, last_name, email, password) VALUES ('mario', 'rangel', 'mario@nycda.com', 'mario5678');
INSERT into user (first_name, last_name, email, password) VALUES ('taq', 'karim', 'taq@nycda.com', 'taqrules');
INSERT into user (first_name, last_name, email, password) VALUES ('baba', 'k', 'baba@nycda.com', 'ilovedrake');

INSERT into followers (id, follow_id) VALUES (1, 1);
INSERT into followers (id, follow_id) VALUES (2, 1);
INSERT into followers (id, follow_id) VALUES (3, 1);
INSERT into followers (id, follow_id) VALUES (4, 2); 
INSERT into followers (id, follow_id) VALUES (5, 2);

INSERT into activity (id, activity_id) VALUES (1, 3);
INSERT into activity (id, activity_id) VALUES (2, 4);
INSERT into activity (id, activity_id) VALUES (3, 6);
INSERT into activity (id, activity_id) VALUES (4, 7);
INSERT into activity (id, activity_id) VALUES (5, 8);

-- DOWN

DROP TABLE user;
DROP TABLE followers;	
DROP TABLE activity;