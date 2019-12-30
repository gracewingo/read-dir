'use strict'
const fs = require('fs');
//let file = './records/records4.json'

let filteredList = [];

fs.readFile('./records/records4.json', (err, data) => {
    if (err) throw err;
    let records = JSON.parse(data);

    filteredList = records.filter(record => record.isActive === true);
    filteredList = filteredList.filter(record => {
        let amount;
        amount = record.balance.replace(/[$,]/g, '')
        console.log(amount > 2000)
        //console.log(parseFloat(amount))
    })
    //console.log(filteredList)
});