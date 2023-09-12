const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the manager's employee ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
        }
    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager);
        menu();
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the engineer's employee ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the engineer's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github",
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        team.push(engineer);
        menu();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the intern's employee ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the intern's school?",
            name: "school",
        }
    ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        menu();
    });
}

function buildTeam() {
    const html = render(team);
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, html);
    console.log(`Team profile has been generated at ${outputPath}`);
}

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "Add an engineer",
                "Add an intern",
                "Finish building the team"
            ]
        }
    ]).then(answer => {
        switch (answer.choice) {
            case "Add an engineer":
                addEngineer();
                break;
            case "Add an intern":
                addIntern();
                break;
            case "Finish building the team":
                buildTeam();
                break;
            default:
                break;
        }
    });
}

addManager();

