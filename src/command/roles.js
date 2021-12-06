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
    if (client.guilds.cache.get(args[1]).roles.cache.array() == undefined) throw "Failed to fetch roles";
    const roles = client.guilds.cache.get(args[1]).roles.cache.array();
    console.log(`Role list in '${client.guilds.cache.get(args[1]).name}'`.red);
    console.log(`${"ROLE".magenta} ${"ID".blue} ${"PERMISSIONS".cyan}`);
    roles.forEach(role => {
        console.log(`${role.name.magenta} ${role.id.blue}`);
        role.permissions.toArray(true).forEach(perm => {
            console.log(perm.cyan);
        });
        console.log("\n");
    });
}

module.exports = cmd;
