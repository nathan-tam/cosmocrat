require('dotenv').config();
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

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    if (interaction.commandName === 'add-exam') {
        const course = interaction.options.get('course').value;
        const date = interaction.options.get('date').value;
        const time = interaction.options.get('time').value;
        const duration = interaction.options.get('duration').value;
        const location = interaction.options.get('location').value;
    }
});

// login to the bot
client.login(process.env.TOKEN);