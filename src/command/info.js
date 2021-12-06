const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {boolean} hidetoken 
 */
async function cmd(client, hidetoken) {
    console.log(`${"Discord Control Client version 120721".magenta} - made by ${"Cal (DrRed96)".red}`);
    console.log(`${"[Username]".green} ${client.user.tag}`);
    console.log(`${"[User ID]".green} ${client.user.id}`);
    if (!hidetoken) console.log(`${"[Token]".green} ${client.token}`);
    console.log(`${"[Bot?]".green} ${client.user.bot}`);
    console.log(`${"[Gateway]".green} ${client.ws.gateway}`);
    console.log(`${"[Ping]".green} ${client.ws.ping}`);
    console.log(`For more info type ${".help".cyan}`);
}

module.exports = cmd;
