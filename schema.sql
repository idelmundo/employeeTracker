DROP DATABASE IF EXISTS employeeT_db;

CREATE DATABASE employeeT_db;

use employeeT_db;

--  Create department 
CREATE TABLE  department (
id INT NOT NULL AUTO_INCREMENT,
name_department VARCHAR(30),
PRIMARY KEY (id)    
);
--  create employee
CREATE TABLE  employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY (id)    
);
-- create employee role 
CREATE TABLE  empl_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(10,2) NULL,
department_id INT NULL,
PRIMARY KEY (id)    
);



