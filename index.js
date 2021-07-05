#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const clipboard = require('clipboardy')

const createPassword = require('./utils/createPassword')
const savePassword = require('./utils/savePassword')

const log = console.log

program.version('1.0.0').description('Command line password generator')

program
    .option('-l, --length <number>', 'length of password', '8') //command string (-l or --length), description for help dialogue, default value
    .option('-s, --save', 'save password to passwords.txt') //command string (-s or --save), option is a boolean so no default. Defaults to false. If flag set then value = true
    .option('-nn, --no-numbers', 'remove numbers from generated password') //command string (-nn or --no-numbers), defaults to true - ie numbers in generated password. If flag set then value = false
    .option('-ns, --no-symbols', 'remove symbols from generated password') //command string (-ns or --no-symbols), defaults to true - ie symbols in generated password. If flag set then value = false
    .parse()

    const {length, save, numbers, symbols} = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols)

// Save to file
if (save) {
    savePassword(generatedPassword)
}

// Copy to clipboard
clipboard.write(generatedPassword)

// Output generated password
log(chalk.green('Generated Password: ') + chalk.bold.green(generatedPassword))
log(chalk.yellow('Password copied to clipboard'))