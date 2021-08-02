const moment = require('moment'),
Discord = require('discord.js')

moment.locale('fr')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Tu n\'a toujours pas la permission d\'utilisé sa sorry')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Vous vooulez voir les warn de quel membre maître(sse) ??')
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a pas de warn ^^')
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`**total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    },
    name: 'infraction',
    guildOnly: true,
    help: {
        description: 'Permet de verifier le nombre de warns d\'un membre (utilisable uniquement par le Roi (Reinne) et son personnel)',
        syntax: '<@member> <@reason>'
    }
}