'use strict';
var fs = require('fs');
// console.log(fs);
var path = require('path');
// console.log(path);
var petsPath = (__dirname, 'pets.json');
// console.log(petsPath);
// console.log(__dirname);
var node = path.basename (process.argv[0]);
var file = path.basename (process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];
// console.log(cmd);===undefined


//******CDM READ****************
if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    var pets = JSON.parse(data);

    if (readErr){
      //why readErr and not just err???
      console.log("error");
      throw readErr;
    }
    // console.log(pets); //nothing???
    //get pet index code
    else if (index === undefined) {
        console.log(pets);
        process.exit(1);
      }
    else if (index > pets.length - 1 || index < 0) {
        console.error(`Usage: ${node} ${file} INDEX`);
        process.exit(1);
     }
      console.log(index);
      var pet = pets;
      console.log(pet[index]);
//get pet index code
  });
}

//******CDM CREATE****************
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function (readErr, data) {
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    // console.log(pets);

  var pet = {
    "age": parseInt(age),
    "kind":kind,
    "name":name};

    if (!pets) {
      console.error(`Usage: ${node} ${file} ${cmd} PET`);
      process.exit(1);
    }
    pets.push(pet);

    var petsJSON = JSON.stringify(pets);
    // console.log(petsJSON);

//*****writeFile*********************
    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if(writeErr) {
        throw writeErr;
      }
      // console.log(pets);
    });
  });
}


else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
