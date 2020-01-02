/*
There are 6 `json` files, each of which contains 100 people records. 
In the language of your choice (although, JavaScript is preferred), 
please sift through the records in each of the files and distill the total records 
(across _all_ files) down to people who:

- Are `active`
- Have a balance exceeding $2000
- Have a `registered` timestamp _after_ January 1st, 2016

Write the records which meet the above criteria to a new file. 
You don't necessarily have to write the records to a new `json` file 
(you won't be penalized if you do). Assume disk space is somewhat scarce.

## Evaluation Criteria

- Efficiency
  - Memory consumption
  - Execution speed
  - Number of concurrently open files, etc.
- Reusability
- Testability
- Scalability
  - Does the solution work for 100 files instead of 6?
  - Does it work with 1000 records in each file?
- Documentation
  - How do I run this thing?

You're free to make any assumptions you like outside of what I've outlined and 
would be helpful if you'd document them. 
If you require external dependencies, they should **not** be submitted with solution 
- an install and/or compilation step should included as part of the documentation - FIGURE THIS OUT FOR JSONStream 
---

To do:
- look up best practices for filter method and chaining 
- watch youtube video on the nodejs path module
- look into create read stream and write read stream 
- create a node server? 


scalability:
https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback

https://stackoverflow.com/questions/559112/how-to-convert-a-currency-string-to-a-double-with-jquery-or-javascript

https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html

return isAfter(registered, new Date('January 1 2016'));

Assumptions: 
1) all date time formats for registered are the same in each JSON file.
2) the balance value will have trailing 2 after decimal in each JSON file. 


results: 
18
17
15
21
21
24

233 lines of code 
*/
