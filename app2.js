var fs = require('fs');

fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

function getFile(filename) {
    return fs.readFileAsync(filename, 'utf8');
}

function isDataFile(filename) {
  return (filename.split('.')[1] == 'json' 
          && filename.split('.')[0] != 'fishes'
          && filename.split('.')[0] != 'fishes_backup')
}

// change to createWriteStream
fs.createWriteStream('./fishes.json', '', function(){ console.log('done')});

fs.readdirAsync('./records').then(function (filenames){
    //create filter here
    //filenames = filenames.filter(isDataFile);
    console.log(filenames);
    //return Promise.all(filenames.map(getFile));

}).then(function (files){
    var summaryFiles = [];
    files.forEach(function(file) {
      var json_file = JSON.parse(file);
      summaryFiles.push({ "name": json_file["name"],
                          "imageUrl": json_file["images"][0],
                          "id": json_file["id"]
                      });
    });

    fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was appended!");
    });
});