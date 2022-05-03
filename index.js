const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
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
        
        if (choice==="Update employee role"){
            updateEmployee();
        }
        else if(choice==="View all roles"){
            viewRole()
        }
        else if(choice==="Add role"){
            addRole()
        }
        else if(choice==="View all deparments"){
            viewDepartment()
        }
        else if(choice==="Add department"){
            addDepartment()
        }
        else if(choice==="View all employees"){
            viewEmployee()
        }
        else
        {
            connection.end();
        }
     });
}

function viewDepts() {
    connection.query("SELECT * FROM department",
    function(err, result) {
        if (err) throw err;
        console.table(result);
        startChoices();
      }
    ); 
}

function viewRole() {
    connection.query(
    "SELECT role.id, role.title, role.department_id, role.salary, department.name FROM role LEFT JOIN department on role.department_id = department.id",
    function(err, result) {
       if (err) throw err;
       console.table(result);
       startChoices();
     }
    ); 
}

function viewEmployee() {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
      function(err, result) {
        if (err) throw err;
        console.table(result);
        startChoices();
      }
    );
  };

function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "newDepartment"
      })
      .then(function (err,result) {
        const newDepartment = result.newDepartment;
        const query = `INSERT INTO department (department_name) VALUES ('${newDepartment}')`;
        connection.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        startChoices();
        });
      });
}