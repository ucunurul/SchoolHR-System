var exp = require("express");
var app = exp();

//Store all HTML files in view folder.
app.use(exp.static(__dirname + '/View'));
//Store all JS and CSS in Scripts folder.
app.use("/public",exp.static("public"));
//app.use(exp.static(__dirname + '/public'));


var path = require('path');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var db;
// init mongodb
var Mongoc = require("mongodb").MongoClient;
var mongourl = 'mongodb://localhost:27017/SchoolDB';
Mongoc.connect(mongourl, function(err, database){
    if(err){
        console.log("Mongo is not connected!");
    }
    else{
        console.log("Mongo is now connected...");
        database.collection("Employees");

        db = database;

        app.listen(8080, function(){
            console.log("Listening on localhost:8080");
        })
    }
})

// index navigation
app.get('/', function(req, res){

      res.sendFile(path.join(__dirname + '/index.html'));

    // res.json({
    //     name: 'ucu',
    //     age: 21
    // })
});

// student navigation
app.get('/student', function(req, res){

      res.sendFile(path.join(__dirname + '/View/student.html'));
});

// teacher navigation
app.get('/teacher', function(req, res){

      res.sendFile(path.join(__dirname + '/View/teacher.html'));
});

// subject navigation
app.get('/subject', function(req, res){

      res.sendFile(path.join(__dirname + '/View/subject.html'));
});

// staff navigation
app.get('/staff', function(req, res){

      res.sendFile(path.join(__dirname + '/View/staff.html'));
});

// salary navigation
app.get('/salary', function(req, res){

      res.sendFile(path.join(__dirname + '/View/salary.html'));
});


// Get Student List
app.get('/studentlist'), function(req, res){
    var db =req.db;
    db.collection('students').find().toArray(function (err, items){
        res.json(items);
    })
}


// Test page view of Hello
app.get('/hello', function(req, res){
    res.send('<h2>No more hello world!</h2>')
})

// Post student data
app.post('/addStudent', (req, res) => {
  db.collection('student').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Saved to database!')
    res.redirect('/')
  })
})

app.get("/user/:name", function(req,res){
    var name = req.params.name;
    var names = db.collection('user');
    names.insert({name: name}, function(err, result){
        if(err){
            res.send("error inserting new name into db");
        }
        else{
            res.send("Already saved!")
        }
    })
})


app.post('/name', function(req, res){
    var name = req.body.name;
    res.send('hello ' +name)
})
