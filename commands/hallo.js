const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("Hallo welkom bij radio cornda");

}

module.exports.help = {
    name: "hallo",
    description: "Hallo",
    category: "Informatie",
    aliases:[]
}