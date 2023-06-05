import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import routes
import userroute from './routes/api/userroute.js';
import reciperoute from './routes/api/reciperoute.js';
import pantryroute from './routes/api/pantryroute.js';
import listroute from './routes/api/listroute.js';

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
app.use("/api/recipes", reciperoute);
app.use("/api/pantries", pantryroute);
app.use("/api/lists", listroute);

// Route for HOME
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for Error 404
app.all('*' , function(req, res) {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({message: '404 Not found'});
    }
    else{
        res.type('txt').send('404 Not found');
    }
});

// Start server
app.listen(port, function() {
    console.log('Server running on port ' + port);
});