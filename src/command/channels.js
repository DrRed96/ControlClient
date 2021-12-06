const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing Arguments";
    if (client.guilds.cache.get(args[1]) == undefined) throw "Failed to fetch guild";
    const guild = client.guilds.cache.get(args[1]);
    console.log(`${"[TYPE]".red} ${"[CATEGORY]".magenta} ${"[NAME]".blue} ${"[ID]".cyan}`)
    guild.channels.cache.filter(channel => channel.type != "category").forEach(channel => console.log(`${channel.type.red} ${channel.parent.name.magenta} ${channel.name.blue} ${channel.id.cyan}`));
}

module.exports = cmd;
