const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot delete message with safemode active";
    if (args.length < 3) throw "Missing Arguments";
    const channel = client.channels.cache.get(args[1]);
    const message = await channel.messages.fetch(args[2]);
    if (message == undefined) throw "Failed to get message";
    if (channel.guild.members.cache.find(member => member.user == client.user).hasPermission("MANAGE_MESSAGES") || channel.guild.members.cache.find(member => member.user == client.user).hasPermission("ADMINISTRATOR")) {
        message.delete();
    } else {
        throw "Invalid permissions";
    }
}

module.exports = cmd;
