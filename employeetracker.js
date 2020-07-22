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
    runSearch();

});
// Questions starts here
function runSearch() {
    inquirer.prompt({
            type: "rawlist",
            name: "action",
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
        })
        .then(function(answer) {
            console.log(answer);
            switch (answer.action) {
                case "view all employee":
                    viewAllemployee()
                    break;
                case "view all roles":
                    viewAllroles()
                    break;
                case "view all departments":
                    viewAlldepartments()
                    break;
                case "add employee":
                    addemployee()
                    break;
                case "add department":
                    adddepartment()
                    break;
                case "add role":
                    roleAdd()
                    break;
                case "update employee role":
                    updateemployeerole()
                    break;
                case "remove employee":
                    removeemployee()
                    break;
            };
        });
};
//start linking database
//view all employee
function viewAllemployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + " found you");
        console.table('All Employees:', res);
        runSearch();
    })
}
// view all roles
function viewAllroles() {
    var query = "SELECT * FROM empl_role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + " found you");
        console.table('All empl role:', res);
        runSearch();
    })
}
// view all department 
function viewAlldepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + " found you");
        console.table('All empl role:', res);
        runSearch();
    })
}
//add empl
function addemployee() {
    inquirer
        .prompt({
            name: "addemployee",
            type: "input",
            messages: ["To ADD an employee, enter first then last name"]
        })
        .then(function(answer) {
            console.log(answer)
            var str = answer.addemployee;
            var firstAndLastName = str.split(" ");
            console.log(firstAndLastName);
            var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
            connection.query(query, [
                [firstAndLastName]
            ], function(err, res) {
                runSearch();
            });
        })
}

function adddepartment() {
    inquirer
        .prompt({
            name: "adddepartment",
            type: "input",
            message: ["To ADD a department, enter new department name"]
        })

    .then(function(answer) {
        console.log(answer)
        var str = answer.addemployee;
        var firstAndLastName = str.split(" ");
        console.log(firstAndLastName);
        var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
        connection.query(query, [
            [firstAndLastName]
        ], function(err, res) {

            runSearch();
        });
    })
}

function roleAdd() {
    inquirer
        .prompt({
            name: "title",
            type: "input",
            message: ["Enter new role name"]
        })
        .then(function(answer) {
            var title = answer.title;

            inquirer
                .prompt({
                    name: "salary",
                    type: "input",
                    message: ["Enter new role salary"]
                })
                .then(function(answer) {
                    var salary = answer.salary;

                    inquirer
                        .prompt({
                            name: "department_id",
                            type: "input",
                            message: ["Enter new role department id"]
                        })
                        .then(function(answer) {
                            var department_id = answer.department_id;

                            console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

                            var query = "INSERT INTO empl_role (title, salary, department_id) VALUES ?";
                            connection.query(query, [
                                [
                                    [title, salary, department_id]
                                ]
                            ], function(err, res) {
                                if (err) {
                                    console.log(err);
                                }

                                runSearch();
                            });
                        })
                })
        })

}