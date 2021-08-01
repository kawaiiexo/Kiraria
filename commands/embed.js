const Discord = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Mon titre')
            .setDescription('[Recherche Google](https://google.fr)')
            .setColor('RANDOM')
            .addField('Champ 1', 'champ test 1')
            .addField('Champ 2', 'champ test 2')
            .setAuthor('Kirari', 'https://cdn.discordapp.com/attachments/844463079320059904/852254412617547816/original.jpg', 'http://google.fr')
            .setImage('https://cdn.discordapp.com/attachments/844463079320059904/852253990720372746/KirariScary.jpg')
            .setThumbnail('https://cdn.discordapp.com/attachments/844463079320059904/852254412617547816/original.jpg')
            .setFooter('Kiraria 2.0', 'https://cdn.discordapp.com/avatars/851893358489239592/557076427eb7f808b84cc9bf355bb307.png?size=1024')
            .setTimestamp()
            .setURL('https://google.fr'))
    },
    name: 'embed'
}