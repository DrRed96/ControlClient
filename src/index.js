/**
 * Discord Control Bot
 * Made by The Hacker
 */

// Packages
const Colors = require("colors");
const allowUserBotting = require("discord.js.userbot");
const Discord = require("discord.js");
const { exec } = require("child_process");
const fs = require("fs");
const Readline = require("readline");

// Create I/O Stream Object
const rl = new Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create Discord Client
const client = new Discord.Client({disableEveryone: false});

// Commands
const cmd_file = require("./command/file");
const cmd_delmsg = require("./command/delmsg");
const cmd_ban = require("./command/ban");
const cmd_banall = require("./command/banall");
const cmd_unban = require("./command/unban");
const cmd_unbanall = require("./command/unbanall");
const cmd_changenick = require("./command/changenick");
const cmd_addrole = require("./command/addrole");
const cmd_removerole = require("./command/removerole");
const cmd_myperms = require("./command/myperms");
const cmd_bans = require("./command/bans");
const cmd_channels = require("./command/channels");
const cmd_guilds = require("./command/guilds");
const cmd_roles = require("./command/roles");
const cmd_members = require("./command/members");
const cmd_kickall = require("./command/kickall");
const cmd_channel = require("./command/channel");
const cmd_guild = require("./command/guild");
const cmd_member = require("./command/member");
const cmd_user = require("./command/user");
const cmd_changelog = require("./command/changelog");
const cmd_savemsg = require("./command/savemsg");
const cmd_help = require("./command/help");
const cmd_info = require("./command/info");
const cmd_application = require("./command/application");

// Variables
let hidetoken = false;
let safemode = false;
let loaded = false;
let sender;
let sendertype;
let messages = [];
let loggingMode = "default";

// When Discord Client is Ready
client.on("ready", () => {
    for (var i = 4; i < process.argv.length; i++) {
        if (process.argv[i] === "--hidetoken") hidetoken = true;
        if (process.argv[i] === "--safemode") safemode = true;
    }
    console.clear();
    cmd_info(client, hidetoken);
    loaded = true;
});

// When text is inputted
rl.on("line",
/**
 * @param {string} input
 */
async (input) => {
    const args = input.toLowerCase().split(/ +/);

    if (!loaded) {
        if (input.startsWith(".")) {
            if (args[0] === ".exit") {
                process.exit();
            }
            console.log("Please wait until the client has loaded before doing this.");
        }

        return;
    }

    try {
        // Commands
        if (input.startsWith(".")) {
            // I put all the commands in one file because I'm lazy and it's just easier this way
            switch (args[0])
            {
                // Bot Interactivity
                case ".setsender": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.channels.cache.get(args[1]) != undefined) {
                        sender = client.channels.cache.get(args[1]);
                        sendertype = "channel";
                        console.log(`Channel set to ${sender.name.cyan} in ${sender.guild.name.cyan}\n`);
                    } else if (client.users.cache.get(args[1]) != undefined) {
                        sender = client.users.cache.get(args[1]);
                        sendertype = "user";
                        console.log(`User set to ${sender.tag.cyan}\n`);
                    } else {
                        throw "Sender not found";
                    }
                } break;
                    
                case ".file":
                cmd_file(sender, args, safemode);
                break;
                
                case ".delmsg": 
                cmd_delmsg(client, args, safemode);
                break;

                case ".ban":
                cmd_ban(client, args, safemode);
                break;

                case ".banall":
                cmd_banall(client, args, safemode);
                break;

                case ".unban":
                cmd_unban(client, args, safemode);
                break;

                case ".unbanall":
                cmd_unbanall(client, args, safemode);
                break;

                case ".changenick":
                cmd_changenick(client, args, safemode);
                break;

                case ".addrole":
                cmd_addrole(client, args, safemode);
                break;

                case ".rmrole":
                case ".removerole":
                cmd_removerole(client, args, safemode);
                break;

                case ".myperms":
                cmd_myperms(client, args);
                break;

                case ".bans":
                cmd_bans(client, args);
                break;

                case ".channels":
                cmd_channels(client, args);
                break;
                
                case ".guilds":
                cmd_guilds(client);
                break;
                
                case ".roles":
                cmd_roles(client, args);
                break;

                case ".members":
                cmd_members(client, args);
                break;
                
                case ".kickall":
                cmd_kickall(client, args);
                break;

                // API Viewing
                case ".channel":
                cmd_channel(client, args);
                break;

                case ".guild":
                cmd_guild(client, args);
                break;

                case ".member":
                cmd_member(client, args);
                break;

                case ".user":
                cmd_user(client, args);
                break;                   

                // Client
                case ".safemode": {
                    if (safemode) safemode = false;
                    else safemode = true;
                    console.log(`Safemode set to ${safemode ? "true".green : "false".red}`);
                } break;

                case ".safemodeison": {
                    if (safemode) safemode = false;
                    else safemode = true;
                    console.log(`Safemode is set to ${safemode ? "true".green : "false".red}`);
                } break;

                case ".changelog":
                cmd_changelog();
                break;

                case ".clear": {
                    console.clear();
                    exec("clear", (err, stdout, stderr) => {
                        if (err) throw `${err}`;
                    });
                } break;

                case ".loggingmode": {
                    if (args.length < 2) throw "Missing arguments";
                    switch (args[1]) {
                        case "default":
                            console.log(`Messaging logging set to ${"default".cyan}`);
                            loggingMode = "default";
                            break;

                        case "channel":
                            console.log(`Messaging logging set to ${"channel".cyan}`);
                            loggingMode = "channel";
                            break;

                        default:
                            throw "Invalid type";
                            break;
                    }
                } break;

                case ".repo":
                case ".repository":
                console.log("https://github.com/DrRed96/ControlClient.git".blue.underline);
                break;

                case ".savemsg": 
                cmd_savemsg(messages);
                break;

                case ".?":
                case ".help":
                cmd_help();
                break;

                case ".info":
                cmd_info(client, hidetoken)
                break;

                case ".app":
                case ".application":
                cmd_application(client);
                break;

                case ".exit":
                process.exit();
                break;

                default: throw "Unknown command. Type \".help\" for the list of commands";
            }
        } else {
            if (safemode) throw "Cannot send message with safemode active";
            if (sender === undefined) throw "Undefined sender";
            if (input === "") throw "Cannot send empty message";

            input = input.split("\\n").join("\n");
            input = input.split("\\t").join("\t");
            sender.send(input);
        }
    } catch (err) {
        console.error(`Error: ${err}.`.black.bgRed);
    }
});

