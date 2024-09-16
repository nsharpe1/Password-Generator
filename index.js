#!/usr/bin/env node

const process = require('node:process');
const crypto = require('crypto');

// Help message informing the user how to use the app
function printHelpMessage() {
    console.log('--length, -l: Provide a certain number length of the password by typing "npx password-generator --length `Number goes here`" (Note: If you type in a negative number length you will get an error message and the program wont generate the lowercase password  Also,  If password length number is not provided the password length number is automatically set to 8)');
    console.log('--eligible, eligible, -e: See the characters that are eligible for the password');
    console.log('--help, help -h: Show help message');
}

// Prints out the help message
const args = process.argv.slice(2);
if (args[0] == '--help' || args[0] == 'help' || args[0] == '-h') {
    printHelpMessage();
    return;
}

// Default password length
const DEFAULT_LENGTH = 8;

// Generating the lowercase letter and number password using default password length
let length = DEFAULT_LENGTH;

function generateLowerscasePassword(length) {
    const lettersandnumbers = '0123456789abcdefghijklmnopqrstuvwxyz';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomPassword = crypto.randomInt(0, lettersandnumbers.length);
        password += lettersandnumbers[randomPassword];
    }
    return password;
}

// Generating the lowercase letter and number password using a provided number password length
const lengthVaraible = args.indexOf('--length') !== -1 ? args.indexOf('--length') : args.indexOf('-l');
if (lengthVaraible !== -1 && args[lengthVaraible + 1]) {
    const lengthArg = parseInt(args[lengthVaraible + 1], 10);
    if (isNaN(lengthArg) || lengthArg <= 0) {
        console.error('Error: Password length number must be a positive number');
        printHelpMessage();
        process.exit(1);
    }
    length = lengthArg;
}

// Prints out the password created
const password = generateLowerscasePassword(length);
console.log(password);