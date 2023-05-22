
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

  const moment = require("moment");
 const ms = require("ms")
  
  module.exports = {
    category: "Admin",
    data: new SlashCommandBuilder()
      .setName('addrole')
      .setDescription('Add a role to a Member.')
      .setDefaultMemberPermissions(
        PermissionFlagsBits.ManageRoles
      )
      .addUserOption((options) =>
        options
          .setName("member")
          .setDescription("The user that should be granted the role.")
          .setRequired(true)
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
       
        const x = interaction.options.getUser("member")
        const role = interaction.options.getRole("role")
        
const User = interaction.guild.members.cache.get(x.id)


 if(User.roles.highest.position <= interaction.member.roles.highest.position && User.id !== interaction.user.id) return interaction.reply({
     content: `❌ **You cannot manage someone with a higher / equal __Role Hierarchy__ Position than you.**`, ephemeral: true
 })

 if(User.roles.highest.position <= role.position) return interaction.reply({
    content: `❌ **You cannot manage a role that has a higher / equal __Role Hierarchy__ position than you.**`, ephemeral: true
 })

 if(interaction.guild.members.cache.get(Razen.user.id).roles.highest.position <= role.position) return interaction.reply({
    embeds: [
        new EmbedBuilder()
    .setAuthor({ name: `Something went Wrong!`, iconURL: interaction.guild.iconURL()})
   .setDescription(`<:TY_Unprogress:1078998923181568061> I do not have enough permissions to manage the role ${role}.`)
   .setColor("Red")
    ]
 })
 if(User.roles.cache.some(rol => rol.id === role.id)) return message.reply({
  content: `❌ **The user already has that role.**`
})
 

User.roles.add(role).catch(e => {
    
    console.log(e)
   
    
  })
  


    const embed = new EmbedBuilder()
    .setAuthor({ name: `New role Added!`, iconURL: interaction.guild.iconURL()})
   .setDescription(`🟢 ${x} has been **Granted** the role ${role} by ${interaction.user}.`)
   .setColor(role.color)
   
   
    return interaction.reply({
      embeds: [embed]
   })





        

        }
        
    
    }
      
  