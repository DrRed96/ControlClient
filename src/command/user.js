const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing Arguments";
    if (client.users.cache.get(args[1]) == undefined) throw `Could not find user with ID "${args[1]}" in cached data`;
    const user = client.users.cache.get(args[1]);

    console.log("User information".red);
    console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);
    console.log(`${"[ID]".blue} ${user.id.white}`);
    console.log(`${"[Tag]".blue} ${user.tag.white}`);
    console.log(`${"[Status]".blue} ${user.presence.status.white}`);
    console.log(`${"[Joined]".blue} ${`${user.createdAt.toUTCString()} (${user.createdTimestamp.toString()})`.white}`);
    console.log(`${"[Bot]".green} ${user.bot.toString().white}`);
    console.log(`${"[Avatar URL]".blue} ${user.avatarURL()}`);
}

module.exports = cmd;
