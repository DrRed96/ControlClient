const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {boolean} hidetoken 
 */
function cmd(client) {
    if (!client.user.bot) throw "Not using a bot account";
    client.fetchApplication().then(app => {
        console.log("Client Application Info".red);
        console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);
        console.log(`${"[ID]".blue} ${app.id}`);
        console.log(`${"[Name]".blue} ${app.name}`);
        console.log(`${"[Description]".blue} ${app.description}`);
        console.log(`${"[Created]".blue} ${app.createdAt.toUTCString()}`);
        console.log(`${"[Owner]".blue} ${app.owner.tag} (${app.owner.id})`);
        console.log(`${"[Bot Public]".green} ${app.botPublic}`);
        console.log(`${"[Bot Requires Code Grant]".green} ${app.botRequireCodeGrant}`);
        console.log(`${"[Icon URL]".blue} ${app.iconURL()}`);
    });
}

module.exports = cmd;
