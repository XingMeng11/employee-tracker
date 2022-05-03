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