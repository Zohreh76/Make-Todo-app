var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database https://mlab.com/databases/todo#users
mongoose.connect('mongodb://test:test@ds137435.mlab.com:37435/todo');

//create a schema - this is like a blueprint
//it is what mangodb is gana expect from out todo data:
var todoSchema = new mongoose.Schema({
    item: String
});

//(is a model name that is gana store collection on mongodb, what schema)
var Todo = mongoose.model('Todo', todoSchema);  
var itemOne = Todo({item: 'buy flowers'}).save(function (err) {
    if (err) throw err;
    console.log ('item saved');
});

//var data = [{item: 'get milk'}, {item: 'walk dog'},{item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){ // here we set up all our request handellers
   
    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it ti view
        Todo.find({},function(err, data){
            if(err) throw err;
            res.render('todo', { todos: data });
        });
        
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if(err) throw err;
            res.json(data);     
        })  
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });      
    });

}
 