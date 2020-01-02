'use strict'
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const pathToRecords = path.resolve(__dirname , 'records');
// console.log(pathToRecords);

const files = ['records1.json', 'records2.json'];

function copyFile(source, destination) {
    const input = fs.createReadStream(source, {objectMode:true, encoding: 'utf8'});
    const output = fs.createWriteStream(destination);

    input.on('data', (data) => {
        console.log(typeof data)
    })

    return new Promise((resolve, reject) => {
        output.on('error', reject);
        input.on('error', reject);
        input.on('end', resolve);
        input.pipe(output)  
    });
}

//Create an array of promises 
const promises = files.map(file => {
    const source = `${pathToRecords}/${file}`;
    const destination = path.resolve(__dirname, `tmp/${file}`);

    return copyFile(source, destination);
});

Promise.all(promises).then(_ => {
    console.log('done');
}).catch(err => {
    // handle I/O error
    console.error(err);
});












// fs.readdirAsync = function(path) {
//     return new Promise(function(resolve, reject) {
//         fs.readdir(dirname, function(err, filenames){
//             if (err) 
//                 reject(err); 
//             else 
//                 resolve(filenames);
//         });
//     });
// };

// fs.readFileAsync = function(filename, enc) {
//     return new Promise(function(resolve, reject) {
//         fs.readFile(filename, enc, function(err, data){
//             if (err) 
//                 reject(err); 
//             else
//                 resolve(data);
//         });
//     });
// };

// function getFile(filename) {
//     return fs.readFileAsync(filename, 'utf8');
// }

// function isDataFile(filename) {
//   return (filename.split('.')[1] == 'json' 
//           && filename.split('.')[0] != 'fishes'
//           && filename.split('.')[0] != 'fishes_backup')
// }

// fs.writeFile('', '', function(){console.log('done')});

// fs.readdirAsync(pathToRecords).then(function (filenames){
//     filenames = filenames.filter(isDataFile);
//     return Promise.all(filenames.map(getFile));
// }).then(function (files){
//     var summaryFiles = [];
    
//     fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
//         if(err) {
//           return console.log(err);
//         }
//     });
// });
