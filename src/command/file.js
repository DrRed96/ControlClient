const Colors = require("colors");
const Discord = require("discord.js");

/**
 * @param {*} sender 
 * @param {string[]} args
 * @param {boolean} safemode
 */
async function cmd(sender, args, safemode) {
    if (safemode) throw "Cannot send message with safemode active";
    if (sender === undefined) throw "Undefined sender";
    if (args.length < 2) throw "Missing Arguments";
    sender.send("", {files: [args[1]]});
    console.log("\n");
}

module.exports = cmd;
