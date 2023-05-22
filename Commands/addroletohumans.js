
const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  time
  } = require('discord.js');
  const map = new Map();
  const moment = require("moment");
 const ms = require("ms")

  module.exports = {
    category: "Admin",
    data: new SlashCommandBuilder()
      .setName('addroletohumans')
      .setDescription('Add a role to all HUMANS.')
      .setDefaultMemberPermissions(
        PermissionFlagsBits.ManageRoles
      )
      .addRoleOption((options) =>
        options
          .setName("role")
          .setDescription("The role.")
          .setRequired(true)
      ),
  
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
    
  
    async execute(interaction, Razen) {
       
        
        const role = interaction.options.getRole("role")
        



if(interaction.member.roles.highest.position < role.position) return interaction.reply({
  embeds: [
      new EmbedBuilder()
  .setAuthor({ name: `Something went Wrong!`, iconURL: interaction.guild.iconURL()})
 .setDescription(`❌ You do not have enough permissions to manage the role ${role}.`)
 .setColor("Red")
  ]
})

 if(interaction.guild.members.cache.get(Razen.user.id).roles.highest.position <= role.position) return interaction.reply({
    embeds: [
        new EmbedBuilder()
    .setAuthor({ name: `Something went Wrong!`, iconURL: interaction.guild.iconURL()})
   .setDescription(`❌ I do not have enough permissions to manage the role ${role}.`)
   .setColor("Red")
    ]
 })

 
 await interaction.guild.members.fetch().catch(() => {});
 var members = interaction.guild.members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).map(() => {});
 if (!members || members.length == 0)
 return interaction.reply("no members found")
  

 var success = 0;

 var counter = 0;

 await interaction.reply({ content: `🌊 **Adding ${role} to all the Humans in this server.**`, ephemeral: true})
 addroletomember(members[counter])
 map.set(interaction.guild.id, true)
 async function addroletomember(member) {
   if (counter == members.length) return send_finished()
   counter++;
   await member.roles.add(role).then(async s => {
     success++;
     await waitTimeMS(1500)
     addroletomember(members[counter]);
   }).catch(e => {
     addroletomember(members[counter]);
   })
 } //Made from Milrato to ease the process, mine failed ... .. . ... . .. . . . .

 function send_finished() {
   map.set(interaction.guild.id, false)
   interaction.editReply({
     content: `<@${interaction.user.id}>`,
     embeds: [new EmbedBuilder()
      
       .setFooter({ text: `Success`})
       .setTitle(` SUCCESS`)
       .setDescription(`🟢 **Successfully added ${role} to \`${success}\` of \`${counter}\` Humans\n> ${time()}**`)
    ], ephemeral: true});
 }



function waitTimeMS(time) {

    return new Promise((resolve) => {
      setTimeout(() => { resolve(2); }, time);
    });
 
}



        

        }
        
    
    }
      
  