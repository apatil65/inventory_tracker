var express = require('express');
var bodyParser = require('body-parser');
mongoose = require('mongoose'),
mongoose.connect('mongodb://localhost/hotel', { useMongoClient: true });

//check DB connection
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database');
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models/food_and_bev');
require('./Routes')(app);
app.listen(3001);
console.log('Listening on port 3001...');
