-- UP

CREATE TABLE users(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
	profile_pic TEXT
);

CREATE TABLE followers(
	id INTEGER NOT NULL,
	followed_id INTEGER NOT NULL
);

CREATE TABLE posts(
	post_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	activity_id INTEGER NOT NULL,
	image_url TEXT,
	descr CHAR(150),
	timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- activity_id examples :
-- 1 = post
-- 2 = like
-- 3 = comment

INSERT into users (first_name, last_name, email, password, profile_pic) VALUES ('Emily', 'fox', 'emily@nycda.com', 'testing1234', 'https://s-media-cache-ak0.pinimg.com/736x/c9/02/f7/c902f783dcf11e4f376e884694710d2c.jpg');
INSERT into users (first_name, last_name, email, password, profile_pic) VALUES ('Linda', 'yu', 'linda@nycda.com', 'chicken', '../assets/domo.png');
INSERT into users (first_name, last_name, email, password, profile_pic) VALUES ('Taq', 'karim', 'taq@nycda.com', 'taqrules', 'https://static.pexels.com/photos/60224/pexels-photo-60224.jpeg');
INSERT into users (first_name, last_name, email, password, profile_pic) VALUES ('Baba', 'k', 'baba@nycda.com', 'ilovedrake', 'http://www.celebrity-cell.com/wp-content/uploads/2017/01/drake1.jpg');

INSERT into followers (id, followed_id) VALUES (1, 2);
INSERT into followers (id, followed_id) VALUES (1, 3);
INSERT into followers (id, followed_id) VALUES (2, 1);
INSERT into followers (id, followed_id) VALUES (2, 3);
INSERT into followers (id, followed_id) VALUES (3, 4);
INSERT into followers (id, followed_id) VALUES (4, 1);
INSERT into followers (id, followed_id) VALUES (4, 2);
INSERT into followers (id, followed_id) VALUES (4, 3); 

INSERT into posts (user_id, activity_id, image_url, descr) VALUES (1, 1, 'https://static.pexels.com/photos/54632/cat-animal-eyes-grey-54632.jpeg', 'creepy');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (1, 1, 'https://s-media-cache-ak0.pinimg.com/originals/a3/7e/d9/a37ed90d56f4e52988991b220d6f00e3.jpg', 'bawwwwww');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (1, 1, 'http://www.spatch.net/cattown/cat-businessman.jpg', 'he is all business');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (1, 1, 'http://www.visitstpeteclearwater.com/sites/default/master/files/styles/social-share/public/hero/TESTER_IndianRocksBeach.jpg','miss the beach already');

INSERT into posts (user_id, activity_id, image_url, descr) VALUES (2, 1, 'http://farm3.static.flickr.com/2011/2687425287_257897de48.jpg','chicken over rice!');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (2, 1, 'http://animalsadda.com/wp-content/uploads/2015/03/Grumpy-Cat-5.jpg', 'among the finest felines');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (2, 1, 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-13.jpg', 'smart dog');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (2, 1, 'http://furfeatherworks.com/wp-content/uploads/beagle-puppy2.jpg', 'beagle!');

INSERT into posts (user_id, activity_id, image_url, descr) VALUES (3, 1, 'https://s-media-cache-ak0.pinimg.com/736x/0f/c5/51/0fc551b9cb751c9d4e3d3a60ec6440ca.jpg', 'quite pleased with herself');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (3, 1, 'https://media-cdn.tripadvisor.com/media/photo-s/08/86/3a/97/big-daddy-burger.jpg','was feeling hungry i guess');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (3, 1, 'https://i.ytimg.com/vi/cNycdfFEgBc/maxresdefault.jpg', 'ZOMG! LOLZ');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (3, 1, 'http://i.telegraph.co.uk/multimedia/archive/03398/cats-hipster_3398615k.jpg', 'Even better');

INSERT into posts (user_id, activity_id, image_url, descr) VALUES (4, 1, 'http://www.mytotalretail.com/wp-content/uploads/sites/14/2017/03/Godiva-image.jpg', 'why i am so fat');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (4, 1, 'http://www.celebrity-cell.com/wp-content/uploads/2017/01/drake1.jpg', 'even better than chocolate');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (4, 1, 'https://s3-media2.fl.yelpcdn.com/bphoto/yyYWEjOkJS0t1i-05t6Gsg/348s.jpg', 'just kidding');
INSERT into posts (user_id, activity_id, image_url, descr) VALUES (4, 1, 'https://st.hzcdn.com/fimgs/9f819436007c2d1b_2183-w500-h400-b0-p0--traditional-home-gym.jpg','been eating too much chocolate. time to repent');

-- DOWN

DROP TABLE users;
DROP TABLE followers;	
DROP TABLE posts;



