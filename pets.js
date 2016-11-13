'use strict';

var fs = require('fs');
var path = require('path');

var petsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];

//****************CMD READ*****************
if (cmd === 'read') {

  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);


    if (err) {
      throw err;

    }else if (index === undefined) {
        console.log(pets);

    }else if (index > pets.length - 1 || index < 0){
      console.error(`Usage: ${node} ${file} INDEX`);
      process.exit(1);

    }
     console.log(pets[index]);
  });
}
//**************CMD CREATE******************
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var pet = {
      age: Number(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5]
    };

    if (!pet || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log('success!');
    });
  });

//********CMD UPDATE*************************
}
else if (cmd === 'update') {
  var index = process.argv[3];
  var age = Number(process.argv[4]);
  var kind = process.argv[5];
  var name = process.argv[6];


  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var pet = {
      age: age,
      kind: kind,
      name: name
    };

    if (!pet) {
      console.error(`Usage: ${node} ${file} ${cmd} PET`);
      process.exit(1);
    }

    pets[index] = pet;

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      // console.log(pets[index]);
      // console.log('success!');
    });
  });
}
//*******CMD DESROY************************
else if (cmd === 'destroy') {
  // var index = process.argv[3];
  // var age = Number(process.argv[4]);
  // var kind = process.argv[5];
  // var name = process.argv[6];

  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);

    // var pet = {
    //   age: age,
    //   kind: kind,
    //   name: name
    // };

    if (err) {
      throw err;
    }

    else if (index === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    else if (index > pets.length - 1 || index < 0) {
      console.error(`Usage: ${node} ${file} INDEX`);
      process.exit(1);
    }

    pets.splice(index, 1);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(err) {
      if (err) {
        throw err;
      }
      // console.log(pets[index]);
      // console.log('success!');
    });
  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
