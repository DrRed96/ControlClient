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

let hidetoken = false;
let safemode = false;
let loaded = false;
let sender;
let sendertype;
let messages = [];
let loggingMode = "default";

// When Discord Client is Ready
client.on("ready",
() => {
    for (var i = 4; i < process.argv.length; i++) {
        if (process.argv[i] === "--hidetoken") hidetoken = true;
        if (process.argv[i] === "--safemode") safemode = true;
    }
    console.clear();
    console.log("The developers will not be held responsable for any malicious use of this program".black.bgRed);
    console.log(`${"Discord Control Client".magenta} - made by ${"Cal (DrRed96)".red} with Node.js ${"https://nodejs.org/".blue}`);
    console.log(`${"[Username]".green} ${client.user.tag}`);
    console.log(`${"[User ID]".green} ${client.user.id}`);
    if (!hidetoken) console.log(`${"[Token]".green} ${client.token}`);
    console.log(`${"[Bot?]".green} ${client.user.bot}`);
    console.log(`${"[Gateway]".green} ${client.ws.gateway}`);
    console.log(`${"[Ping]".green} ${client.ws.ping}`);
    console.log(`For more info type ${".help".cyan}`);
    loaded = true;
});

// When text is inputted
rl.on("line",
/**
 * @param {string} input
 */
async (input) => {
    const args = input.split(/ +/);

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
                    
                case ".file": {
                    if (safemode) throw "Cannot send message with safemode active";
                    if (sender === undefined) throw "Undefined sender";
                    if (args.length < 2) throw "Missing Arguments";
                    sender.send("", {files: [args[1]]});
                    console.log("\n");
                } break;
                
                case ".delmsg": {
                    if (safemode) throw "Cannot delete message with safemode active";
                    if (args.length < 3) throw "Missing Arguments";
                    const channel = client.channels.cache.get(args[1]);
                    const message = await channel.messages.fetch(args[2]);
                    if (message == undefined) throw "Failed to get message";
                    if (channel.guild.members.cache.find(member => member.user == client.user).hasPermission("MANAGE_MESSAGES") || channel.guild.members.cache.find(member => member.user == client.user).hasPermission("ADMINISTRATOR")) {
                        message.delete();
                    } else {
                        throw "Invalid permissions";
                    }
                } break;

                case ".ban": {
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
                    if (!member.bannable()) throw "Unnable to ban user";
                    
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

                    console.log(`Banned ${member.user.tag.cyan} from ${guild.cyan}\n${"Time".cyan} ${args[3]} days\n
                    ${"Reason".cyan} ${reason}`);

                } break;

                case ".unban": {
                    if (safemode) throw "Cannot unban user with safemode active";
                    if (args.length < 3) throw "Missing Arguments";

                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
                    const guild = client.guilds.cache.get(args[1]);

                    if (client.users.cache.get(args[2]) === undefined) throw "Invalid User";
                    const user = client.users.cache.get(args[2]);

                    if (!guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) throw "Insufficiant Permissions";

                    let banned = false;
                    (await guild.fetchBans()).array().forEach(ban => {
                        if (ban.user.id === user.id) {
                            banned = true;
                        }
                    });
                    if (banned === false) throw "User is not banned";

                    let reason;
                    if (args.length > 3) {
                        reason = args[3];
                        for (var i = 4; i < args.length; i++) {
                            reason += / +/;
                            reason += args[i];
                        }
                    }

                    if (args.length > 3) guild.members.unban(user, reason);
                    else guild.members.unban(user);
                } break;

                case ".unbanall": {
                    if (safemode) throw "Cannot unban user with safemode active";
                    if (args.length < 2) throw "Missing Arguments";

                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
                    const guild = client.guilds.cache.get(args[1]);

                    if (!guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) throw "Insufficiant Permissions";

                    (await guild.fetchBans()).array().forEach(ban => {
                        guild.members.unban(ban.user);
                        console.log(`Unbanned ${ban.user.name} ${`(${ban.user.id})`}`);
                    });
                } break;

                case ".changenick": {
                	if (safemode) throw "Cannot change nickname with safemode active";
                    if (args.length < 4) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1] === undefined)) throw "Invalid Guild";
                    const guild = client.guilds.cache.get(args[1]);
                    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid Member";
                    const member = guild.members.cache.get(args[2]);
                    if (!guild.members.cache.get(client.user.id).permissions.has("MANAGE_NICKNAMES")) throw "Invalid Permissions";
                    let nick = args[3];
                    for (var i = 4; i < args.length; i++) {
                        nick += " ";
                        nick += args[i];
                    }
                    member.setNickname(nick);
                    console.log(`Set ${member.user.tag.cyan}'s nickname to ${nick.cyan} in ${guild.name.cyan}.`);
                } break;

                case ".addrole": {
                    if (safemode) throw "Cannot add role with safemode active";
                    if (args.length < 4) throw "Missing arguments";

                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid guild";
                    const guild = client.guilds.cache.get(args[1]);

                    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid member";
                    const member = guild.members.cache.get(args[2]);

                    if (guild.roles.cache.get(args[3]) === undefined) throw "Invalid role";
                    const role = guild.roles.cache.get(args[3]);

                    if (member.roles.cache.has(args[3])) throw `${member.user.tag.cyan} already has role ${role.name}`;
                    member.roles.add(args[3]);
                    console.log(`Gave ${member.user.tag.cyan} the role ${role.name.cyan} in ${guild.name.cyan}`);
                } break;

                case ".rmrole":
                case ".removerole": {
                    if (safemode) throw "Cannot remove role with safemode active";
                    if (args.length < 4) throw "Missing arguments";

                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid guild";
                    const guild = client.guilds.cache.get(args[1]);

                    if (guild.members.cache.get(args[2]) === undefined) throw "Invalid member";
                    const member = guild.members.cache.get(args[2]);

                    if (guild.roles.cache.get(args[3]) === undefined) throw "Invalid role";
                    const role = guild.roles.cache.get(args[3]);
                    
                    if (!member.roles.cache.has(args[3])) throw `${member.user.tag.cyan} doesn't have role ${role.name}`;
                    member.roles.add(args[3]);
                    console.log(`Removed the role ${role.name.cyan} from ${member.user.tag.cyan} in ${guild.name.cyan}`);
                } break;

                case ".myperms": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1]).members.cache.get(client.user.id) === undefined) throw `Guild with ID '${args[1]}' not found in the client's cache`;
                    const member = client.guilds.cache.get(args[1]).members.cache.get(client.user.id);
                    console.log(`Permissions in '${client.guilds.cache.get(args[1]).name}'`.red);
                    member.permissions.toArray(true).forEach(perm => {
                        console.log(perm.cyan);
                    });
                } break;

                case ".bans": {
                    if (args.length < 2) throw "Missing arguments";
                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
                    const guild = client.guilds.cache.get(args[1]);
                    const bans = (await guild.fetchBans()).array();
                    console.log(`${guild.name}'s ban list`.red);
                    bans.forEach(ban => {
                        console.log(`${ban.user.tag.blue} ${ban.user.id.cyan} ${ban.reason}`);
                    });
                } break;

                case ".channels": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1]) == undefined) throw "Failed to fetch guild";
                    const guild = client.guilds.cache.get(args[1]);
                    console.log(`${"[TYPE]".red} ${"[CATEGORY]".magenta} ${"[NAME]".blue} ${"[ID]".cyan}`)
                    guild.channels.cache.filter(channel => channel.type != "category").forEach(channel => console.log(`${channel.type.red} ${channel.parent.name.magenta} ${channel.name.blue} ${channel.id.cyan}`));
                } break;
                
                case ".guilds": {
                    if (client.guilds.cache.size == 0) {
                        console.log("This Bot/User isn't in any guilds".red);
                    } else {
                        client.guilds.cache.forEach(guild => console.log(`${guild.name.blue} ${guild.id.cyan}`));
                    }
                } break;
                
                case ".roles": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1]) == undefined) throw "Failed to fetch guild";
                    if (client.guilds.cache.get(args[1]).roles.cache.array() == undefined) throw "Failed to fetch roles";
                    const roles = client.guilds.cache.get(args[1]).roles.cache.array();
                    console.log(`Role list in '${client.guilds.cache.get(args[1]).name}'`.red);
                    console.log(`${"ROLE".magenta} ${"ID".blue} ${"PERMISSIONS".cyan}`);
                    roles.forEach(role => {
                        console.log(`${role.name.magenta} ${role.id.blue}`);
                        role.permissions.toArray(true).forEach(perm => {
                            console.log(perm.cyan);
                        });
                        console.log("\n");
                    });
                } break;

                case ".members": {
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
                } break;
                
                // API Viewing
                case ".channel": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.channels.cache.get(args[1]) == undefined) throw `Could not find channel with ID "${args[1]}" in cached data`;
                    const channel = client.channels.cache.get(args[1]);
                    console.log("Channel information".red);
                    console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);

                    console.log(`${"[Guild]".blue} ${`${channel.guild.name} (${channel.guild.id})`.white}`);

                    console.log(`${"[ID]".blue} ${channel.id.white}`);

                    console.log(`${"[Name]".blue} ${channel.name.white}`);

                    console.log(`${"[Type]".blue} ${channel.type.white}`);

                    console.log(`${"[Created]".blue} ${`${channel.createdAt.toUTCString()} (${channel.createdTimestamp.toString()})`.white}`);

                    console.log(`${"[NSFW]".green} ${channel.nsfw.toString().white}`);
                } break;

                case ".guild": {
                    if (args.length < 2) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1]) == undefined) throw `Could not find user with ID "${args[1]}" in cached data`;
                    const guild = client.guilds.cache.get(args[1]);
                    console.log("Guild information".red);
                    console.log(`${"[String]".blue} ${"[Initger]".magenta} ${"[Boolean]".green}`);

                    console.log(`${"[ID]".blue} ${guild.id.white}`);

                    console.log(`${"[Name]".blue} ${guild.name.white}`);

                    if (guild.owner != null) console.log(`${"[Owner]".blue} ${`${guild.owner.user.tag} (${guild.owner.user.id})`.white}`);
                    else console.log(`${"[Owner]".blue} ${"Unknown".white}`);

                    console.log(`${"[Created]".blue} ${`${guild.createdAt.toUTCString()} (${guild.createdTimestamp.toString()})`.white}`);

                    if (guild.description != null) console.log(`${"[Description]".blue} ${guild.description.white}`);
                    else console.log(`${"[Description]".blue} ${"null".white}`);

                    console.log(`${"[Verification Level]".magenta} ${guild.verificationLevel.toString().white}`);

                    console.log(`${"[MFA Level]".magenta} ${guild.mfaLevel.toString().white}`);

                    console.log(`${"[Explicit Content Filter]".magenta} ${guild.explicitContentFilter.white}`);

                    console.log(`${"[Member Count]".magenta} ${guild.memberCount.toString().white}`);

                    console.log(`${"[Large]".green} ${guild.large.toString().white}`);

                    console.log(`${"[Server Boost Level]".magenta} ${guild.premiumTier.toString().white}`);

                    console.log(`${"[Partnered]".green} ${guild.partnered.toString().white}`);

                    console.log(`${"[Icon URL]".blue} ${guild.iconURL()}`);
                } break;

                case ".member": {
                    if (args.length < 3) throw "Missing Arguments";
                    if (client.guilds.cache.get(args[1]) === undefined) throw "Invalid Guild";
                    if (client.guilds.cache.get(args[1]).members.cache.get(args[2]) === undefined) throw "Invalid User";
                    const member = client.guilds.cache.get(args[1]).members.cache.get(args[2]);

                    console.log("Guild Member Information".red);
                    console.log(`${"[String]".blue} ${"[Number]".magenta} ${"[Boolean]".green}`);

                    console.log(`${"[ID]".blue} ${member.user.id}`);
                    console.log(`${"[Tag]".blue} ${member.user.tag}`);
                    console.log(`${"[Permissions]".magenta} ${member.permissions.toArray().join(", ".gray)}`);
                    let roleNames = [];
                    member.roles.cache.array().forEach(role => {
                        roleNames.push(role.name);
                    });
                    console.log(`${"[Roles]".blue} ${roleNames.join(", ".gray)}`);
                    console.log(`${"[Bannable]".green} ${member.bannable}`);
                    
                } break;

                case ".user": {
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
                } break;                   

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

                case ".savemsg": {
                    const fileName = `logs/${Date.now()}.txt`;
                    const fileContents = String(`${messages.join("\n").white}`);
                    fs.writeFile(fileName, fileContents, (err) => {
                        if (err) throw err;
                        messages = [];
                        console.log(`Message logs saved '${fileName}'`);
                    });
                } break;

                case ".?":
                case ".help": {
                    console.log("User Interactivity".magenta);
                    console.log(`${"No Command".blue} Send a message to the set User/Channel`);
                    console.log(`${".addrole".blue} ${"<Guild ID> <Member ID> <Role ID>".cyan} give a role to a guild member`);
                    console.log(`${".ban".blue} ${"<Guild ID> <User ID> <Days> [Reason]".cyan} ban a user from a guild`);
                    console.log(`${".bans".blue} ${"<Guild ID>".cyan} Display all the banned members from a guild`);
                    console.log(`${".changenick".blue} ${"<Guild ID> <Member ID> <Nick>".cyan} change a guild members nickname`);
                    console.log(`${".channels".blue} ${"<Guild ID>".cyan} Display all the channels in a guild`);
                    console.log(`${".delmsg".blue} ${"<Channel ID> <Message ID>".cyan} Delete a message`);
                    console.log(`${".guilds".blue} ${"Shows what guilds the bot is in".white}`);
                    console.log(`${".file".blue} ${"<File>".cyan} ${"Send a file".white}`);
                    console.log(`${".myperms".blue} ${"<Guild ID>".cyan} ${"Display the permissions the client user has in a guild"}`);
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
                    console.log(`${".clear".blue} Clear the console`);
                    console.log(`${".exit".blue} Exit the client`);
                    console.log(`${".help".blue} Prints this message`);
                    console.log(`${".info".blue} Display information about the client`);
                    console.log(`${".safemode".blue} Toggle safemode`);
                    console.log(`${".safemodeison".blue} Toggle safemode`);
                } break;

                case ".info": {
                    console.log(`${"Discord Control Client".magenta} - made by ${"DrRed96".red} with Node.js ${"https://nodejs.org/".blue}`);
                    console.log(`${"[Username]".green} ${client.user.tag}`);
                    console.log(`${"[User ID]".green} ${client.user.id}`);
                    if (!hidetoken) console.log(`${"[Token]".green} ${client.token}`);
                    console.log(`${"[Bot?]".green} ${client.user.bot}`);
                    console.log(`${"[Gateway]".green} ${client.ws.gateway}`);
                    console.log(`${"[Ping]".green} ${client.ws.ping}`);
                    console.log(`For more info type ${".help".cyan}`);
                } break;

                case ".app":
                case ".application": {
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
                } break;

                case ".exit": {
                    process.exit();
                } break;

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
client.on("message",
async (message) => {
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
