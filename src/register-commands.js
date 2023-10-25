require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// define the commands
const commands = [
    {
        name: 'add-exam',                                       // defining the add-exam command                       
        description: 'adds an exam to the schedule',
        options: [
            {
                name: 'course',
                description: 'the course code [ABC 1234]',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'NET 3000',
                        value: 'NET 3000',
                    },
                    {
                        name: 'NET 3004',
                        value: 'NET 3004',
                    },
                    {
                        name: 'NET 3007',
                        value: 'NET 3007',
                    },
                    {
                        name: 'NET 3008',
                        value: 'NET 3008',
                    },
                    {
                        name: 'NET 3900',
                        value: 'NET 3900',
                    },
                ],
            },
            {
                name: 'date',
                description: 'the date of the exam [MMM D]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'time',
                description: 'the start time of the exam [0:00 xM]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'duration',
                description: 'the duration of the exam [x hr]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'location',
                description: 'the location of the exam [AB 123]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'exams',                                          // defining the exams command
        description: 'displays the exams in the schedule'
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// function that registers the commands
(async () => {
    try {
        console.log('registering commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('commands registered successfully');
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
})();