module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Tu n\'a toujours pas la permission d\'utilisé sa sorry')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Qui voulez-vous exclure ??')
        if (member.id === message.guild.ownerID) return message.channel.send('Attend tu vient vraiment d\'essayé la ?!😅')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Tu ne peut pas l\'exclure désolé')
        if (!member.kickable) return message.channel.send('Je ne peut pas l\'exclure maîtresse excusée moi')
        const reason = args.slice(1).join(' ') || 'Il me faut une bonne raison pour l\'exclure'
        await member.kick(reason)
        message.channel.send(`${member.user.tag} a été exclu maîtresse`)
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'sert simplement a exclure quelqu\'un (utilisable uniquement par la reine KaWaii et son personnel)',
        syntax: '<@member> <@reason>'
    }
}