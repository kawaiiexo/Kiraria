const Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send('La commande que tu demande n\'existe pas désolé.')
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**Commande : ${command.name}**\n\n${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``))
        }
        else {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Liste des commandes')
                .addField('Information sur Kiraria 2.0', 'Je m\'appelle Kirari je suis le bras droit de la reine KaWaii, mon prefix est !, pour plus d\'information sur une commande utilise le !help merciiii 😘.')
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter('Kiraria 2.0', 'https://cdn.discordapp.com/attachments/844463079320059904/852605545478881320/IMG_20210608_213102.jpg')
                .setThumbnail('https://cdn.discordapp.com/attachments/844463079320059904/852605973982085170/original.jpg')
                .setAuthor('Kirari', 'https://cdn.discordapp.com/attachments/844463079320059904/852605973982085170/original.jpg')
                .setDescription(`${client.commands.filter(command => command.help).map(command => `\`${config.prefix}${command.name}\``).join(' ')}\n\nSi tu veux en savoir plus sur cette commande, utilise \`${config.prefix}help [nom de la commande]\``))
        }
    },
    name: 'help',
    help: {
        description: 'Cette commande te donne des infos sur toute les autres',
        syntax: '[nom de la commande]'
    }
}