const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(client, args) {
    if (args.length < 2) throw "Missing arguments";
    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid guild";
    const guild = client.guilds.cache.get(args[1]);

    console.log(`Members in ${guild.name} (${guild.memberCount})`.red);
    if (guild.members.cache.array()[0].user === null) throw "Unable to get members";
    const members = guild.members.cache.array();
    if (members.length <= 500) {
        members.forEach(member => {
            if (member.user.id === client.user.id) console.log(`${member.user.tag.green} ${member.user.id}`);
            else if (guild.owner.user.id === member.user.id) console.log(`${member.user.tag.red} ${member.user.id}`);
            else if (member.user.bot) console.log(`${member.user.tag.gray} ${member.user.id}`);
            else if (member.hasPermission("ADMINISTRATOR")) console.log(`${member.user.tag.yellow} ${member.user.id}`);
            else (console.log(`${member.user.tag.blue} ${member.user.id}`));
        });
    } else {
        let membersArray = [];
        members.forEach(member => {
            if (member.user.id === client.user.id) membersArray.push(`${member.user.tag.green} ${member.user.id}`);
            else if (guild.owner.user.id === member.user.id) membersArray.push(`${member.user.tag.red} ${member.user.id}`);
            else if (member.user.bot) membersArray.push(`${member.user.tag.gray} ${member.user.id}`);
            else if (member.hasPermission("ADMINISTRATOR")) membersArray.push(`${member.user.tag.yellow} ${member.user.id}`);
            else membersArray.push(`${member.user.tag.blue} ${member.user.id}`);
        });
        console.log(membersArray.join(", ".grey));
    }
}

module.exports = cmd;
