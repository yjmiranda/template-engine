const inquirer = require("inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const employees = [];

inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the manager's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Enter the manager's id: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter the manager's email: "
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number: "
        }
    ])
    .then(function(info){

        createEmployeeObject(info, "Manager");
        gatherEmployeeInfo();
    });

function gatherEmployeeInfo(){
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employeeType",
                    message: "What type of employee would you like to add?",
                    choices: ["Engineer", "Intern"]
                }
            ])
            .then(function(choice){
                if(choice.employeeType === "Engineer"){
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "Enter engineer's name: "
                            },
                            {
                                type: "input",
                                name: "id",
                                message: "Enter engineer's id: ",
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "Enter engineer's email: ",
                            },
                            {
                                type: "input",
                                name: "github",
                                message: "Enter engineer's GitHub username: "
                            },
                            {
                                type: "list",
                                name: "keepGoing",
                                message: "Would you like to add another employee?",
                                choices: ["Yes","No"]
                            }
                        ]).then(function(info){
                            createEmployeeObject(info, choice.employeeType);
                            if (info.keepGoing === "Yes"){
                                gatherEmployeeInfo();
                            } else {
                                console.log(employees);
                            }
                        });
                } else if (choice.employeeType === "Intern"){
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "Enter intern's name: "
                            },
                            {
                                type: "input",
                                name: "id",
                                message: "Enter intern's id: ",
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "Enter intern's email: ",
                            },
                            {
                                type: "input",
                                name: "school",
                                message: "Enter intern's school: "
                            },
                            {
                                type: "list",
                                name: "keepGoing",
                                message: "Would you like to add another employee?",
                                choices: ["Yes","No"]
                            }
                        ]).then(function(info){
                            createEmployeeObject(info, choice.employeeType);
                            if (info.keepGoing === "Yes"){
                                gatherEmployeeInfo();
                            } else {
                                console.log(employees);
                            }
                        });
                }
            });
}

function createEmployeeObject(info,type){
    if(type === "Manager"){
        let manager = new Manager(info.name, info.id , info.email, info.officeNumber);
        employees.push(manager);
    } else if (type === "Engineer"){
        let engineer = new Engineer(info.name, info.id, info.email, info.github);
        employees.push(engineer);
    } else if (type === "Intern"){
        let intern = new Intern(info.name, info.id, info.email, info.school);
        employees.push(intern);
    }
};