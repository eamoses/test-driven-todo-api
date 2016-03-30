// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1,
    task: 'Laundry',
    description: 'Wash clothes'
  },
  { _id: 2,
    task: 'Grocery Shopping',
    description: 'Buy dinner for this week'
  },
  { _id: 3,
    task: 'Homework',
    description: 'Make this app super awesome!'
  }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

//this function does
app.get('/api/todos/search', function search(req, res) {
  var searchTodo = req.query.q;
  var matchedTodos = [];
  todos.forEach(function compareVal(todo){
    if(searchTodo === todo.task){
      matchedTodos.push(todo);
    }
  });
  res.send({todos: matchedTodos});
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var id = todos.length + 1;
  var task = req.body.task;
  var desc = req.body.description;
  var newTask = {_id : id, task : task, description : desc};
  todos.push(newTask);
  res.json(newTask);
});

app.get('/api/todos/:id', function show(req, res) {
  var todoId = parseInt(req.params.id);
  var foundTodo = todos.filter(function (todo){
    return todo._id == todoId;
  })[0];
  res.json(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  var todoId = parseInt(req.params.id);
  var todoToUpdate = todos.filter(function (todo){
    return todo._id == todoId;
  })[0];
  todoToUpdate.task = req.body.task;
  todoToUpdate.description = req.body.description;
  res.json(todoToUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var todoId = parseInt(req.params.id); //getting the id number
  var todoToDelete = todos.filter(function(todo){ //find todo to delete bt its id
    return todo._id == todoId;
  })[0];
  todos.splice(todos.indexOf(todoToDelete), 1); //remove todo from todos array
  res.json(todoToDelete);
  res.status(200).send({});
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
