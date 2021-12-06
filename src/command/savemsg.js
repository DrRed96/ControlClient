const Colors = require("colors");
const Discord = require("discord.js");
const fs = require("fs");

async function cmd(messages) {
    const fileName = `logs/${Date.now()}.txt`;
    const fileContents = String(`${messages.join("\n").white}`);
    fs.writeFile(fileName, fileContents, (err) => {
        if (err) throw err;
        messages = [];
        console.log(`Message logs saved '${fileName}'`);
    });
}

module.exports = cmd;
