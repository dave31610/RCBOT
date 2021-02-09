const discord = require("discord.js")
const fs = require("fs");
const canvaCord = require("canvacord");

module.exports.run = async (client, message, args) => {

    const levelFile = JSON.parse(fs.readFileSync("./data/levels.json"));

    const member = message.member.id;

    var nextLevelXP = levelFile[member].level * 300;

    if (nextLevelXP == 0) nextLevelXP = 100;

    if (levelFile[member]) {

        const rank = new canvaCord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(levelFile[member].xp)
        .setLevel(levelFile[member].level)
        .setRequiredXP(nextLevelXP)
        .setStatus(message.author.presensce.status)
        .setProgressBar("#ffa500", 'COLOR')
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator);

        rank.build().then(data => {
            const attachement = discord.MessageAttachment(data, "eennaam.png");
            message.channel.send(attachement);
        });


    } else {
        message.reply("we hebben nog geen gegevens");
    }

}

module.exports.help = {
    name: "level",
    description: "Hallo",
    category: "Informatie"
}