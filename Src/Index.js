
// Global Variables
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');

// Initialization
const app = express();
require('./Database');

// Setting
app.set('port', process.env.Port || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
//app.engine('html', require('ejs').renderFile);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extends: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'Public/Img/Uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname)); 
    }
});
app.use(multer({storage}).single('image'));

// TimeAgo
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'Public')));

// Routes
app.use(require('./Routes/Index.routes.js'));

// Listening the server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${chalk.green(app.get('port'))}`);
});