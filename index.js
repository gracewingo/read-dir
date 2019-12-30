/*
There are 6 `json` files, each of which contains 100 people records. 
In the language of your choice (although, JavaScript is preferred), 
please sift through the records in each of the files and distill the total records 
(across all files) down to people who:

- Are `active`
- Have a balance exceeding $2000
- Have a `registered` timestamp _after_ January 1st, 2016

Write the records which meet the above criteria to a new file. 
You don't necessarily have to write the records to a new `json` file (you won't be penalized if you do). 
Assume disk space is somewhat scarce.
---
go through all 6 json files, first fetch them. to do so set up a node server. 
can use map - or a better sorting/filtering method. 
create a database? 
focus on efficiency 
- how to get, read, and write the files in most efficient way



scalability:
https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback

https://stackoverflow.com/questions/559112/how-to-convert-a-currency-string-to-a-double-with-jquery-or-javascript
*/