const Colors = require("colors");
const Discord = require("discord.js");

async function cmd() {
    console.log("Version 120721".magenta);
    console.log(`${"[+]".green} Added .changelog`);
    console.log(`${"[/]".yellow} fixed some bugs in .banall`);
    
    console.log("\nVersion 12??21".magenta);
    console.log(`${"[+]".green} Added .kick`);
    console.log(`${"[/]".yellow} fixed .ban`);
    console.log(`${"[/]".yellow} changed the code structure`);
}

module.exports = cmd;
