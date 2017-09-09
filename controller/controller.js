var mongoose = require('mongoose');
var mongoSchema =   mongoose.Schema;
Fb_model = mongoose.model('food_and_bev');
//var Fb = require('../models/food_and_bev');

//list all inventory OR Pagination
exports.findAll = function(req, res){
  if(req.query.size){ //for pagination
    var page = parseInt(req.query.page),
    size = parseInt(req.query.size),
    skip = page > 0 ? ((page - 1) * size) : 0;
    var condition = get_pagination_condition(req.query);
    Fb_model.find(condition, null, {
         skip: skip,
         limit: size,
      }, function (err, data) {
         if(err) { res.json(500, err); }
         else {
            res.json({
               data: data
            });
         }
      });
  }else{
    Fb_model.find({},function(err, results) {
      if (err) {res.json({"error": err});};
      return res.send(results);
    });
  }
};

//add inventory
exports.add = function(req, res) {
  console.log(req.body);
  Fb_model.create(req.body, function (err, added) {
    if (err) {res.json({"error": err});};
    return res.send(added);
  });
}


exports.find = function(req, res){
  console.log(req.query);
  var condition = {};
  condition["sold_date"] = req.query.date;
  var tmp_result = {"total_items_sold": 0, "date": req.query.date};
  if(req.query.findType == "byDateCity") {
     condition["city_sold"] = req.query.city;
     tmp_result["city"] = req.query.city;
  }else if (req.query.findType == "byTypeDate") {
    condition["type"] = req.query.type;
    tmp_result["type"] = req.query.type;
  }if(req.query.findType == "byItemDate"){
    condition["item"] = req.query.item;
    tmp_result["item"] = req.query.item;
  }

  Fb_model.find(condition,function(err, results) {
    if (err) {res.json({"error": err});};
    for(var key in results){
      tmp_result["total_items_sold"] += results[key]["total_sold"];
      console.log(results[key]);
    }
    if(req.query.findType == "byDateCity"){ return res.send(tmp_result); }
    results.unshift(tmp_result);
    return res.send(results);
  });
};

//update record
exports.update = function(req, res) {
  var type = req.params.type;
  var item = req.params.item;
  console.log(req.params);
  console.log(req.body);
  var updates = req.body;
  Fb_model.update({"type": type, "item": item}, req.body,
    function (err, numberAffected) {
      if (err) return console.log({"error": err, "condition": req.params});
      console.log('Updated %d records', numberAffected);
      res.send(202);
  });
}

//Delete record by ID
exports.delete = function(req, res){
  var id = req.params.id;
  console.log("deleting ID " + id);
  Fb_model.remove({'_id': id},function(result) {
    return res.send(result);
  });
};

//Data imports for testing
exports.import = function(req, res){
  Fb_model.create(
    {"type": "food", "item": "pani poori", "sold_date": "2017-08-10", "city_sold": "Mumbai", "total_sold": 10},
    {"type": "beverage", "item": "masala tea", "sold_date": "2017-08-10", "city_sold": "Blor", "total_sold": 20},
    {"type": "beverage", "item": "masala tea", "sold_date": "2017-08-10", "city_sold": "chennai", "total_sold": 15},
    {"type": "beverage", "item": "masala tea", "sold_date": "2017-08-10", "city_sold": "Hydrabad", "total_sold": 0},
    {"type": "beverage", "item": "cold coffee", "sold_date": "2017-08-10", "city_sold": "Blor", "total_sold": 11},
    {"type": "beverage", "item": "butter milk", "sold_date": "2017-08-10", "city_sold": "Blor", "total_sold": 50},
    {"type": "food", "item": "samosa", "sold_date": "2017-08-10", "city_sold": "Blor", "total_sold": 50},
    {"type": "food", "item": "dosa", "sold_date": "2017-08-10", "city_sold": "Blor", "total_sold": 100}
  , function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};

//Utility Functions (Good to keep in a saperate file)
function get_pagination_condition(filter) {
  var tmp_condition = {};
  if(filter.item){ tmp_condition["item"] = filter.item; }
  if(filter.item){ tmp_condition["city"] = filter.city; }
  return tmp_condition;
}
