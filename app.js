'use strict'
const fs = require('fs');
//let file = './records/records4.json'

let filteredList = [];

fs.readFile('./records/records4.json', (err, data) => {
    if (err) throw err;
    let records = JSON.parse(data);

    filteredList = records.filter(record => record.isActive === true);

    //Of the people who are active, who has a balance exceeding 2000?
    filteredList = filteredList.filter(record => {
        let amount = record.balance.replace(/[$,]/g, '')
        return parseFloat(amount) > 2000;
    })

    //Have a `registered` timestamp after January 1st, 2016 || 1, 1, 2016 
    filteredList = filteredList.filter(record => {
        console.log(record.registered > 2016);
        let date = record.registered.split(",")
    })


    console.log(filteredList.length);
});


