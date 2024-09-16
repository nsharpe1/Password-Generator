#!/usr/bin/env node

const process = require('node:process');
const crypto = require('crypto');

// Help message informing the user how to use the app
function printHelpMessage() {
    console.log('--length, -l: Provide a certain number length of the password by typing "npx password-generator `--length or -l` <Number goes here>" (Note: If password length number is not provided the password length number is automatically set to 8)');
    console.log('--eligible, eligible, -e: See the characters that are eligible for the password');
    console.log('--help, help -h: Show help message');
}

// Prints out the help message
const args = process.argv.slice(2);
if (args[0] == '--help' || args[0] == 'help' || args[0] == '-h') {
    printHelpMessage();
    return;
}

// Eligible characters message to inform the user what is used in there password creation
function printEligibilityCharactersMessage() {
    console.log('All lowercase letters are eligible  the password and also every number is eligible for the password as well');
}

// Prints out the eligibility message
if (args[0] == '--eligible' || args[0] == 'eligible' || args[0] == '-e') {
    printEligibilityCharactersMessage();
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