USE employee_db; 

INSERT INTO department (name)
VALUES ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");
SELECT * FROM department;


INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 4, 100000),
    ("Salesperson", 4, 80000),
    ("Lead Engineer", 1, 150000),
    ("Software Engineer", 1, 120000),
    ("Account Manager", 2, 160000),
    ("Accountant", 2, 125000),
    ("Legal Team Lead", 3, 250000),
    ("Lawyer", 3, 190000);
SELECT * FROM role;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 4, NULL),
    ("Mike", "Chan", 4, 1),
    ("Ashley", "Rodriguez", 1, NULL),
    ("Kevin", "Tupik", 1, 3),
    ("Kunal", "Singh", 2, NULL),
    ("Malia", "Brown", 2, 5),
    ("Sarah", "Lourd", 3, NULL),
    ("Tom", "Allen", 3, 7);
SELECT * FROM employee;
