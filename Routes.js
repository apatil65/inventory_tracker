module.exports = function(app){
    var Fb = require('./controller/controller');
    app.get('/import_data', Fb.import); //imports dummy data for testing
    app.get('/food_and_bev', Fb.findAll);
    app.get('/food_and_bev/sold', Fb.find);
    app.post('/food_and_bev/add', Fb.add);
    app.put('/update/:type/:item', Fb.update);
    app.delete('/food_and_bev/delete/:id', Fb.delete);
}
