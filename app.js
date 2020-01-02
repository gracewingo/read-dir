'use strict'
const fs = require('fs');
const path = require('path');
const pathToRecords = path.resolve(__dirname, 'records');
let filteredList = [];

const readdir = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        error ? reject(error) : resolve(files);
      });
    });
  };

readdir(pathToRecords)
.then((files) => 
        files.map(file => fs.readFile(path.join('records', file), (err, data) => {
            if (err) throw err;
            let records = JSON.parse(data);
            
            filteredList = records.filter(record => record.isActive === true);
            //Of the people who are active, who has a balance exceeding 2000?
            filteredList2 = filteredList.filter(record => {
                let amount = record.balance.replace(/[$,]/g, '');
                return parseFloat(amount) > 2000;
            })
            //Has a registered` timestamp after January 1st 2016. Return records if first date is after the second one
            filteredList3 = filteredList.filter(record => {
                let registered = record.registered;
                registered = new Date(registered);
                return registered > new Date('January 1 2016');
            })
            console.log(filteredList.length)
            console.log(file)
            // let stream = fs.createWriteStream("filteredRecords.txt");
            // console.log(new Date().toISOString());
            
            // stream.write(JSON.stringify(filteredList));  
            
            // filteredList.forEach(function (data) {
            //     stream.write(JSON.stringify(data));
            // })

            // stream.on('finish', () => {
            //     //console.log(`wrote all the array data to file filteredRecords`);
            // });
            // console.log(new Date().toISOString());
            // stream.end()
            //console.log()
            console.log(filteredList.length)
        })))
.catch((error) => console.error(error.message));


