var exp = require("express");
var app = exp();
var router = exp.Router();
var assert = require ('assert');

//Store all HTML files in view folder.
app.use(exp.static(__dirname + '/View'));
//Store all JS and CSS in Scripts folder.
app.use("/public",exp.static("public"));

var path = require('path');

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}));

var db;
// init mongodb
var Mongoc = require("mongodb").MongoClient;
// var mongourl = 'mongodb://192.168.100.36:27017/SchoolDB';
var objectid = require('mongodb').ObjectID;
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
            console.log("Listening on Kiki's computer :8080");
        })
    }
})

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname + '/index.html'));
    res.render('Server');
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


// Get student data
app.get('/getStudent', function(req, res){
    var student = db.collection('student');
    student.find().toArray(function(err, docs){
        console.log('fetching data');
        res.json(docs);

    });

    // before changed

        //  db.collection('student', function(err, collection) {
        //      collection.find().toArray(function(err, items) {
        //          console.log(items);
        //          res.send(items);
        //      });
        //  });
     });

app.get('/getTeacher', function(req, res){
         db.collection('teacher', function(err, collection) {
             collection.find().toArray(function(err, items) {
                 console.log(items);
                 res.send(items);
             });
         });
     });

/* Post student data */
// Version 1
// app.post('/addStudent', (req, res) => {
//   db.collection('student').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//     console.log(req.body)
//     console.log('Saved to database!')
//     res.redirect('/')
//   })
// })

// Version 2
app.post('/addStudent', function(req, res, next){
    console.log('Processing');

    var newStudent = {
        StudentId:req.body.StudentId,
        Name:req.body.Name,
        Class:req.body.Class,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Address:req.body.Address

    };
    
    db.collection('student').insert(newStudent, function(err, result){
        assert.equal(null, err);
        console.log('New student inserted');        
    });
    res.json(newStudent);
    res.redirect('/student.html')
})

//delete student
app.delete('/deleteStudent', (req, res) => {
 var id = req.body._id;
    // Mongoc.connect(mongoUrl, function(err, db){
    //       assert.equal(null, err);
        db.collection('student').deleteOne({_id:objectid(id)}, function(err, result){
            assert.equal(null, err);
            console.log('Data student Deleted');
            console.log(req.body.id)
            // db.close();
        // });
    });
res.json({ message: 'Successfully deleted student data' });
})

//delete teacher
app.delete('/deleteTeacher', (req, res) => {
 var id = req.body._id;
    // Mongoc.connect(mongoUrl, function(err, db){
    //       assert.equal(null, err);
        db.collection('teacher').deleteOne({_id:objectid(id)}, function(err, result){
            assert.equal(null, err);
            console.log('Data teacher is Deleted');
            console.log(req.body.id)
            // db.close();
        // });
    });
res.json({ message: 'Successfully deleted teacher data' });
})

app.put('/updateStudents',function(req,res, next){
    var id = req.body.id;
    var st = db.collection('student');
    st.findAndModify({_id: objectid(id)},[['_id','asc']],
      {$set:{
      StudentId: req.body.StudentId, 
      Name: req.body.Name, 
      Class: req.body.Class, 
      Age: req.body.Age, 
      Gender: req.body.Gender, 
      Address: req.body.Address}},
    function(err, result){
        if(err)
        {
            res.send(500,err)
        }        
        else
        {
            res.send(200,{success:true , st : result});
            res.end();
        }})
    })

app.put('/updateStudent', function (req, res, next){
    var updStudent={
        StudentId:req.body.StudentId,
        Name:req.body.Name,
        Class:req.body.Class,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Address:req.body.Address
    };
    var id = req.body.id;
    db.collection('student').updateOne({_id:objectid(id) },{$set:updStudent},function(err, result) {
        // assert.equal(null, err);
        console.log('Student Updated!');
    });

    // db.collection('student').updateOne({_id:objectid(id) },{$set:updStudent},function(err, result) {
    //     assert.equal(null, err);
    //     console.log('Student Updated!');
    // });

    // optional response
    res.json({message: 'Succesfully Student Updated.'})
})

app.put('/api/students/edit',function(req,res){
 var id = req.body.id;
 var st = db.collection('students');
 st.findAndModify({_id: ObjectId(id)},[['_id','asc']],
  {$set:{nis: req.body.nis, nama : req.body.nama,kelas: req.body.kelas, jenisKelamin: req.body.jk}},
 function(err, result){
   if(err){
    res.send(500,err)
   }else{
    res.send(200,{success:true , st : result});
    res.end();
   }
 }
 )
})