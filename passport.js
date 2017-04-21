module.exports = function(app, db) {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        console.log('serializing user', user)
        done(null, user.id)
    });

    passport.deserializeUser((user, done) => {
        done(null, user)
        // db.all('SELECT id, username FROM users WHERE id = ?', id, function (err, row) {
        // if (!row) return done(null, false);
        // done(null, user)
        // });
        // User.findById(user.id, function (err, user) {
        //     done(err, user);
        // });
    });

    //at least checks the db for combo, returns username & id
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        console.log(email, password)
        if (!email || !password) {
            return done('error', {}, {});
        }

        // db.all(`SELECT users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`,function(err,rows){
        //     if (err)
        //         return done(err);
        //         if (!rows.length) {
        //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        //         } 

        //         if (!( rows[0].password == password))
        //         return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

        //         // all is well, return successful user
        //         return done(null, rows[0]);             
        //     });

        db.get(`SELECT user.first_name, user.email, user.id FROM user WHERE user.email = '${email}' AND user.password = '${password}'`)
            .then((row) => {
                console.log(row)
                if (!row || row.length === 0) return done(true, false);
                return done(null, row);
            })
    }));
    app.use(passport.initialize());
    app.use(passport.session());  

    app.post('/auth/login', (request, response, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log('about to authenticate')
            console.log(err, user, info)
            if (err || !user) {
                console.log(err);
               next()
            }
            
            request.logIn(user, (err) => {
                console.log('now in req login', err)
                if (err) return next(err);
                response.header('Content-Type', 'application/json');
                response.send({
                    success: true,
                });
            });
        })(request, response, next);
    });

    app.use((request, response, next) => {
        console.log('in middleware')
        console.log(request.user)
        console.log(request.session)
        console.log(request.isAuthenticated());

        if (request.isAuthenticated()) {
            next();
            return;
        }

        response.header('Content-Type', 'application/json');
        response.status(403);
        response.send({
            success: false,
        })
    })

    return passport;
}