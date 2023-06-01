import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';

dotenv.config();

// Import routes
import userroute from './routes/api/userroute.js';

var app = express();

// Add body parser middleware to handle JSON data
app.use(bodyParser.json());

var db = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@127.0.0.1:27017/ourKitchen?authSource=${process.env.DB_AUTHSOURCE}`;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('MongoDB connected successfully');
    })
    .catch(function(err) {
        console.log(err);
    });


var port = process.env.PORT || 5000;

app.use("/api/users", userroute);

// Route for HOME
app.get('/', function(req, res) {
    res.json({reply:'Route for HOME path'});
});

// Route for Error 404
app.get('*' , function(req, res) {
    res.send('Error 404: Page not found');
});

// Start server
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});