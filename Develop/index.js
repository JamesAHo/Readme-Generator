// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// function to validate user input
function verifyInput(input) {
    if (input != "") {
        return true;
    } else {
        return "please answer current question";
    }
};
// License 
function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}
// TODO: Create an array of questions for user input
const questions = [
    
    {
        type: 'input',
        name: 'title',
        message: 'what is the title of your project?',
        validate: verifyInput,
    },
    // Description
    {
        type: 'input',
        name: 'Description',
        message: 'What is the project is about, please describe.',
        validate: verifyInput,
    },
// start table of content
    {
        type: 'input',
        name: 'installation',
        message: 'Provide instruction to install this app.',
        validate: verifyInput,
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'Please explain the use case for this project.',
        validate: verifyInput,
    },
    // License
    {
        type: 'list',
        name: 'license',
        message: 'Please choose a license for this project',
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
        ],
        validate: verifyInput,
    },
    // Contributes
    {
        type: 'input',
        name: 'contributing',
        message: 'Contributions !',
        validate: verifyInput,
    },
    // tests
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide testing intrusctions for this project.',
        validate: verifyInput,
    },
    // Github
    {
        type: 'input',
        name: 'userName',
        message: 'Please provide Github Username',
        validate: verifyInput,
    },
    // contacts
    {
        type: 'input',
        name: 'UserEmail',
        message: 'Please provide email for future contact.',
        validate: function (email) {
            // validate to check if email is valid
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            } else {
                return "Not a valid email address.";
            }
        }
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function(err) {
        if (err) {
            return console.log(err)
        }
    });
}
// TODO: Create a function to initialize app
function init() {
    // prompt the question and then log it as data
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data,null, " "));
        data.getLicense = getLicense(data.License);
        writeToFile("./fileCreated/README.md", data);
    })
}
// Function call to initialize app
init();
