DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
    dept_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    deptName VARCHAR(30) NOT NULL  
);

CREATE TABLE employeeRole (
    employeeRole_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    dept_id INT UNSIGNED NOT NULL
);

CREATE TABLE employee (
    employee_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employeeRole_id INT UNSIGNED NOT NULL,
    dept_id INT UNSIGNED NOT NULL,
    manager_id INT NULL
);

INSERT INTO department (deptName)
VALUES ("Management");

INSERT INTO department (deptName)
VALUES ("Everybody else");

INSERT INTO employeeRole (title, salary, dept_id)
VALUES ("Owner", 150, "1");

INSERT INTO employeeRole (title, salary, dept_id)
VALUES ("Minion", 100, "2");

INSERT INTO employee (first_name, last_name, dept_id, manager_id)
VALUES ("Rich", "One", "1","1");

INSERT INTO employee (first_name, last_name, dept_id, manager_id)
VALUES ("Les", "So", "2", "1");


