const fs = require('fs')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Tu n\'a toujours pas la permission d\'utilisé sa sorry')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Qui voulez-vous unwarn ??')
        if (!client.db.warns[member.id]) return message.channel.send('Il est trop sage il n\a aucun warn')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Je n\ai appliqué aucun warn de ce genre maîre(sse)')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a bien étais unwarn pour ${reason} maître(sse)`)
    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description: 'sert a enlever le warn de quelqu\'un (utilisable uniquement par le Roi (Reinne) et son personnel)',
        syntax: '<@member> <@reason>'
    }
}