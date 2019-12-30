'use strict'
const fs = require('fs');
const compareAsc = require('date-fns/compareAsc')
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
        
    })
    console.log(filteredList.length);
});

let result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
console.log(result)



