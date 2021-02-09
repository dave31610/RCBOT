const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
            .setTitle('luister naar ons radio zender')
            .setDescription("klik hier http://www.radio-cornda.xyz")
            .setColor("#0099ff")
            .addField("Bot naam", client.user.username)            
            .setTimestamp()
            .setFooter('veel luister plezier');

        return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info",
    description: "info van radio cornda",
    category: "Informatie",
    aliases:["i"]
}