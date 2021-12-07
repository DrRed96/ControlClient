require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const Readline = require("readline");

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new Discord.Client({disableEveryone: false});

let channel;
let guild;

client.once("ready", () => {
    console.log(`Client logged in as "${client.user.tag}"`);
});

rl.on("line", (input) => {
    const args = input.split(/ +/);

    switch (args[0]) {
        case ".channel":
            channel = client.channels.cache.get(`${args[1]}`);
            console.log(`Channel set to ${channel.name}`);
            break;
			
		case ".ban":
			const user = client.users.cache.find(user => user.id === `${args[0]}`);
			guild.members.ban(user);
			break;
		
		case ".guild":
			guild = client.guilds.cache.get(`${args[0]}`);
			console.log(`Guild set to ${guild.name}`);
			break;
		
        default:
            channel.send(`${input}`);
            break;
    }
});

client.login(process.env.BOT_TOKEN);