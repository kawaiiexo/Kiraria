const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Tu n\'a toujours pas la permission d\'utilisé sa sorry')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Qui voulez-vous bannir ??')
        if (member.id === message.guild.ownerID) return message.channel.send('Attend tu vient vraiment d\'essayé la ?!😅')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Tu ne peut pas le bannir désolé')
        if (!member.bannable) return message.channel.send('Je ne peut pas le bannir maîtresse excusée moi')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('combien de temps doit il être banni maîtresse ??')
        const reason = args.slice(2).join(' ') || 'Il me faut une bonne raison pour le bannir'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} maîtresse`)
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`${member.user.tag} a été débanni maîtresse`)
        }, duration)
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'banni temporairement quelqu\'un (utilisable uniquement par la reine KaWaii et son personnel)',
        syntax: '<@member> <@reason>'
    }
}