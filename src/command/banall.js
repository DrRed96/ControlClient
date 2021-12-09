const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot ban members with safemode active";
    if (args.length < 3) throw "Missing Arguments";

    const _await = (args[2] == "true" ? true : false);

    if (client.guilds.cache.get(args[1]) == undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);
    if (!guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) throw "Insufficiant Permissions";
    const members = guild.members.cache.array();

    for (var m of members) {
        if (m.bannable) {
            _await ? await m.ban() : m.ban();
            console.log(`${m.user.tag.cyan} was banned`);
        }
    }
}

module.exports = cmd;
