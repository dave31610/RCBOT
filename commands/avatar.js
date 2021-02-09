const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var member = message.guild.member(message.mentions.user.first() || client.users.cashe.get(args[0]) ||
        client.users.cashe.find(user = user.username.toLowerCase() == args.join(" ").toLowerCase()) ||
        client.users.cashe.find(user = user.tag.toLowerCase() == args.join(" ".toLowerCase)));

    if (!member) member = message.member;

    var embed = new discord.MessageEmbed()
        .setTitle(`Avatar ${member.user.username}`)
        .setColor("#ff0000")
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096}));

    message.channel.send(embed);

}

module.exports.help = {
    name: "avatar",
    description: "Avatar Command",
    category: "Informatie"
}