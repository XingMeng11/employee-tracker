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


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 4, NULL),
    (2, "Mike", "Chan", 4, 1),
    (3, "Ashley", "Rodriguez", 1, NULL),
    (4, "Kevin", "Tupik", 1, 3),
    (5, "Kunal", "Singh", 2, NULL),
    (6, "Malia", "Brown", 2, 5),
    (7, "Sarah", "Lourd", 3, NULL),
    (8, "Tom", "Allen", 3, 7);
SELECT * FROM employee;
