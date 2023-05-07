export default (client) => {
  client.on("messageCreate", (interaction) => {
    try {
      // estamos verificando se é um link
      const url = new URL(interaction.content);

      // verificamos se o usuario é do cargo que permiti mandar link no servidor
      // eslint-disable-next-line no-underscore-dangle
      if (url && interaction.member._roles.includes("1103837213755715654")) {
        console.log("ola");
      } else {
        interaction.delete();
      }
    } catch (err) {
      console.log("não é link");
    }

    if (interaction.content === "ping") {
      interaction.reply("pong");
    }
  });
};
