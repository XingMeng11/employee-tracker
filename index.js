const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'passpass',
      database: 'employee_db'
    }
  );

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startChoices();
});

function startChoices(){
    inquirer
      .prompt([
          {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                      "Update employee role", 
                      "View all roles",
                      "Add role",
                      "View all deparments", 
                      "Add department",
                      "Quit",
                      "View all employees"
                    ]
          }
      ])
      
      .then((answer) => {
          console.log(answer);
        
        if (answer.choice==="Update employee role"){
            updateEmployee();
        }
        else if(answer.choice==="View all roles"){
            viewRole()
        }
        else if(answer.choice==="Add role"){
            addRole()
        }
        else if(answer.choice==="View all deparments"){
            viewDepartment()
        }
        else if(answer.choice==="Add department"){
            addDepartment()
        }
        else if(answer.choice==="View all employees"){
            viewEmployee()
        }
        else
        {
            connection.end();
        }
     });
}

function viewDepartment() {
    connection.query("SELECT * FROM department",
    function(err, result) {
        if (err) {console.log(err)}
        console.table(result);
        startChoices();
      }
    ); 
}

function viewRole() {
    connection.query(
    "SELECT role.id, role.title, role.department_id, role.salary, department.name FROM role LEFT JOIN department on role.department_id = department.id",
    function(err, result) {
      if (err) {console.log(err)}
       console.table(result);
       startChoices();
     }
    ); 
}

function viewEmployee() {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
      function(err, result) {
        if (err) {console.log(err)}
        console.table(result);
        startChoices();
      }
    );
}

function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "newDepartment"
      })
      .then(function (result) {
        const newDepartment = result.newDepartment;
        const query = `INSERT INTO department (department_name) VALUES ('${newDepartment}')`;
        connection.query(query, function (err, result) {
          if (err) {console.log(err)}
        console.table(result);
        startChoices();
        });
      });
}


var departmentArr = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, result) {
    if (err) {console.log(err)}
    for (var i = 0; i < result.length; i++) {
      departmentArr.push(result[i].department);
    }
  })
  return departmentArr;
}

function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleTitle"
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "roleSalary"
        },
        {
          type: "list",
          message: "Which department does the role belong to?",
          name: "roleDepartment",
          choices: selectDepartment()
        }
      ])
      .then(function (result) {
        const title = result.roleTitle;
        const salary = result.roleSalary;
        const departmentID = result.roleDepartment;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        connection.query(query, function (err, result) {
        if (err) {console.log(err)}
        console.log(result);
        startChoices();
        });
      });
}

var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, result) {
    if (err) {console.log(err)}
    for (var i = 0; i < result.length; i++) {
      roleArr.push(result[i].name);
    }
  })
  return roleArr;
}

var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, result) {
    if (err) {console.log(err)}
    for (var i = 0; i < result.length; i++) {
      managersArr.push(result[i].first_name);
    }
  })
  return managersArr;
}


function addEmployee() {
  inquirer
    .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "lastName"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "employeeRole",
          choices: selectRole()
        },
        {
          type: "list",
          message: "Who is employee's manager?",
          name: "employeeManager",
          choices: selectManager() 
        }
      ])
      .then(function (result) {
        const firstName = result.firstName;
        const lastName = result.lastName;
        const employeeRole = result.employeeRole;
        const employeeManager = result.employeeManager;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${employeeManager}")`;
        connection.query(query, function (err, result) {
        if (err) {console.log(err)}
        console.table(result);
        startChoices();
        });
      });

}


function updateEmployeeRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Which employee;s roledo you want to update?",
      name: "updateEmployee"
    },
    {
      type: "input",
      message: "Which role do you want to assign the seleted employee?",
      name: "newRole"
    }
  ])
  .then(function (result) {
      const updateEmployee = result.updateEmploy;
      const newRole = result.newRole;
      const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
      connection.query(queryUpdate, function (err, result) {
        if (err) {console.log(err)}
        console.table(result);
        startChoices();
      })
    });
  }
