module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGA_MESSAGES')) return message.channel.send('Héhé qu\'est ce que j\'ai déjà dit, seul la reine et son personnel sont autorisés à utilisé ces commandes.')
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send('Je supprime combien de message maîtresse ??')
        if (count < 1 || count > 99) return message.channel.send('Désolé maîtresse je n\'ai pas la capacité de supprimer tant de messages je peux en supprimer jusque 99.')
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`Voici maîtresse j\'ai supprimé ${size - 1} messages`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Avec cette commande, j\'efface les messages que ma reine me demande (utilisable uniquement par la reine KaWaii et son personnel)',
        syntax: '[nombre de message entre 2 et 99]'
    }
}