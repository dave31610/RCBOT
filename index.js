const discord = require("discord.js");
const botdash = require("botdash.pro")
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels.json");

const activeSongs = new Map();

//  Command handler
const fs = require("fs");
const { isFunction } = require("util");

const client = new discord.Client();
var dashboard = "";


//  Command handler
client.commands = new discord.Collection();
client.aliases = new discord.Collection();


client.login(process.env.token);

//  Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach(alias => {
            client.aliases.set(alias, fileGet.help.name);
        })
    });

});


client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('731166398252056706');

    if (!role) return;

    member.roles.add(role);
    var channel = member.guild.channels.cache.get('808007386879098951');

    if (!channel) return;

    channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**`)
        .setColor("#00FF00")
        .setFooter("Gebruiker gejoined")
        .setTimestamp();

    channel.send(joinEmbed);

});


client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('808007386879098951');

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setFooter("Gebruiker geleaved")
        .setTimestamp();

    channel.send(leaveEmbed);

});


client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Testing", { type: "PLAYING" });

    dashboard = new botdash.APIclient(botConfig.botdash);

});

client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "Geen tekst te vinden";

    var respone = `Bericht ${messageDeleted.id} is verwijderd uit ${messageDeleted.channel}\n **Bericht:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.id} ${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(respone)
        .setTimestamp()
        .setColor("#FF0000");

    client.channels.cache.find(c => c.name == "logs").send(embed);

});

// var swearWords = ["koe", "kalf", "varken"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;


    // var msg = message.content.toLowerCase();

    // for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete({ timeout: 3000 }));

    //     }

    // }


    var prefix = await dashboard.getVal(message.guild.id, "botprefix");

    var messageArray = message.content.split(" ");


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var senteceUser = "";
    var amountSwearWords = 0;

    for (let y = 0; y < messageArray.length; y++) {

        const word = messageArray[y].toLowerCase();

        var changeWord = "";

        for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

            if (word.includes(swearWords["vloekwoorden"][i])) {

                changeWord = word.replace(swearWords["vloekwoorden"][i], "******");

                senteceUser += " " + changeWord;

                amountSwearWords++;

            }

        }

        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }

    }

    if (amountSwearWords != 0) {

        message.delete();
        message.channel.send(senteceUser);
        message.channel.send("Niet vloeken a.u.b.");
    }

    var command = messageArray[0];

    RandomXP(message);

    if (!message.content.startsWith(prefix)) return;

    //  Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, options);

});

function RandomXP(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;

    console.log(randomNumber);

    var idUser = message.author.id;

    if(!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        
         }
       }
    

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var nextLevelXP = levelUser *300;

    if(nextLevelXP == 0) nextLevelXP = 100;

    if(xpUser => nextLevelXP){

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
            if (err) console.log(err);
        });

            var embedLevel = new discord.MessageEmbed()
            .setDescription("***Level hoger***")
            .setColor("#00ff00")
            .addField("Nieuw level: ", levelFile[idUser].level);
        message.channel.send(embedLevel);
        
    }
}
