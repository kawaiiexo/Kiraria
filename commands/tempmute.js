module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Qu\'est ce que tu croit petit seul la reine et son personnel peuvent utilisé sa.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('T\'a vraiment cru pouvoir mute la reine du serveur !?')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Dommage tu peux pas le mute')
        if (!member.manageable) return message.channel.send('Je ne peux pas le mute désolée')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} a bien était mute maîtresse`)
    },
    name: 'mute',
    guildOnly: true,
    help: {
        description: 'mute temporairement les gens (utilisable uniquement par la reine KaWaii et son personnel)',
        syntax: '[<@membre>]'
    }
}