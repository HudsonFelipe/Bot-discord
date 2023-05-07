import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";

const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    // para poder pegar a mensagem informada pelo usuario precisa desta linha
    // também é preciso autorizar na tela de criação do bot
    GatewayIntentBits.MessageContent,
  ],
});

fs.readdir("./Events", (err, file) => {
  file.forEach((fileName) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { default: event } = require(`./Events/${fileName}`);

    event(client);
  });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);

export default client;
