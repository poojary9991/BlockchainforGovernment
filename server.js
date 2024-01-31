const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const cookieParser = require('cookie-parser');


// Database Connection
const url = 'mongodb://localhost/blockProject';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection ;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('Database connected...');
});

app.use(express.static('public'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// cookieParser middleware
app.use(cookieParser());

// set Template engine
app.set('views', path.join(__dirname, '/app/resources/views'))
app.set('view engine', 'ejs')

// use res.render to load up an ejs view file

app.use((req, res, next) => {
    if(req.path === '/'){
        next();
    } else {
        if(!req.cookies.auth){
            res.render('loginAlert')
        } else {
            req.headers.auth = req.cookies.auth;
            next();
        }  
    }
});

// index page
app.get('/', function(req, res) {
  res.render('home', { userSeen: null});
});


app.use('/', require('./app/routes/web.js'));

app.listen(8000, () => {
    console.log('Listening on port 8000')
})