const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const ejslint = require('ejs-lint');

// settings
app.set('port', process.env.PORT ||5000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));


//static
app.use(express.static(path.join(__dirname,'public')));


// 404 handler
app.use((req, res,next)=>{
    res.status(404).send('404 Not Found');
});

module.exports = app;