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
                "update manager role",
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
                    addept()
                    break;
                case "add role":
                    roleAdd()
                    break;
                case "update employee role":
                    updateemployeerole()
                    break;
                case "update manager role":
                    updateManagerRole()
                    break;
                case "remove employee":
                    removeemployee()
                    break;
                default:
                    connection.end();
                    break;
            };
        });
};
//start linking database
//view all employee
function viewAllemployee() {
    var query = "SELECT employee.first_name, employee.last_name, empl_role.title, empl_role.salary FROM employee LEFT JOIN empl_role on employee.id = empl_role.id;";
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
// select role Managers for add employee
var roleArr = [];

function selectRole() {
    connection.query("SELECT * FROM empl_role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr
};

var managersArr = [];

function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}

// add empl please work
function addemployee() {
    inquirer.prompt([{
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role_Id",
            type: "list",
            message: "What is their role? ",
            choices: [1, 2, 3, 4, 5]
        },
        {
            name: "manager_id",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: [6, 7, 8, 9, 10]
        }
    ]).then(function(val) {
        connection.query("INSERT INTO employee SET ?", {
            first_name: val.firstname,
            last_name: val.lastname,
            manager_id: val.manager_id,
            role_id: val.role_id

        }, function(err) {
            if (err) throw err
            console.table(val)
            runSearch()
        })

    })
}
//add department
function addept() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "Add new department?"
    }]).then(function(val) {
        // var roleId = selectRole().indexOf(val.role) + 1
        // var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO department SET ?", {
            name_department: val.department
        }, function(err) {
            if (err) throw err
            console.table(val)
            runSearch()
        })

    })
}
//add employee role
function roleAdd() {
    inquirer.prompt([{
            name: "title",
            type: "input",
            message: "Enter title "
        },
        {
            name: "salary",
            type: "input",
            message: "Enter salary"
        },
        {
            name: "departmentId",
            type: "list",
            message: "enter department id? ",
            choices: [1, 2, 3, 4, 5]
        }

    ]).then(function(val) {
        connection.query("INSERT INTO empl_role SET ?", {
            title: val.title,
            salary: val.salary,
            department_id: val.departmentId,


        }, function(err) {
            if (err) throw err
            console.table(val)
            runSearch()
        })

    })
}
//update role
function updateemployeerole() {
    connection.query("SELECT * FROM empl_role", function(err, results) {
        inquirer.prompt([{
                name: "update",
                type: "rawlist",
                choices: function() {
                    var choiceArr = []
                    for (var i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].id);
                        // console.log(results);
                    }
                    // console.log(choiceArr);
                    return choiceArr;
                },
                message: "Which role would you like to update?"
            },
            {
                name: "title",
                type: "input",
                message: "What title role would you like to update"
            },
            {
                name: "salary",
                type: "input",
                message: "What salary role would you like to update "
            },
            {
                name: "departmentid",
                type: "list",
                message: "what department id is the updated role in?",
                choices: ["1", "2", "3", "4", "5"]
            }

        ]).then(function(val) {
            connection.query("UPDATE empl_role SET ? WHERE ?", [{
                        title: val.title,
                        salary: val.salary,
                        department_id: val.departmentid,
                    },
                    {
                        id: val.update
                    }
                ],
                function(err) {
                    if (err) throw err
                    console.table(val)
                    runSearch()
                })
        })

    })
}

function updateManagerRole() {
    connection.query("SELECT * FROM employee", function(err, results) {
        console.table(results)
        inquirer.prompt([{
                name: "update",
                type: "rawlist",
                choices: function() {
                    var choiceArr = []
                    for (var i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].id);
                        // console.log(results);
                    }
                    // console.log(choiceArr);
                    return choiceArr;
                },
                message: "Which employee id would you like to update?"
            },
            {
                name: "manager",
                type: "input",
                message: "update manager id"
            }

        ]).then(function(val) {
            connection.query("UPDATE employee SET ? WHERE ?", [{
                        manager_id: val.manager,
                    },
                    {
                        id: val.update
                    }
                ],
                function(err) {
                    if (err) throw err
                    console.table(val)
                    runSearch()
                })
        })

    })
}

function removeemployee() {
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
                        runSearch();
                    });
            });
    })
}