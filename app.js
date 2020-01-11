const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

//stores employee objects
const employees = [];

//runs on app start
//gathers manager info
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

        //write manager info to object
        createEmployeeObject(info, "Manager");

        //run the promts to gather the employee info
        gatherEmployeeInfo();
    });

//gathers employee information
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
                            //use the information gathered to create the employee object
                            createEmployeeObject(info, choice.employeeType);
                            if (info.keepGoing === "Yes"){
                                gatherEmployeeInfo();
                            } else {
                                //generate and HTML template using the objects inside the employees array
                                let htmlFile = generateHTMLtemplate(employees);
                                //use the generated template to write the HTML file
                                writeHTMLfile(htmlFile);
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
                            //use the information gathered to create the employee object
                            createEmployeeObject(info, choice.employeeType);
                            if (info.keepGoing === "Yes"){
                                gatherEmployeeInfo();
                            } else {
                                //generate and HTML template using the objects inside the employees array
                                let htmlFile = generateHTMLtemplate(employees);
                                //use the generated template to write the HTML file
                                writeHTMLfile(htmlFile);
                            }
                        });
                }
            });
};

//creathes the different employee objects and pushes them to the employees array
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

//writes the HTML file using a generated template
function writeHTMLfile(template){

    fs.writeFile('./output/team.html', template, (err) => {
        if (err) throw err;
        console.log('Successfully created team.html!');
      });
      
}

//generates the HTML template
function generateHTMLtemplate(array){
    // the top of the HTML template
    let htmlTop = 
        `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            <title>Team Profile</title>
          </head>
          <body>
        
            <style>
                html{
                    height: 100%;
                }
        
                body{
                    min-height: 100%;
                }

                #id4{
                    margin-top: 30px;
                }
                
                @media screen and (max-width: 991px){
                    #id3{
                        margin-top: 30px;
                    }
                }
        
                @media screen and (max-width: 767px){
                    #id2{
                        margin-top: 30px;
                    }
                }
            </style>
        
            <div class="jumbotron jumbotron-fluid text-white text-center bg-dark">
                <div class="container">
                  <h1 class="display-4">My Team</h1>
                </div>
            </div>
        
            <div class="container">
                <div class="row mb-5">
        `;
    //the end of the HTML template
    let htmlEnd = 
        `
                </div>
            </div>


            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </body>
        </html>
        `;

    //initialize the middle of the html as an empty template
    let htmlMiddle = ``;

    //will be used to store the full template
    let htmlFile;

    //an id for css styling
    let id = "";
    
    //cycles through each object in the employees array, generates the appropriate card,
    //and concatenates the card to the htmlMiddle variable
    for(var i = 0; i < array.length; i++){
        if (i<=1){
            id = "id2"
        } else if(i === 2) {
            id = "id3"
        } else {
            id = "id4"
        }

        if(array[i] instanceof Manager){
            htmlMiddle += generateManagerCard(array[i]); 
        } else if(array[i] instanceof Engineer){
            htmlMiddle += generateEngineerCard(array[i],id);
        } else if(array[i] instanceof Intern){
            htmlMiddle += generateInternCard(array[i],id);
        }
    }

    //concatenate the top, middle, and end templates into a single variable
    htmlFile = htmlTop + htmlMiddle + htmlEnd;

    //return the full template
    return htmlFile;
}

//generates an HTML card template for a Manager object
function generateManagerCard(manager){
    let managerCard = 
        `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <div class="card-header bg-danger text-white text-center">
                    <h3>${manager.name}</h3>
                    <h3><i class="fas fa-paste pr-1"></i>${manager.role}</h3>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${manager.id}</li>
                        <li class="list-group-item">Email: ${manager.email}</li>
                        <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
                    </ul>
                </div>
            </div>
        </div>   
        `;
    
    return managerCard;
}

//generates an HTML card template for an Engineer object
function generateEngineerCard(engineer, id){
    let engineerCard = 
        `
        <div class="col-12 col-md-6 col-lg-4" id="${id}">
            <div class="card">
                <div class="card-header bg-danger text-white text-center">
                    <h3>${engineer.name}</h3>
                    <h3><i class="fas fa-cogs pr-1"></i>${engineer.role}</h3>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${engineer.id}</li>
                        <li class="list-group-item">Email: ${engineer.email}</li>
                        <li class="list-group-item">GitHub: ${engineer.github}</li>
                    </ul>
                </div>
            </div>
        </div>   
        `;
    
    return engineerCard;
}

//generates and HTML card template for an Intern object
function generateInternCard(intern, id){
    let internCard = 
        `
        <div class="col-12 col-md-6 col-lg-4" id="${id}">
            <div class="card">
                <div class="card-header bg-danger text-white text-center">
                    <h3>${intern.name}</h3>
                    <h3><i class="fas fa-user-graduate pr-1"></i>${intern.role}</h3>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${intern.id}</li>
                        <li class="list-group-item">Email: ${intern.email}</li>
                        <li class="list-group-item">School: ${intern.school}</li>
                    </ul>
                </div>
            </div>
        </div>   
        `;
    
    return internCard;
}