'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var pets = fs.readFile(petsPath, 'utf8', function(err, data) {
  pets = JSON.parse(data);
  if (err) {
    throw err;
  }
});


app.get('/pets', function(req, res) {
  res.send(pets);
  res.sendStatus(200).send('OK');
});


app.get('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
  // console.log(index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  res.send(pets[index]);
});


app.post('/pets', function(req, res) {
 var pet = {
     age : req.body.age,
     kind : req.body.kind,
     name : req.body.name
   };

 if (!req.body.age || !req.body.kind || !req.body.name) {
   return res.sendStatus(400);
 }

 pets.push(pet);
 var petsJSON = JSON.stringify(pets);
 fs.writeFile(petsPath, petsJSON, function(writeErr) {
   if (writeErr) {
     return res.sendStatus(500);
   }

 });
 res.send(pet);
});



app.put('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }
  var pet = req.body;
  if (!req.body.age || !req.body.kind || !req.body.name) {
    return res.sendStatus(400);
  }
  pets[index] = pet;

  var petsJSON = JSON.stringify(pets);
  fs.writeFile(petsPath, petsJSON, function(writeErr) {
    if (writeErr) {
      return res.sendStatus(500);
    }
  });
  res.send(pet);
});



app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  var pet = pets.splice(index, 1)[0];
  // console.log(pet);

      var petsJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          return res.sendStatus(500);
        }
      });


  res.send(pet);
});



app.listen('5000', function() {
  console.log('Listening on 5000');
});

module.exports = app;
