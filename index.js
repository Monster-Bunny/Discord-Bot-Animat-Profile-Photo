const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Create a new client instance with all intents enabled
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Upload an animated avatar
    const avatarPath = path.join(__dirname, 'gif.gif');
    fs.readFile(avatarPath, (err, data) => {
        if (err) {
            return console.error('Failed to read avatar file:', err);
        }
        client.user.setAvatar(data)
            .then(() => console.log('Avatar uploaded successfully!'))
            .catch(console.error);
    });
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!Recap')) {
        await message.channel.send('Hey! Invite Recap to your server. https://discord.com/invite/EUdKJZs8rX');
    }
});

// Load the bot token and log in
const tokenPath = path.join(__dirname, 'bot_token.txt');
fs.readFile(tokenPath, 'utf8', (err, token) => {
    if (err) {
        console.error('Bot token file not found, please enter your bot token:');
        process.exit(1);
    }
    client.login(token.trim()).catch(console.error);
});
