const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args, safemode) {
    if (safemode) throw "Cannot remove role with safemode active";
    if (args.length < 4) throw "Missing arguments";

    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid guild";
    const guild = client.guilds.cache.get(args[1]);

    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid member";
    const member = guild.members.cache.get(args[2]);

    if (guild.roles.cache.get(args[3]) === undefined) throw "Invalid role";
    const role = guild.roles.cache.get(args[3]);

    if (!member.roles.cache.has(args[3])) throw `${member.user.tag.cyan} doesn't have role ${role.name}`;
    member.roles.add(args[3]);
    console.log(`Removed the role ${role.name.cyan} from ${member.user.tag.cyan} in ${guild.name.cyan}`);
}

module.exports = cmd;
