const inquirer = require('inquirer');
const SVG = require('@svgdotjs/svg.js');
const fs = require('fs');

// Prompt the user for input
inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => input.length <= 3,
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color keyword or hexadecimal number for the text:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color keyword or hexadecimal number for the shape:',
  },
])
.then((answers) => {
  // Create the SVG image
  const svg = SVG().size(300, 200);
  const shape = svg[answers.shape]().fill(answers.shapeColor);
  const text = svg.text(answers.text).fill(answers.textColor).cx(150).cy(100);

  // Save the SVG file
  fs.writeFileSync('logo.svg', svg.svg());

  // Print the message to the command line
  console.log('Generated logo.svg');
});