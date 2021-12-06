const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 3) throw "Missing Arguments";
    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    if (client.guilds.cache.get(args[1]).members.cache.get(args[2]) === undefined) throw "Invalid User";
    const member = client.guilds.cache.get(args[1]).members.cache.get(args[2]);

    console.log("Guild Member Information".red);
    console.log(`${"[String]".blue} ${"[Number]".magenta} ${"[Boolean]".green}`);
    console.log(`${"[ID]".blue} ${member.user.id}`);
    console.log(`${"[Tag]".blue} ${member.user.tag}`);
    console.log(`${"[Permissions]".magenta} ${member.permissions.toArray().join(", ".gray)}`);
    let roleNames = [];
    member.roles.cache.array().forEach(role => {
        roleNames.push(role.name);
    });
    console.log(`${"[Roles]".blue} ${roleNames.join(", ".gray)}`);
    console.log(`${"[Bannable]".green} ${member.bannable}`);
}

module.exports = cmd;
