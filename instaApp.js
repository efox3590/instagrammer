const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaApp = {};

// Get all users + their activity
instaApp.getUsers = () => {
    return db.all(`SELECT * FROM user
                    INNER JOIN activity ON activity.user_id = user.id`)
};

// Get a specified user via user.id + their activity
instaApp.getUser = (user_id) => {
    return db.all(`SELECT * FROM user 
            INNER JOIN activity ON activity.user_id = user.id
            WHERE user.id = ${user_id}`)
};

// Get users that $user_id follows
instaApp.getFollowed = (user_id) => {
    return db.all(`SELECT 
                user.first_name AS user_fname,
                user.last_name AS user_lname,
                activity.image_url AS image,
                activity.descr AS description
            FROM user
                INNER JOIN followers ON followers.follow_id = user.id 
                INNER JOIN activity ON activity.user_id = user.id
            WHERE follower.user_id = ${user_id}`)
};

// Create a post
instaApp.createPost = (user_id, req) => {
    return db.run(`INSERT INTO activity (user_id, image_url, descr) values (${user_id}, $image_url, $descr)`, req)
};

// Follow a user
instaApp.followUser = (user_id, followed_id) => {
    return db.run(`INSERT INTO followers (user_id, follow_id) VALUES (${user_id}, ${follow_id})`)
};

// Edit a post
instaApp.updatePost = (post_id, updatedText) => {
    return db.run(`UPDATE activity SET descr = ${updatedText} WHERE ID = ${post_id}`)
};

// Delete a post
instaApp.deletePost = (post_id) => {
    return db.run(`DELETE FROM activity WHERE ID = ${post_id}`)
};

// Unfollow a user
instaApp.unfollow = (user_id, followed_id) => {
    return db.run(`DELETE FROM follower WHERE user_id = ${user_id} AND follow_id = ${follow_id}`)
};

module.exports = instaApp