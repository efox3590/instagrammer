const express = require('express');
const db = require('sqlite');

let app = express();
const port = 4001;

const parser = require('body-parser');
app.use(parser.json())

const DB_NAME = './database.sqlite';

// this is sqliteui stuff
const socket = require('./sqliteui/websocket');
app.use('/', express.static('./sqliteui/public', {
    'index': ['index.html']
}));
const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;
// end sqliteui stuff

app.get('/users', (req, res, next) => {
    db.all('SELECT * FROM user')
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

app.use((req, res, next) => {
    let args = {};
    for (const prop in req.body) {
        console.log(prop, req.body[prop]);
        args['$' + prop] = req.body[prop];
    }
    req.body = args;
    next();
})

app.post('/user', (req, res, next) => {
    db.all('SELECT * FROM user')
        .then(() => {
            return db.run("INSERT INTO user (first_name, last_name, email, password) values ($first_name, $last_name, $email, $password)", req.body)
        })
        .then((user) => {

            // *SUPER IMPORTANT* always broadcast to update the UI
            SocketInst.broadcast('LOAD_BUFFER');
            // END 

            return db.get('SELECT * FROM user WHERE user.id = ?', [user.lastID])
        })
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ user: data });
        })
        .catch((e) => {
            console.log(e);
            res.status(401);
        });
});

// app.post('/activity', (req, res, next) => {
//     db.all('SELECT * FROM activity')
//         .then(() => {
//             return db.run("INSERT INTO activity (id, activity_id) values ($id, $activity_id)", req.body)
//         })
//         .then((user) => {

//             // *SUPER IMPORTANT* always broadcast to update the UI
//             SocketInst.broadcast('LOAD_BUFFER');
//             // END 

//             return db.get('SELECT * FROM activity WHERE activity.id = ?', [activity.lastID])
//         })
//         .then((data) => {
//             res.header('Content-Type', 'application/json');
//             res.send({ activity: data });
//         })
//         .catch((e) => {
//             console.log(e);
//             res.status(401);
//         });
// });

app.get('/followers/:followers_id/users', (req, res) => {
    const {followers_id} = req.params;
   
    db.all(`
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE d.follow_id = ${followers_id}
    `).then((data) => {
        res.header('Content-Type', 'application/json');
        res.send({
            users: data,
            numResults: data.length
        });
    })
    
});

app.get('/user/:user_id/follower', (req, res) => {
    const {user_id} = req.params;
    db.all(`
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE e.id = ${user_id}
    `).then((data) => {
        res.header('Content-Type', 'application/json');
        res.send({
            users: data,
            numResults: data.length
        });
    })
    
});

app.get('/activity/:activity_id/activities', (req, res) => {
    const {activity_id} = req.params;
    db.all(`
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE ed.activity_id = ${activity_id}
    `).then((data) => {
        res.header('Content-Type', 'application/json');
        res.send({
            users: data,
            numResults: data.length
        });
    })
    
});

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    // .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`Server started on port ${port}`)
     })
    .catch(err => console.error(err.stack))