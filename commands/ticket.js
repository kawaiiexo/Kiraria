const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {
        if (Object.values(client.db.ticket).some(ticket => ticket.author === message.author.id)) return message.channel.send('Tu a déjà un ticket d\'ouvert je ne vais pas en réouvrir un deuxième')
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        channel.send(new Discord.MessageEmbed()
        .setDescription(`Heyy ${message.member}, bienvenue dans ton ticket installe toi fait comme chez toi le temps que maître(sse) ou un admin arrive ^^`))
        message.channel.send(`Ton ticket ${channel} a bien été créé`)
    },
    name: 'ticket',
    guildOnly: true
}