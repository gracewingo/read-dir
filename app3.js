const JSONStream = require('JSONStream');
const fs = require('fs');
const path = require('path');

const readdir = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        error ? reject(error) : resolve(files);
      });
    });
};

function startWriteStream(list){
    if (list.length === 116){
        const transformStream = JSONStream.stringify();
        const outputStream = fs.createWriteStream( __dirname + "/data.json" );
        transformStream.pipe(outputStream);
        list.forEach( transformStream.write );
        transformStream.end();
    } 
}

async function readFiles(){
    const files = await readdir(path.resolve(__dirname, 'records'))
    const list = [];

    files.map(file => {
        let filteredList = [];
        const inputStream = fs.createReadStream(`./records/${file}`);
        const transformStream = JSONStream.parse();

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
        .on("end",() => {
            console.log(filteredList.length)
            list.push(...filteredList);
            startWriteStream(list);
            //do promises here or variables to inputStream and map func 
        })
    })
}

readFiles();

/*
revisit this: https://stackoverflow.com/questions/45040277/nodejs-write-multiple-files-in-for-loop

https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/




To do:
- clean up (remove console logs, comments, etc)
- figure out the promises.all, 
    as a way grab each incoming list before calling the write function  
- calculate memory usage, execution speed, etc on evaluation criteria 
- make the file compressed - gzip! 
- figure out using both .pipe and on('data') - talk to JR about it 
- make sure i understand this code, the best i can 
- immediately invoke readFiles function 
- ignore/remove node_modules
-  send in!

*/