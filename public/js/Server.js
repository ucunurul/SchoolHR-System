var exp = require("express");
var app = exp();
var path = require('path');

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});


// app.get('/', function(req, res){
    
//     res.sendFile(path.join(__dirname + '/index.html'));
//     //app.use(express.static(__dirname + '/public'));
    
//     // res.json({
//     //     name: 'ucu',
//     //     age: 21
//     // })
// });

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


app.get('/hello', function(req, res){
    res.send('<h2>No more hello world!</h2>')
})

app.get('/html', function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"})
    res.write("<Button>My Button</Button>")
    res.end();
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

// app.listen('8080', 'localhost', function(){
//     console.log('Listening on localhost:8080');
// })