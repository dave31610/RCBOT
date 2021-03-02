module.exports.run = async (client, message, args) => {

    var result = Math.ceil(Math.random() * 6);

    message.channel.send(`:game_die: Je hebt **${result}** gegooid :game_die:`);

}

module.exports.help = {
    name: "dobbel",
    description: "dobbel steen spel",
    category: "spellen",
    aliases:[]
}