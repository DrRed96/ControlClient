const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot kick members with safemode active";
    if (args.length < 2) throw "Missing Arguments";

    if (client.guilds.cache.get(args[1]) == undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);
    if (!guild.members.cache.get(client.user.id).hasPermission("KICK_MEMBERS")) throw "Insufficiant Permissions";
    const members = guild.members.cache.array();

    for (var i = 0; i < members.length; i++) {
        if (members[i].bannable) {
            members[i].ban();
            console.log(`${members[i].user.tag.cyan} was kicked`);
        }
    }
}

module.exports = cmd;
