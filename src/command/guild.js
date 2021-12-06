const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing Arguments";
    if (client.guilds.cache.get(args[1]) == undefined) throw `Could not find user with ID "${args[1]}" in cached data`;
    const guild = client.guilds.cache.get(args[1]);

    console.log("Guild information".red);
    console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);
    console.log(`${"[ID]".blue} ${guild.id.white}`);
    console.log(`${"[Name]".blue} ${guild.name.white}`);
    console.log(`${"[Owner]".blue} ${`${guild.owner != null ? `${guild.owner.user.tag} (${guild.owner.user.id})` : "null"}`.white}`);
    console.log(`${"[Created]".blue} ${`${guild.createdAt.toUTCString()} (${guild.createdTimestamp.toString()})`.white}`);
    console.log(`${"[Description]".blue} ${`${guild.description != null ? guild.description : "null"}`.white}`);
    console.log(`${"[Verification Level]".magenta} ${guild.verificationLevel.toString().white}`);
    console.log(`${"[MFA Level]".magenta} ${guild.mfaLevel.toString().white}`);
    console.log(`${"[Explicit Content Filter]".magenta} ${guild.explicitContentFilter.white}`);
    console.log(`${"[Member Count]".magenta} ${guild.memberCount.toString().white}`);
    console.log(`${"[Large]".green} ${guild.large.toString().white}`);
    console.log(`${"[Server Boost Level]".magenta} ${guild.premiumTier.toString().white}`);
    console.log(`${"[Partnered]".green} ${guild.partnered.toString().white}`);
    console.log(`${"[Icon URL]".blue} ${guild.iconURL()}`);
}

module.exports = cmd;
