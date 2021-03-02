const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send("Jij kan dit niet doen");

    var user = message.guild.member(message.mentions.users.first());
    if (!user) return message.channel.send("Geen Gebruiker met deze naam gevonden.");

    var role = message.guild.roles.cache.find(r => r.name === "dj");
    if (!role) return message.channel.send("Geen Rol met deze naam gevonden.");
   
    var fultEmbed = new discord.MessageEmbed()
        .setTitle("Foutje")
        .setColor("#ff0000")
        .setDescription("Deze persoon is al dj");

    var embed = new discord.MessageEmbed()
    .setTitle("Aanpassing")
    .setColor("#00ff00")
    .addField("Rol aanpassing", `${user.user.username} heeft de rol ${role} gekregen is nu dj`);

    if(user.roles.cache.find(r => r.name === role.name)){
        return message.reply(fultEmbed);
    }

    user.roles.add(role.id) && message.channel.send(embed);

}

module.exports.help = {
    name: "dj",
    description: "staff dj",
    category: "Administrator",
    aliases:[]
}