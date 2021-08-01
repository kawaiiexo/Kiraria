module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('T\'a vraiment cru pouvoir unmute la reine du serveur !?')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Dommage tu peux pas le unmute')
        if (!member.manageable) return message.channel.send('Je ne peux pas le unmute désolée')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channe.send('Comment tu veux que je unmute quelqu\'un si il n\'y a même pas de rôle mute.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} a bien étais unmute maîtresse`)
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'J\'unmute simplement quand ma maîtresse le demande (utilisable uniquement par la reine KaWaii et son personnel)',
        syntax: '[<@member>]'
    }
}