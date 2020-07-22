// dependencies
var mysql = require("mysql");
var inquire = require("inquirer");
var cTable = require("console.table");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeT_db"
});

connection.connect(function(err) {
    if (err) throw err;
    startEmpl();

});
// Questions starts here
function startEmpl() {
    inquirer.prompt([{
            type: "list",
            name: "fQuestion",
            message: "what would you like to do?",
            choices: [
                "view all employee",
                "view all roles",
                "view all departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "remove employee"
            ]
        }]
        .then(function(answer) {
            console.log(answer);
            switch (answer.fQuestions) {
                case "view all employee":
                    viewallempoyee()
                    break;
            }
        })
    )
}