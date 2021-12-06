const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot unban user with safemode active";
    if (args.length < 2) throw "Missing Arguments";

    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);

    if (!guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) throw "Insufficiant Permissions";

    (await guild.fetchBans()).array().forEach(ban => {
        guild.members.unban(ban.user);
        console.log(`Unbanned ${ban.user.name} ${`(${ban.user.id})`}`);
    });
}

module.exports = cmd;
