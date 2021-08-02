const { type } = require('os')

const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('désolé mais tu ne peut utilisé cette commande que dans un serveur')
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`${member} c\'est installé(e) au royaume ce qui fait que nous somme maintenant ${member.guild.memberCount} ! 😄`)
        .setColor('#00ff00')
        .setAuthor('Kirari', 'https://cdn.discordapp.com/attachments/844463079320059904/852254412617547816/original.jpg')
        .setFooter('Kiraria 2.0', 'https://cdn.discordapp.com/avatars/851893358489239592/557076427eb7f808b84cc9bf355bb307.png?size=1024')
        .setTimestamp()
        .setImage (''))
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel2).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitté le royaume bonne route a toi 😎`)
        .setColor('#ff0000')
        .setAuthor('Kirari', 'https://cdn.discordapp.com/attachments/844463079320059904/852254412617547816/original.jpg')
        .setFooter('Kiraria 2.0', 'https://cdn.discordapp.com/avatars/851893358489239592/557076427eb7f808b84cc9bf355bb307.png?size=1024')
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/844463079320059904/853021057652752394/Goku-vegeta-decal-sticker.jpg'))
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'STREAMING', url: 'https://twitch.tv/Exo Infinity'})
        i = ++i % statuses.length
    }, 1e4)
})