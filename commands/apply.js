const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

   var categoryID = "816331723125817384";
   var staff = "731164495027896421";
   var person = message.author;

   var channelName = "Sollicitatie-" + message.author.username;

   var ticket = false;

   message.guild.channels.cache.forEach(channel => {

    if (channel.name.toLowerCase() === channelName.toLowerCase()) {
        ticket = true;
        return message.reply("Je hebt al een ticket").then(msg => msg.delete({ timeout: 3000 }));
    }

   });

   if (ticket) return;

   var embed = new discord.MessageEmbed()
        .setTitle("Hoi" + message.author.username)
        .setColor("#00bfff")
        .setFooter("Kanaal wordt aangemaakt.");

    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));

    message.guild.channels.create(channelName, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {
                    
                    settedParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        SEND_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CONNECT: true,
                        READ_MESSAGE_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.get(staff), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                    .setTitle("Hoi" + message.author.username)
                    .setColor("#00bfff")
                    .setDescription(`Dit is een Sollicitatie, vul deze maar rustig in.`);

                    var vraag1 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 1")
                    .setColor("#00bfff")
                    .setDescription("Wie ben je?");

                    var vraag2 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 2")
                    .setColor("#00bfff")
                    .setDescription("Waarom wil je dj worden?");
                    
                    var vraag3 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 3")
                    .setColor("#00bfff")
                    .setDescription("heb je vaste internet aansluiting? via lan en niet via wifi");

                    var vraag4 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 4")
                    .setColor("#00bfff")
                    .setDescription("welke uitzendsoftware heb je? heb je geen dan hebben wij de sambroadcast die wij er op kunnen zetten");

                    var vraag5 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 5")
                    .setColor("#00bfff")
                    .setDescription("wat is je email? inverbant met de nieuwe muziek naar je toe sturen");

                    var vraag6 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 6")
                    .setColor("#00bfff")
                    .setDescription("Welke uitzend dag kan je om uit te zenden? alleen de vrijdag kan niet inverband met de hoofdstudio");

                    var vraag7 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 7")
                    .setColor("#00bfff")
                    .setDescription("Welke tijd kan je uitzenden? kijk hier voor in ons programma wat leeg is");

                    var vraag8 = new discord.MessageEmbed()
                    .setTitle("Sollicitatie: vraag 8")
                    .setColor("#00bfff")
                    .setDescription("heb je nog een opmerking");

                settedParent.send(message.author.id);
                settedParent.send(embedParent);
                settedParent.send(vraag1);

                settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                    var antwoord1 = antwoord.first();;
                    settedParent.send(vraag2);

                    settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                        var antwoord2 = antwoord.first();;
                        settedParent.send(vraag3);

                        settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                            var antwoord3 = antwoord.first();;
                            settedParent.send(vraag4);

                            settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                                var antwoord4 = antwoord.first();;
                                settedParent.send(vraag5);

                                settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                                    var antwoord5 = antwoord.first();;
                                    settedParent.send(vraag6);

                                    settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                                        var antwoord6 = antwoord.first();;
                                        settedParent.send(vraag7);

                                        settedParent.awaitMessages(s => s.author.id == message.author.id, { max:1 }).then(antwoord => {
                                            var antwoord7 = antwoord.first();;
                                            settedParent.send(vraag8);
                                            
                                            settedParent.awaitMessages(s => s.author.id == message.author.id, {max:1}).then(antwoord => {
                                                var antwoord8 = antwoord.first();;

                                                var uitkomst = new discord.MessageEmbed()
                                                    .setTitle("Bedankt voor het Solliciteren")
                                                    .setColor("#00ff00")
                                                    .setTimestamp()
                                                    .SetDescription(`**Vraag 1:** \n${antwoord1}\n\n**Vraag 2:** \n${antwoord2}\n\n**Vraag 3:** \n${antwoord3}\n\n**Vraag 4:** \n${antwoord4}\n\n**Vraag 5:** \n${antwoord5}\n\n**Vraag 6:** \n${antwoord6}\n\n**Vraag 7:** \n${antwoord7}\n\n**Vraag 8:** \n${antwoord8}`);
                                            
                                                settedParent.bulkDelete(16).then(
                                                    settedParent.send(uitkomst)
                                                )
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })

               settedParent.send(`${person}, <@&${staff}>`).then(msg => msg.delete({ timeout: 1000 }));

            }).catch(() => {err =>
                message.channel.send("Oeps er is iets misgelopen");
            })
        })

}

module.exports.help = {
    name: "apply",
    description: "solistatie",
    category: "Informatie",
    aliases:[]
}