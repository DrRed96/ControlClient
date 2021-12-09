const Colors = require("colors");
const Discord = require("discord.js");
const ReadLine = require("readline");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 * @param {ReadLine.Interface} rl
 */
async function cmd(client, args, safemode, rl) {
    if (args.length < 2) {
        throw "Missing Arguments";
    }

    let _await = false;

    if (args.length > 2) {
        _await = args[2] === "true";
    }

    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid guild";
    const guild = client.guilds.cache.get(args[1]);
    if (guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) throw "The client must have Administrator to nuke a guild";

    rl.question(`${"WARNING".red} This will completley destroy a guild. Enter 'Yes' to nuke the guild`, (answer) => {
        if (answer.toLowerCase() === "yes") {

            const members = guild.members.cache.array();
            for (var m of members) {
                if (m.bannable) {
                    _await ? await m.ban() : m.ban();
                    console.log(`${m.user.tag.cyan} was banned`);
                }
            }

            const channels = guild.channels.cache.array();
            for (var c of channels) {
                if (c.deletable) {
                    _await ? await c.delete() : c.delete();
                    console.log(`${c.name.cyan} was deleated`);
                }
            }

        }
    });
}

module.exports = cmd;