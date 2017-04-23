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
	activity_payload TEXT,
	image_url TEXT,
	descr TEXT,
	Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
	-- when DATETIME DEFAULT CURRENT_TIMESTAMP

	-- activity_date DATE 

);

-- activity_type_id - something for future proofing your app; if you wanted to display more than just posts (ie: likes, checkins).
-- activity_id :
-- 1 = post
-- 2 = follow
-- 3 = like
-- 4 = comment



INSERT into user (first_name, last_name, email, password) VALUES ('emily', 'fox', 'emily@nycda.com', 'testing1234');
INSERT into user (first_name, last_name, email, password) VALUES ('linda', 'yu', 'linda@nycda.com', 'chicken');
INSERT into user (first_name, last_name, email, password) VALUES ('mario', 'rangel', 'mario@nycda.com', 'mario5678');
INSERT into user (first_name, last_name, email, password) VALUES ('taq', 'karim', 'taq@nycda.com', 'taqrules');
INSERT into user (first_name, last_name, email, password) VALUES ('baba', 'k', 'baba@nycda.com', 'ilovedrake');

INSERT into followers (id, follow_id) VALUES (1, 1);
INSERT into followers (id, follow_id) VALUES (2, 1);
INSERT into followers (id, follow_id) VALUES (3, 1);
INSERT into followers (id, follow_id) VALUES (4, 2); 
INSERT into followers (id, follow_id) VALUES (5, 2);

INSERT into activity (id, activity_id) VALUES (1, 3);
INSERT into activity (id, activity_id, image_url, descr) VALUES (2, 1, 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-13.jpg', 'smart dog');
INSERT into activity (id, activity_id, image_url, descr) VALUES (2, 1, 'http://furfeatherworks.com/wp-content/uploads/beagle-puppy2.jpg', 'beagle!');
INSERT into activity (id, activity_id) VALUES (3, 6);
INSERT into activity (id, activity_id) VALUES (4, 7);
INSERT into activity (id, activity_id) VALUES (5, 8);


-- DOWN

DROP TABLE user;
DROP TABLE followers;	
DROP TABLE activity;