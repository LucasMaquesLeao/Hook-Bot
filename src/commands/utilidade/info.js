const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {charSheet} = require('../../classes-da-ficha/ficha.js')

const c1 = new charSheet("pica", "rola", "roula")
c1.pornaTelaATabela()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Recebe informação sobre o RPG')
        .addSubcommand(subcommand => 
            subcommand
                .setName("ficha")
                .setDescription('Info da ficha')
                .addUserOption(option => option.setName("target").setDescription('o user mencionado')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('informações do server')),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "ficha"){
            const user = interaction.options.getUser("target")
            if (user){
                const file = new MessageAttachment('../../js/Hook Bot/src/fotos/darkicone.png');
                const userEmbed = new MessageEmbed()
                    .setTitle(`Sua ficha, ${user.username}!`)
                    .setURL("https://www.lmlservertest.x10.mx/suafichajs.html")
                    .setDescription(`Ficha de ${c1.getNome()}`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Usuário:', value: `${user.username}`, inline: true},
                        { name: `\u200B`, value: `\u200B`, inline: true},
                        { name: `Tag:`, value: `#${user.discriminator}`, inline: true},
                        { name: 'Status da Ficha:', value: `${c1.informacoes}`}
                    )
                    .setImage("https://static.tvtropes.org/pmwiki/pub/images/external_contentduckduckgo_01.jpg")
                    .setTimestamp()
                    .setFooter({
                        text: `${client.user.tag}`
                    })
                    .setColor('RED');
                    
                    
                await interaction.reply({ embeds: [userEmbed], ephemeral: true})
            }else{
                await interaction.reply(`Usuário: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`)
            }
        }else if (interaction.options.getSubcommand() === "server"){
            await interaction.reply(`Nome do Servidor: ${interaction.guild.name}\nTotal de participantes: ${interaction.guild.memberCount}`)
        }else{
            await interaction.reply('Nenhum subcomando foi utilizado.')
        }
	},
};