
module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

    await message.channel.overridePermissions([

        {
            id: message.guild.cache.find(r => r.name == "@everyone").id,
            allow: ['SEND_MESSAGES']
        }

        
    ]);

    message.channel.send("Kanaal niet meer in lockdown");

}    
module.exports.help = {
    name: "unlock",
    description: "Geeft al de verschillende commands",
    category: "Administrator",
    aliases:[]
}