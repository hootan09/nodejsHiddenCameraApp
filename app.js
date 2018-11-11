const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    logger = require('morgan'),
    cors = require('cors'),
    config = require('./config/config.json'),
    ejs = require('ejs');
cookieParser = require('cookie-parser');
expressValidator = require('express-validator');
flash = require('connect-flash');
session = require('express-session');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
utils = require('./utils/utils');


app.put('/upload', (req, res) => {
    if (req.headers['content-encoding'] === 'gzip') {

            const filename = req.headers.filename;
            console.log('File request received: ' + filename);
            utils.checkFileType(filename, (err, success) => {

                if (err) {
                    console.log('err in file check!!', err);
                    res.status(400).send(err);
                    return
                }
                if (success) {
                    
                    let image;
                    req.pipe(crypto.createDecipher('aes192', config.secret))
                    .pipe(zlib.createGunzip())
                    .pipe( fs.createWriteStream('public/upload/' + filename))
                    .on('finish', () => {

                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('That\'s it\n');
                            console.log(`File saved: ${filename}`);
                    });
            }
        })
    }
    else {res.status(400).send('this is not a gzip headers request');}
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cookieParser());
// if (process.env.NODE_ENV === 'development') {
app.use(logger('dev'));
// }

// EJS
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// Express Session
app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


let Web = require('./routes/web');
app.use('/', Web);


app.listen(port, function (err) {
    console.log('listening in http://localhost:' + port);
});