'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var pets =[ { age: 7, kind: 'rainbow', name: 'fido' },
  { age: 5, kind: 'snake', name: 'Buttons' } ];


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
  // var pet = req.body;

  var pet = {
      age : Number(req.body.age),
      kind : req.body.kind,
      name : req.body.name
    };


  if (!pet) {
    return res.sendStatus(400);
  }

  pets.push(pet);

  res.send(pet);
});



app.put('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }
  var pet = req.body;
  if (!pet) {
    return res.sendStatus(400);
  }
  pets[index] = pet;
  res.send(pet);
});



app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  var pet = pets.splice(index, 1)[0];
  res.send(pet);
});



app.listen('5000', function() {
  console.log('Listening on 5000');
});

module.exports = app;
