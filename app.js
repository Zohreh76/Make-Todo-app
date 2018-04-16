var express = require('express');
var todocontroller = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todocontroller(app);

//listen to port
app.listen(process.env.PORT || 3000, ()=>{console.log('all ok')});
