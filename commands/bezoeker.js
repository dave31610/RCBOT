
module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send("Jij kan dit niet doen");

    var noRoleUser = message.guild.member(message.mentions.user.first());
    if (!noRoleUser) return message.channel.send("Geen Gebruiker met deze naam gevonden.");

    var role = message.guild.roles.cache.find(r => r.name === "Bezoeker");
    if (!role) return message.channel.send("Geen Rol met deze naam gevonden.");

    for (let index = 0; index < noRoleUser._roles.length; index++){
        const role = noRoleUser._roles[index];

        noRoleUser.role.remove(role);
    }

    var embed = new discord.MessageEmbed()
    .setTitle("Rollen zijn gereset naar Bezoeker.")
    .setColor("#ff0000");

    noRoleUser.roles.add(role);

    return message.channel.send(embed);

}

module.exports.help = {
    name: "bezoeker",
    description: "rollen resetten naar bezoeker",
    category: "Administrator",
    aliases:[]
}