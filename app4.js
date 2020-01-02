const JSONStream = require('JSONStream');
const fs = require('fs');
const path = require('path');

function readdir(path){
    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        error ? reject(error) : resolve(files);
      });
    });
};

function startWriteStream(list){
    const transformStream = JSONStream.stringify();
    const outputStream = fs.createWriteStream( __dirname + "/data.json" );
    transformStream.pipe(outputStream);
    list.forEach(transformStream.write);
    transformStream.end();
}

(async function readFiles(){
    const files = await readdir(path.resolve(__dirname, 'records'))
    const promises = files.map(readEachFile);
    const filteredRecords = [];

    Promise.all(promises)
        .then((results) => {
            results.map(result => filteredRecords.push(...result))
            startWriteStream(filteredRecords);  
        })
        .catch(err => {
            console.log(err)
        })
})();

function readEachFile(file){
    const inputStream = fs.createReadStream(`./records/${file}`);
    const transformStream = JSONStream.parse();
    let filteredList = [];

    return new Promise((resolve, reject) => {
        inputStream
        .pipe(transformStream)
        .on("data", (records) => {
            filteredList = records.filter(record => record.isActive === true);

            filteredList = filteredList.filter(record => {
                let amount = record.balance.replace(/[$,]/g, '');
                return parseFloat(amount) > 2000;
            })

            filteredList = filteredList.filter(record => {
                let registered = record.registered;
                registered = new Date(registered);
                return registered > new Date('January 1 2016');
            })
        })
        .on('end', () => {
           resolve(filteredList);
        })
    });
};


