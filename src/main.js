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
    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    // executes for the 'add-exam' command
    if (interaction.commandName === 'add-exam') {
        const course = interaction.options.get('course').value;
        const date = interaction.options.get('date').value;
        const time = interaction.options.get('time').value;
        const duration = interaction.options.get('duration').value;
        const location = interaction.options.get('location').value;

        const examData = [course, date, time, duration, location];

        // convert the array to a string
        const exams = JSON.stringify(examData);

        // write the array to the file
        const newline = os.EOL;
        fs.appendFile('exams.csv', exams + newline, 'utf-8', (err) => {
            if (err) {
                interaction.reply('error writing file', err);
            } else {
                interaction.reply('exam added successfully.');
            }
        });
    }

    // executes for the 'exams' command
    if (interaction.commandName === 'exams') {
        fs.readFile('exams.csv', 'utf8', (err, data) => {
            if (err) {
                interaction.reply('error reading file');
            } else {
                // read data from file
                const retreivedExams = JSON.parse(data);

                //convert it back into a string
                const retreivedExamsString = retreivedExams.join('            ');

                interaction.reply('**COURSE               DATE             TIME            LENGTH LOCATION**\n' + retreivedExamsString);
                console.log('' + retreivedExamsString);
            }
        });
    }
});

// login to the bot
client.login(process.env.TOKEN);