const fs = require('fs')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Tu n\'a toujours pas la permission d\'utilisé sa sorry')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Qui voulez-vous warn ??')
        if (member.id === message.guild.ownerID) return message.channel.send('Belle tentative')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Tu ne peut pas le warn désolé')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Pour quelle raison ??')
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a bien étais warn pour ${reason} maître(sse)`)
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'sert a warn quelqu\'un (utilisable uniquement par le Roi (Reinne) et son personnel)',
        syntax: '<@member> <@reason>'
    }
}