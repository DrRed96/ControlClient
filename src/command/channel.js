const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing Arguments";
    if (client.channels.cache.get(args[1]) == undefined) throw `Could not find channel with ID "${args[1]}" in cached data`;
    const channel = client.channels.cache.get(args[1]);

    console.log("Channel information".red);
    console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);
    console.log(`${"[Guild]".blue} ${`${channel.guild.name} (${channel.guild.id})`.white}`);
    console.log(`${"[ID]".blue} ${channel.id.white}`);
    console.log(`${"[Name]".blue} ${channel.name.white}`);
    console.log(`${"[Type]".blue} ${channel.type.white}`);
    console.log(`${"[Created]".blue} ${`${channel.createdAt.toUTCString()} (${channel.createdTimestamp.toString()})`.white}`);
    console.log(`${"[NSFW]".green} ${channel.nsfw.toString().white}`);
}

module.exports = cmd;
