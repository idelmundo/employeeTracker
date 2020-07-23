
   
  <p>
  <img src="https://media.giphy.com/media/fXneVqLha2bt08DR9e/giphy.gif"width="250"/></p>
  <hr>
  
  ## Table Of Contents
  |   |       | |
| ------------- |:-------------:| -----:|
| [E-mail](#email)| [Project Title](#Project-title)| [Description](#description)|
| [Installation](#installation)| [Usage](#usage)| [License](#license)|
| [Contribute](#contribute)| [Tests](#tests)| [Questions](#questions)|
  <hr>

  ## Email 
  idelmundo68@gmail.com
  <hr>
      
  ## Project title 
  Employee Tracker
  <hr>

  ## Description 
  Here's a Employee tracker for business owner that would like to view and keep track of employees and department/salary. The giphy up to shows how it works and this homework was tough and I had some struggle such like the remove option. ```function removeemployee() {
    connection.query("SELECT * FROM employee", function(err, results) {
        inquirer
            .prompt([{
                name: "employeeID",
                type: "rawlist",
                choices: function() {
                    var choiceArr = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].id);
                    }
                    return choiceArr;
                },
                message: "Please select the employee's ID that you wish to remove?"

            }, ]).then(function(answer) {
                connection.query(
                    "DELETE FROM employee WHERE ?", {
                        id: answer.employeeID
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("employee deleted!");
                        runSearch();```
  here's the code the gave me trouble because we never deleted anything from a table before so a lot of trial and error. 
  <hr>

  ## Installation 
  Use the MySQL NPM package to connect to your MySQL database and perform queries.
  Use InquirerJs NPM package to interact with the user via the command-line.
  Use console.table to print MySQL rows to the console. There is a built-in version of console.table
  MYySQL workbench.
  here are the step to install these:
  npm i 
  npm i requirer 
  npm i mysql
  <hr>

  ## Usage 
  J's
  Mysql 
  
  <hr>

  ## License 
  MIT
  <hr>

  ## Contribute
  Isaias Del Mundo 
  <hr>

  ## Tests 
 mysql workbench 
 node
  <hr>

  ## Questions 
  do you have any question contact me.
  <hr>

  ![license](https://img.shields.io/badge/license-MIT-orange.svg)
        