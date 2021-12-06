const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {string[]} args
 * @param {boolean} safemode
 */
function cmd(client, args, safemode) {
    if (safemode) throw "Cannot ban user with safemode active";
    if (args.length < 4) throw "Missing arguments";

    // Get Guild
    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
    const guild = client.guilds.cache.get(args[1]);

    // Get Guild Member
    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid User";
    const member = guild.members.cache.get(args[2]);

    // Check if the user is bannable
    if (member.user.id === client.user.id) throw "You cannot ban yourself";
    if (!member.bannable) throw "Unnable to ban user";
                    
    let reason = null;

    if (args.length > 4) {
        reason = args[4];
        for (var i = 5; i < args.length; i++)
        {
            reason += / +/;
            reason += args[i];
        }
    }

    if (reason === null) {
        if (Number(args[3]) === 0) {
            member.ban();
        } else {
            member.ban({ days: Number(args[3]) });
        }
    } else {
        if (Number(args[3]) === 0) {
            member.ban({ reason: reason });
        } else {
            member.ban({ days: Number(args[3]), reason: reason });
        }
    }

    console.log(`Banned ${member.user.tag.cyan} from ${guild.cyan}\n${"Time".cyan} ${args[3]} days\n${"Reason".cyan} ${reason}`);
}

module.exports = cmd;
