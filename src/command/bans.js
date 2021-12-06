const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing arguments";
    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);
    const bans = (await guild.fetchBans()).array();
    console.log(`${guild.name}'s ban list`.red);
    bans.forEach(ban => {
        console.log(`${ban.user.tag.blue} ${ban.user.id.cyan} ${ban.reason}`);
    });
}

module.exports = cmd;
