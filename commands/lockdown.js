const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

    await message.channel.overridePermissions([

        {
            id: message.guild.cache.find(r => r.name === "@everyone").id,
            deny: ['SEND_MESSAGES']
        }

        
    ]);

    message.channel.send("Kanaal in lockdown");

}    
module.exports.help = {
    name: "lockdown",
    description: "Geeft al de verschillende commands",
    category: "Administrator",
    aliases:[]
}