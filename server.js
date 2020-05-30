var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "D0))Ph1Np0d",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  chooseAct();
});

function chooseAct() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee role"
      ]
    })
    .then(function(answer) {

      switch (answer.action) {
      case "Add department":
        insertDept();
        break;

      case "Add role":
        insertRole();
        break;

      case "Add employee":
        insertEmployee();
        break;

      case "View department":
        deptSearch();
        break;

      case "View role":
        roleSearch();
        break;

      case "View employee":
        employeeSearch();
        break;

      case "Update employee role":
        updateRole();
        break;
      }
    });
}

function insertDept() {
    inquirer
      .prompt([
        {
          name: "deptName",
          type: "input",
          message: "What is the name of the department you would like to add?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            deptName: answer.deptName,
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");
            chooseAct();
          }
        );
      });
  };
  
  function insertRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the employee role you would like to add?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the employee role you would like to add?"
        },
        {
          name: "dept_id",
          type: "input",
          message: "What is the id of the department in which this role will be filed?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employeeRole SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            dept_id: answer.dept_id
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee role was created successfully!");
            chooseAct();
          }
        );
      });
  }
  
  function insertEmployee() {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the first name of the new employee?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the last name of the new employee?"
        },
        {
        name: "employeeRole_id",
        type: "input",
        message: "What is the role id of the new employee?"
        },
        {
          name: "dept_id",
          type: "input",
          message: "What is the department id of the new employee?"
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the id of the manager of the new employee?"
        }

      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            employeeRole_id: answer.employeeRole_id,
            dept_id: answer.dept_id,
            manager_id: answer.manager_id
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee was created successfully!");
            chooseAct();
          }
        );
      });
  };

  function deptSearch() {
          connection.query("SELECT * FROM department;", function(err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            chooseAct();
          });
        };

  function roleSearch() {
        connection.query("SELECT * FROM employeeRole;", function(err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
          chooseAct();
        });
  };

  function employeeSearch() {
    connection.query("SELECT * FROM employee;", function(err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      chooseAct();
    });
};

function updateRole() {
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].employee_id);
          }
          return choiceArray;
        },
        message: "What is the employee id of the employee whose role you would like to change?"
      },
      {
        name: "role",
        type: "input",
        message: "What is the new role of the employee?"
      }
    ])
    .then(function(answer) {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
            [
              {
                employeeRole_id: answer.employeeRole_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log(res.affectedRow + "Role changed successfully!");
              chooseAct()
            }
          );
        });


    });
};
