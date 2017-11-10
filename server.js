const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./backend/routes');
const { User, Post, Comment, Vote } = require('./models');
const auth = require('./backend/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findAll({
        where: {
            id
        }
    })
        .then((result) => {
            console.log(result);
            done(null, result[0].dataValues);
        })
        .catch((err) => {
            console.log(err);
            done(err, null);
        })
});


passport.use(new LocalStrategy(function (username, password, done) {
    User.findAll({
        where: {
            username
        }
    })
        .then((result) => {
            if (!result.length) {
                console.log('Username incorrect!');
                return done(null, false)
            }
            if (result[0].dataValues.password !== password) {
                console.log('Wrong password');
                return done(null, false)
            }
            return done(null, result[0].dataValues);
        })
        .catch((err) => {
            console.log(err);
            done(err, null);
        })
}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', auth(passport));
app.use('/', routes);

app.listen(PORT, error => {
    error
        ? console.error(error)
        : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
