const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot unban user with safemode active";
    if (args.length < 3) throw "Missing Arguments";

    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);

    if (client.users.cache.get(args[2]) === undefined) throw "Invalid User";
    const user = client.users.cache.get(args[2]);

    if (!guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) throw "Insufficiant Permissions";

    let banned = false;
    (await guild.fetchBans()).array().forEach(ban => {
        if (ban.user.id === user.id) {
            banned = true;
        }
    });
    if (banned === false) throw "User is not banned";

    let reason;
    if (args.length > 3) {
        reason = args[3];
        for (var i = 4; i < args.length; i++) {
            reason += / +/;
            reason += args[i];
        }
    }

    if (args.length > 3) guild.members.unban(user, reason);
    else guild.members.unban(user);
}

module.exports = cmd;