// When message is sent
client.on("message", async (message) => {
    try {
        if (message.type !== "DEFAULT") return;                                                                 // Message type check
        const displayContent = message.content.white.split("\n").join("\\n".gray).split("\t").join("\\t".gray); // Handle new lines and tabs
        if (message.author.id === client.user.id)
        {
            if (sendertype === "channel" && (loggingMode === "default" || loggingMode === "channel")) {
                if (message.channel.type === "text") {
                    if (message.channel.guild.id === sender.guild.id) {
                        console.log(`${`(${sender.guild.name} | ${message.channel.name})`.magenta} ${`[${message.author.tag}]`.green} ${displayContent}`);
                        messages.push(`${`(${sender.guild.name} | ${message.channel.name})`} ${`[${message.author.tag}]`} ${message.content.split("\n").join("\\n").split("\t").join("\\t")}`)
                    }
                }
            }
            if (message.channel.type === "dm") {
                console.log(`${"(To)".magenta} ${`[${sender.tag}]`.cyan} ${displayContent}`);
                messages.push(`${"(To)"} ${`[${sender.tag}]`} ${message.content.split("\n").join("\\n").split("\t").join("\\t")}`)
            }
        } else {
            if (sendertype === "channel" && (loggingMode === "default" || loggingMode === "channel")) {
                if (message.channel.type === "text") {
                    if (message.channel.guild.id === sender.guild.id) {
                        let tag;
                        if (message.author.bot) {
                            tag = `[${message.author.tag}]`.gray;
                        } else if (message.member.hasPermission("ADMINISTRATOR")) {
                            tag = `[${message.author.tag}]`.red;
                        } else if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("BAN_MEMBERS")) {
                            tag = `[${message.author.tag}]`.yellow;
                        } else {
                            tag = `[${message.author.tag}]`.cyan;
                        }

                        console.log(`${`(${sender.guild.name} | ${message.channel.name})`.magenta} ${tag} ${displayContent}`);
                        messages.push(`${`(${sender.guild.name} | ${message.channel.name})`} [${message.author.tag}] ${message.content.split("\n").join("\\n").split("\t").join("\\t")}`)
                    }
                }
            }
            if (message.channel.type === "dm") {
                console.log(`${"(From)".magenta} ${`[${message.author.tag}]`.cyan} ${displayContent}`);
                messages.push(`${"(From)"} ${`[${message.author.tag}]`} ${message.content.split("\n").join("\\n").split("\t").join("\\t")}`);
            }
        }
    } catch (err) {
        console.error(`Error: ${err}.`.black.bgRed);
    }
});

if (process.argv[2] == "user") allowUserBotting(client, "../");
client.login(`${process.argv[3]}`).catch(err => {
    console.error("Token is invalid".black.bgRed);
    process.exit();
});
