require('dotenv').config();
const fs = require('fs');
const os = require('os');
const { Client, IntentsBitField } = require('discord.js');

// create a new client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,           // to know when changes are made to the server
        IntentsBitField.Flags.GuildMembers,     // gives access to the members of the server
        IntentsBitField.Flags.GuildMessages,    // gives access to the messages of the server
        IntentsBitField.Flags.MessageContent,   // allows the bot to read the content of the messages
    ],
});

// log to the console when the bot is switched on
client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`);
});

// handling the commands
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // executes for the 'ping' command
    if (interaction.commandName === 'info') {
        interaction.reply('**INFORMATION**\n');
    }

    // executes for the 'add-exam' command
    if (interaction.commandName === 'add-exam') {
        const course = interaction.options.get('course').value;
        const date = interaction.options.get('date').value;
        const time = interaction.options.get('time').value;
        const duration = interaction.options.get('duration').value;
        const location = interaction.options.get('location').value;

        const examData = [course, date, time, duration, location];

        const data = examData.join(',') + '\n';

        // append data to file
        fs.appendFile('exams.txt', data, 'utf8', (err) => {
            if (err) {
                interaction.reply('error');
            } else {
                interaction.reply('success.');
            }
        });
    }

    // executes for the 'exams' command
    if (interaction.commandName === 'exams') {
        const fileContents = fs.readFileSync('exams.txt', 'utf8');      // reads the content from the 'exams.txt.' file
        const lines = fileContents.split(/\r?\n/);                      // separates the content into lines

        let message = '';

        // loops through each line and replaces each comma with a space
        lines.forEach(line => {
            const modifiedLine = line.replace(/,/g, ' ');

            message += modifiedLine + '\n';                             // adds each line back together with a newline character at the end of each
        });

        interaction.reply(message);                                     // sends the messages to discord
    }
});

// login to the bot
client.login(process.env.TOKEN);