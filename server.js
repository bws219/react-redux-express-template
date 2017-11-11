const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./backend/routes');
const { User, Post, Comment, Vote } = require('./models');
const auth = require('./backend/auth');
const passport = require('passport');

var cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
var session = require('express-session');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(session({
    secret: 'hackerz beware!',
    cookie: {
        secure: false,
        httpOnly: false
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            console.log(user);
            done(null, user);
        })
        .catch((err) => {
            console.log(err);
            done(err, null);
        })
});


passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({
        where: {
            username
        }
    })
        .then((user) => {
            if (!user) {
                console.log('Username incorrect!');
                return done(null, false)
            }
            if (user.password !== password) {
                console.log('Wrong password');
                return done(null, false)
            }
            // console.log(user);
            return done(null, user);
        })
        .catch((err) => {
            console.log(err);
            done(err, null);
        })
}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
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
