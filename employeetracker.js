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
    inquirer.prompt({
            type: "rawlist",
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
        })
        .then(function(answer) {
            console.log(answer);
            switch (answer.fQuestions) {
                case "view all employee":
                    viewallempoyee()
                    break;
                case "view all roles":
                    viewallroles()
                    break;
                case "view all departments":
                    viewalldepartments()
                    break;
                case "add employee":
                    addemployee()
                    break;
                case "add department":
                    adddepartment()
                    break;
                case "add role":
                    addrole()
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
//view all employee
function viewallempoyee() {
    console.log("get employees from database");
    const coolQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(coolQuery, function(err, answer) {
        console.log("\n Employees from Database \n");
        console.table(answer);
    });
    startEmpl();
}