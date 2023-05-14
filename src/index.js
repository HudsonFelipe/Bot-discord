import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";

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

const eventsDirectory = path.join(__dirname, "Events");

fs.readdir(eventsDirectory, (err, file) => {
  if (err) {
    console.error("Erro ao ler o diretório:", err);
    return;
  }

  file.forEach((fileName) => {
    const eventPath = path.join(eventsDirectory, fileName);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { default: event } = require(`${eventPath}`);

    event(client);
  });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);

export default client;
