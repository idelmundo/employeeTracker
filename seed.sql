USE employeeT_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Megan", "Fox", "34", "35"), ("Ali", "Wong", "24", "25"), ("Will", "Ferrell", "14", "15");

INSERT INTO empl_role (title, salary, department_id)
VALUES ("Software Dev", "200000", "701"), ("Manager", "150000", "725"), ("Intern", "40000", "780");

INSERT INTO department (name_department)
VALUES ("Engineering"), ("Sales"), ("Operations");