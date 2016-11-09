'use strict';
var fs = require('fs');
// console.log(fs);
var path = require('path');
// console.log(path);
var petsPath = (__dirname, 'pets.json');
// console.log(petsPath);
// console.log(__dirname);
var node = path.basename (process.argv[0]);
// console.log(process.argv[0]);
// console.log(process.argv);
// console.log(node);
var file = path.basename (process.argv[1]);
// console.log(file);
var cmd = process.argv[2];
// console.log(cmd);===undefined

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr){
      //why readErr and not just err???
      console.log("error");
      throw readErr;
    }
    var pets = JSON.parse(data);
    console.log(pets); //nothing???
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}


// 'use strict';
//
// var fs = require('fs');
// var path = require('path');
// var guestsPath = path.join(__dirname, 'guests.json');
//
// var node = path.basename(process.argv[0]);
// var file = path.basename(process.argv[1]);
// var cmd = process.argv[2];
//
// if (cmd === 'read') {
//   fs.readFile(guestsPath, 'utf8', function(err, data) {
//     if (err) {
//       throw err;
//     }
//
//     var guests = JSON.parse(data);
//
//     console.log(guests);
//   });
// }
// else {
//   console.error(`Usage: ${node} ${file} read`);
//   process.exit(1);
// }
