var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/hotel', { useMongoClient: true });
var mongoSchema =   mongoose.Schema;
var today = new Date();
var current_date = today.toISOString().substring(0, 10);

//schema
var Schema = new mongoSchema({
  "type": String,
  "item": String,
  "sold_date": {
    type: String
  },
  "city_sold": String,
  "total_sold": Number
});

mongoose.model('food_and_bev', Schema);
