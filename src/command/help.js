const Colors = require("colors");
const Discord = require("discord.js");

async function cmd() {
    console.log("User Interactivity".magenta);
    console.log(`${"No Command".blue} Send a message to the set User/Channel`);
    console.log(`${".addrole".blue} ${"<Guild ID> <Member ID> <Role ID>".cyan} give a role to a guild member`);
    console.log(`${".ban".blue} ${"<Guild ID> <User ID> <Days> [Reason]".cyan} ban a user from a guild`);
    console.log(`${".banall".blue} ${"<Guild ID>".cyan} ban every member in a guild`);
    console.log(`${".bans".blue} ${"<Guild ID>".cyan} Display all the banned members from a guild`);
    console.log(`${".changenick".blue} ${"<Guild ID> <Member ID> <Nick>".cyan} change a guild members nickname`);
    console.log(`${".channels".blue} ${"<Guild ID>".cyan} Display all the channels in a guild`);
    console.log(`${".delmsg".blue} ${"<Channel ID> <Message ID>".cyan} Delete a message`);
    console.log(`${".guilds".blue} ${"Shows what guilds the bot is in".white}`);
    console.log(`${".file".blue} ${"<File>".cyan} ${"Send a file".white}`);
    console.log(`${".kick".blue} ${"<Guild ID> <User ID> [Reason]".cyan} kick a user from a guild`);
    console.log(`${".kickall".blue} ${"<Guild ID>".cyan} kick every member in a guild`);
    console.log(`${".members".blue} ${"<Guild ID>".cyan} ${"Display all the members in a guild"}`);
    console.log(`${".myperms".blue} ${"<Guild ID>".cyan} ${"Display the permissions the client user has in a guild"}`);
    console.log(`${".nuke".blue} ${"<Guild ID>".cyan} completley destroy a server`);
    console.log(`${".removerole".blue} ${"<Guild ID> <Member ID> <Role ID>".cyan} remove a role from a guild member`);
    console.log(`${".setsender".blue} ${"<Channel/User ID>".cyan} Set a user/channel to send messages to`);
    console.log(`${".unban".blue} ${"<Guild ID> <User ID> [Reason]".cyan} unban a user from a guild`);
    console.log(`${".unbanall".blue} ${"<Guild ID>".cyan} unban all users from a guild`);

    console.log("\nAPI Viewing".magenta);
    console.log(`${".channel".blue} ${"<Channel ID>".cyan} Displays information about a Channel from the client's cache`);
    console.log(`${".guild".blue} ${"<Guild ID>".cyan} Displays information about a Guild from the client's cache`);
    console.log(`${".member".blue} ${"<Guild ID> <Member ID>".cyan} Displays information about a Member from the client's cache`);
    console.log(`${".user".blue} ${"<User ID>".cyan} Displays information about a User from the client's cache`);

    console.log("\nClient".magenta);
    console.log(`${".application".blue} Display information on the client application`);
    console.log(`${".changelog".blue} View the changelog`);
    console.log(`${".clear".blue} Clear the console`);
    console.log(`${".exit".blue} Exit the client`);
    console.log(`${".help".blue} Prints this message`);
    console.log(`${".info".blue} Display information about the client`);
    console.log(`${".loggingmode".blue} ${"<default/channel>".cyan} Change the message logging mode`);
    console.log(`${".repository".blue} Display the GitHub repository link`);
    console.log(`${".safemode".blue} Toggle safemode`);
    console.log(`${".safemodeison".blue} Display weather safemode is on`);
    console.log(`${".savemsg".blue} Save all logged messages in a file`);
}

module.exports = cmd;
