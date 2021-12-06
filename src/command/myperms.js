const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing Arguments";
    if (client.guilds.cache.get(args[1]).members.cache.get(client.user.id) === undefined) throw `Guild with ID '${args[1]}' not found in the client's cache`;
    const member = client.guilds.cache.get(args[1]).members.cache.get(client.user.id);
    console.log(`Permissions in '${client.guilds.cache.get(args[1]).name}'`.red);
    member.permissions.toArray(true).forEach(perm => {
        console.log(perm.cyan);
    });
}

module.exports = cmd;
