#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
let playerName;
let points = 0;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('<<== CLI Question and Answer Program. ENJOY! ==>> \n');
    await sleep();
    rainbowTitle.stop();
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    You have 5 Questions.
    If you get any question wrong Your Score will ${chalk.bgRed('- 10')}
    If you answered right Your Score will         ${chalk.bgGreen('+ 10')}
    You will get your result in the END...
  `);
}
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: chalk.green(`Nice work ${playerName}. That's a legit answer\n`) });
        points += 10;
    }
    else {
        spinner.error({ text: chalk.red(`Your answer is wrong ${playerName}!\n`) });
        points -= 10;
    }
}
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });
    playerName = answers.player_name;
}
function winner() {
    console.clear();
    figlet(`${playerName} ! Your Result :  ${points}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
        console.log(chalk.green(`<<== Hey. You did it Great! ==>>`));
        process.exit(0);
    });
}
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who inaugurated the State Bank of Pakistan?\n',
        choices: [
            'Quaid-e-Azam',
            'Malik Ghulam Muhammad',
            'Liaquat Ali Khan',
            'Allama Muhammad Iqbal',
        ],
    });
    return handleAnswer(answers.question_1 === 'Quaid-e-Azam');
}
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'National code of Pakistan is?\n',
        choices: ['PAK', 'PK', 'PAK1', '+92'],
    });
    return handleAnswer(answers.question_2 === 'PK');
}
async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `When was the first Pakistani Postal Stamp issued?\n`,
        choices: ['August 1948', 'December 1947', 'February 1948', 'July 1948'],
    });
    return handleAnswer(answers.question_3 === 'July 1948');
}
async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Longest serving prime minister of Pakistan?\n',
        choices: [
            `Yousuf Raza Gillani`,
            `Mian Muhammad Nawaz Sharif`,
            `Liaquat Ali Khan`,
            `Muhammad Ali Bogra`,
        ],
    });
    return handleAnswer(answers.question_4 === 'Liaquat Ali Khan');
}
async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Which city is Called the Heart Of Pakistan?\n',
        choices: ['Karachi', 'Lahore', 'Faisalabad', 'Islamabad'],
    });
    return handleAnswer(answers.question_5 === 'Lahore');
}
// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
