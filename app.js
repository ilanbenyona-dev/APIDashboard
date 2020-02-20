const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// enviroment variables 
const dotenv = require("dotenv") 
dotenv.config()

console.log(process.env.mongodb_address);
mongoose.connect(process.env.mongodb_address, {useNewUrlParser: true});

mongoose.connection.on('connected', function(){
    console.log('connected');
});

const app = express();

// Routes
const users = require('./routes/projectManager');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes 
app.use('/users', users);




// Catching 404 Errors and forward the to error handler 
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error handler function 
app.use((err, req, res, next) =>{
    const error = app.get('env') == 'development' ? err : {};
    const status = err.status || 500/* server error */;

    // Respond to client 
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to terminal
    console.error(err); 
})


// Start the server 
const port = app.get('port') || 3000;
app.listen(port, () => console.log('Server is listening on port ', port));