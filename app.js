'use strict'
const fs = require('fs');
let file = 

fs.readFile('./records/records4.json', (err, data) => {
    if (err) throw err;
    let filteredList = [];
    let records = JSON.parse(data);

    filteredList = records.filter(record => record.isActive === true);
    //Of the people who are active, who has a balance exceeding 2000?
    filteredList = filteredList.filter(record => {
        let amount = record.balance.replace(/[$,]/g, '')
        return parseFloat(amount) > 2000;
    })
    //Have a registered` timestamp after January 1st, 2016 
    filteredList = filteredList.filter(record => {
        let registered = record.registered;
        registered = new Date(registered);
        //Return records if the first date is after the second one
        return registered > new Date('January 1 2016');
        //return isAfter(registered, new Date('January 1 2016'));
    })
    console.log(filteredList.length);
});

//"Sunday, March 16, 2014 8:44 AM",
