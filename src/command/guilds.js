const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client) {
    if (client.guilds.cache.size == 0) {
        console.log("This Bot/User isn't in any guilds".red);
    } else {
        client.guilds.cache.forEach(guild => console.log(`${guild.name.blue} ${guild.id.cyan}`));
    }
}

module.exports = cmd;
