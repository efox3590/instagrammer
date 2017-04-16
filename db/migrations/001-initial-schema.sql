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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	follow_id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE activity(
	user_id INTEGER NOT NULL,
	activity_id INTEGER NOT NULL,
	activity_payload TEXT
);

-- activity_type_id - something for future proofing your app; if you wanted to display more than just posts (ie: likes, checkins).


INSERT into user (first_name, last_name, email, password) VALUES ('emily', 'fox', 'emily@nycda.com', 'testing1234');
INSERT into user (first_name, last_name, email, password) VALUES ('linda', 'yu', 'linda@nycda.com', 'chickenricer');
INSERT into user (first_name, last_name, email, password) VALUES ('mario', 'rangel', 'mario@nycda.com', 'mario5678');
INSERT into user (first_name, last_name, email, password) VALUES ('taq', 'karim', 'taq@nycda.com', 'taqrules');
INSERT into user (first_name, last_name, email, password) VALUES ('baba', 'k', 'baba@nycda.com', 'ilovedrake');

INSERT into followers (user_id, follow_id) VALUES (1, 1);
INSERT into followers (user_id, follow_id) VALUES (2, 1);
INSERT into followers (user_id, follow_id) VALUES (3, 1);
INSERT into followers (user_id, follow_id) VALUES (3, 2); 
INSERT into followers (user_id, follow_id) VALUES (4, 2);

INSERT into activity (activity_payload) VALUES ('like');
INSERT into activity (activity_payload) VALUES ('checkin');
INSERT into activity (activity_payload) VALUES ('comment');

-- DOWN

DROP TABLE user;
DROP TABLE followers;	
DROP TABLE activity;