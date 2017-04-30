// const db = require('sqlite');
// const DB_NAME = './database.sqlite';

const instaApp = {};

instaApp.init = function (db) {
    instaApp.db = db;
}

// Get all Users. See who is registered
instaApp.getAllUsers = () => {
    return instaApp.db.all(`SELECT * FROM users`)
};


// Get all Users with post activity
instaApp.getUsers = () => {
    return instaApp.db.all(`SELECT users.id AS id,
                                   users.first_name AS firstName,
                                   users.last_name AS lastName,
                                   users.profile_pic AS profilePic,
                                   posts.post_id, 
                                   posts.image_url AS image,
                                   posts.descr AS description,
                                   posts.timestamp
                            FROM users 
                            INNER JOIN posts ON posts.user_id = users.id 
                            ORDER BY id ASC`)
};

// Get a specific User by ID with post activity
instaApp.getUser = (user_id) => {
    return instaApp.db.all(`SELECT users.first_name AS firstName,
                                   users.last_name AS lastName,
                                   users.profile_pic AS profile_pic,
                                   posts.post_id, 
                                   posts.image_url AS image,
                                   posts.descr AS description,
                                   posts.timestamp
                            FROM users 
                            INNER JOIN posts ON posts.user_id = users.id
                            WHERE users.id = ${user_id}
                            ORDER BY posts.Timestamp DESC`)
};

// Get a specified post via post.post_id
instaApp.getPost = (post_id) => {
    return instaApp.db.all(`SELECT users.first_name AS firstName,
                                   users.last_name AS lastName,
                                   posts.post_id, 
                                   posts.image_url AS image,
                                   posts.descr AS description,
                                   posts.timestamp
                            FROM posts
                            INNER JOIN users ON posts.user_id = users.id
                            WHERE posts.post_id = ${post_id}`)
                                
};


// Get Users being followed. Generates Follow Feed
instaApp.getFollowed = (user_id) => {
    return instaApp.db.all(`SELECT users.first_name AS user_fname,
                                   users.last_name AS user_lname,
                                   users.profile_pic AS profile_pic,
                                   followers.follow_id,
                                   posts.post_id, 
                                   posts.image_url AS image,
                                   posts.descr AS description,
                                   posts.timestamp
                            FROM users
                            INNER JOIN followers ON followers.follow_id = users.id 
                            INNER JOIN posts ON posts.user_id = users.id
                            WHERE followers.id = ${user_id}
                            ORDER BY posts.timestamp DESC`)
};

// Create a New User
instaApp.createUser = (first_name, last_name, email, password) => {
    return instaApp.db.run(`INSERT INTO users (first_name, last_name, email, password, profile_pic) VALUES (?,?,?,?,?)`, [first_name, last_name, email, password, 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png'])
};

// Create a Post
instaApp.createPost = (user_id, req) => {
    return instaApp.db.run(`INSERT INTO posts (user_id, activity_id, image_url, descr) values (?,?,?,?)`, [user_id, 1, req.image_url, req.descr])
};

// Follow a User
instaApp.followUser = (user_id, followed_id) => {
    return instaApp.db.run(`INSERT INTO followers (id, follow_id) VALUES (${user_id}, ${followed_id})`)
};

// Edit a Post. Edit caption only
instaApp.updatePost = (user_id, post_id, newCaption) => {
    return instaApp.db.run(`UPDATE posts SET descr = "${newCaption}" WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Delete a Post
instaApp.deletePost = (user_id, post_id) => {
    return instaApp.db.run(`DELETE FROM posts WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Unfollow a User
instaApp.unfollowUser = (user_id, followed_id) => {
    return instaApp.db.run(`DELETE FROM followers WHERE id = ${user_id} AND follow_id = ${followed_id}`)
};

module.exports = instaApp;


