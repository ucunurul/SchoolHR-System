# HR System
The goal of the Simple Web Front-End apps.

## Training

* Project Name: SchoolHR-System
* Version     : 1.0
* Date    	  : 18 Januari 2017
* By		      : M. Adi Panggayuh & Ucu Nurul Ulum
* Development kit:
  - Visual Studio Code
  - Node.js
  - MongoDB

### Install Packages & How to
* npm install
* cd to express project, ex : cd \nodetest\, and then npm install
* install MongoDB 64bit - 2008 R2, in command prompt, type "mongod --dbpath ..\nodetest\data\" & npm install --save mongodb
* run mongod.exe on your installation folder MongoDB on another command prompt, type "mongo" too from your another command prompt
* "use nodetest" from your mongo command prompt window
* and then, for ex: "db.users.insert({ "username" : "kiki", "age" : "13" })"
* or "newstuff = [{ "username" : "ucu", "age" : "14" }, { "username" : "dani", "age" : "20" }]
db.users.insert(newstuff);"
* type "db.users.find().pretty()" to make sure the datas already inserted
* open ../nodetest/app.js, add these line 
// Connect to mongodb
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest')

* add these lines too on the app.js// Make db accessible to our router
app.use(function(req, res, next){
  req.db = db;
  next();
})



