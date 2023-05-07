const { Client, GatewayIntentBits } = require('discord.js');

const dotenv = require('dotenv');

dotenv.config();

const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    // para poder pegar a mensagem informada pelo usuario precisa desta linha
    // também é preciso autorizar na tela de criação do bot
    GatewayIntentBits.MessageContent
  ]
});

module.exports = client

const fs = require('fs');

fs.readdir('./Events', (err, file) => {
  file.forEach(event => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    require(`./Events/${event}`)
  })
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.login(TOKEN)