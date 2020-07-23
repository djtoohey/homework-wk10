const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { captureRejectionSymbol } = require("events");

const employees = [];

const managerQuestions = [
    {
        name: "name",
        type: "input",
        message: "Manager's Name: ",
    },
    {
        name: "id",
        type: "input",
        message: "Manager's ID: ",
    },
    {
        name: "email",
        type: "input",
        message: "Manager's email: ",
    },
    {
        name: "officeNumber",
        type: "input",
        message: "Manager's Office Number: ",

    }
]



function init() {
    inquirer.prompt(managerQuestions).then(function ({ name, id, email, officeNumber }) {
        const manager = new Manager(name, id, email, officeNumber);

        employees.push(manager);

        createTeam();

    })
}

const teamQuestions = [
    {
        name: "confirm",
        type: "list",
        message: "Add an employee: (or select Finished if done adding employees) ",
        choices: [
            "Engineer",
            "Intern",
            "Finished"
        ]
    }
]

function createTeam() {
    inquirer.prompt(teamQuestions).then(function ({ confirm }) {
        if (confirm === "Engineer") {
            createEngineer();
        }
        else if (confirm === "Intern") {
            createIntern();
        }
        else {
            finishTeam();
        }
    })
}

const engiQuestions = [
    {
        name: "name",
        type: "input",
        message: "Engineer's Name: ",
    },
    {
        name: "id",
        type: "input",
        message: "Engineer's ID: ",
    },
    {
        name: "email",
        type: "input",
        message: "Engineer's email: ",
    },
    {
        name: "github",
        type: "input",
        message: "Github account: ",

    }
]

function createEngineer() {
    inquirer.prompt(engiQuestions).then(function ({ name, id, email, github }) {
        const engi = new Engineer(name, id, email, github);

        employees.push(engi);

        createTeam();
    })
}

const internQuestions = [

    {
        name: "name",
        type: "input",
        message: "Intern's Name: ",
    },
    {
        name: "id",
        type: "input",
        message: "Intern's ID: ",
    },
    {
        name: "email",
        type: "input",
        message: "Intern's email: ",
    },
    {
        name: "school",
        type: "input",
        message: "School: ",

    }
]
function createIntern() {
    inquirer.prompt(internQuestions).then(function ({ name, id, email, school }) {
        const intern = new Intern(name, id, email, school);

        employees.push(intern);

        createTeam();
    })
}

function finishTeam() {
    const htmlData = render(employees);

    fs.writeFile(outputPath, (htmlData), (err) => {
        if (err) throw err;
        console.log("Ctrl + click -> output/team.html to see your file!");

    })
}
init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
