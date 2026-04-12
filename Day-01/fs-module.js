const fs = require('fs');

// write
fs.writeFileSync('demo.txt', 'Hello from FS');
console.log("File created");

// read
const data = fs.readFileSync('demo.txt', 'utf-8');
console.log(data);

//append
fs.appendFileSync('demo.txt', '\nNew Line Added');
console.log("Appended successfully");

// rename
fs.renameSync('demo.txt', 'newDemo.txt');
console.log("File renamed");
