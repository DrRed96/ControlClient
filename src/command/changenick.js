const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot change nickname with safemode active";
    if (args.length < 4) throw "Missing Arguments";
    if (client.guilds.cache.get(args[1] === undefined)) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);
    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid Member";
    const member = guild.members.cache.get(args[2]);
    if (!guild.members.cache.get(client.user.id).permissions.has("MANAGE_NICKNAMES")) throw "Invalid Permissions";
    let nick = args[3];
    for (var i = 4; i < args.length; i++) {
        nick += " ";
        nick += args[i];
    }
    member.setNickname(nick);
    console.log(`Set ${member.user.tag.cyan}'s nickname to ${nick.cyan} in ${guild.name.cyan}.`);
}

module.exports = cmd;
