const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
function cmd(client, args, safemode) {
    if (safemode) throw "Cannot ban user with safemode active";
    if (args.length < 3) throw "Missing arguments";

    // Get Guild
    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);

    // Get Guild Member
    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid User";
    const member = guild.members.cache.get(args[2]);

    // Check if the user is bannable
    if (member.user.id === client.user.id) throw "You cannot kick yourself";
    if (!member.kickable) throw "Unnable to kick user";
                    
    let reason = null;

    if (args.length > 3) {
        reason = args[3];
        for (var i = 4; i < args.length; i++)
        {
            reason += / +/;
            reason += args[i];
        }
    }

    if (reason === null) {
        member.kick();
    } else {
        member.kick(reason);
    }

    console.log(`Banned ${member.user.tag.cyan} from ${guild.cyan}\n${"Time".cyan} ${args[3]} days\n${"Reason".cyan} ${reason}`);
}

module.exports = cmd;
