// Load up the discord.js library
const Discord = require("discord.js");
const economy = require("discord-eco")
const fs = require("fs");
const superagent = require("superagent");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
function hook(channel, title, message, color, avatar){

  if(!channel) return console.log('Channel not specified.');
  if(!title) return console.log('Title not specified.');
  if(!message) return console.log('message not specified.');
  if(!color) color = '01FF7C';
  if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/bank-building-128.png'

  color = color.replace(/\s/g, '');
  avatar = avatar.replace(/\s/g, '');

  channel.fetchWebhooks()
  .then(webhook => {

    let foundHook = webhook.find('name', 'The Hotel Bot');

    if(!foundHook) {
      channel.createWebhook('The Hotel Bot', 'https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/bank-building-128.png')
      .then(webhook => {

        webhook.send('', {
          "username": title,
          "avatarURL": avatar,
          "embeds": [{
            "color": parseInt(`0x${color}`),
            "description": message
          }]
        })
        .catch(error => {
          console.log(error);
          return channel.send('**Something went wrong when sending the webhook, please check the console.**');
        })
      })
    } else {
        foundHook.send('', {
          "username": title,
          "avatarURL": avatar,
          "embeds": [{
            "color": parseInt(`0x${color}`),
            "description": message
          }]
        })
        .catch(error => {
          console.log(error);
          return channel.send('**Something went wrong when sending the webhook, please check the console.**');
        })
      }
  })
}

client.on("ready", () => {

  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`World of Suvli Bot`);
  process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`World of Suvli Bot`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`World of Suvli Bot`);
});

client.on('guildMemberAdd', member => {
  /*const args = member.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log('user' + member.user.username + 'Has joined the server')

  //var role = member.guild.roles.fin('name', 'User');

  return hook(member.channel, `Welcome`, `${member.user}, Welcome at World Of Suvli! be sure to check out #welcome, and write a little introduction about yourself in #introduction!`, '01FF7C', 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/door-128.png')

  let hookArgs = member.content.slice(prefix.length + 4).split(",");

  hook(member.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);*/

  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('Member Joined',
    `${member.user}, Welcome at World Of Suvli! be sure to check out <#372373865676013569>, and write a little introduction about yourself in <#372416015935471616>`)
    client.channels.get("372373688063885315").send(embed);
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('Member Left',
    `${member.user}, left our world 😢....`)
    client.channels.get("372373688063885315").send(embed);
});

client.on("message", async message => {
    var prefix = '!'
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  if (message.content == "XD") {
      message.react('😂')
    }

  if(command == "cat") {
    const { body } = await superagent
    .get('http://random.cat/meow.php');
    const embed = new Discord.RichEmbed()
    .setColor(0x01FF7C)
    .setTitle("meow :cat:")
    .setImage(body.file)
    message.channel.send({embed})
  } else

  if (command === "doggo") {
 var doggos = require('./doggo.json');
 var doggo = doggos[Math.floor(Math.random() * doggos.length)];
 const embed = new Discord.RichEmbed()
 .setColor(0x01FF7C)
 .setDescription("Woof :dog:")
 .setImage(doggo)
     message.channel.send({embed});
   } else

  if(command == "announce") {
    if(message.member.hasPermission("ADMINISTRATOR")) {
      const embed = new Discord.RichEmbed()
      .setColor(0x01FF7C)
      .setTitle(":pushpin:**__ANNOUNCEMENT__** " + `**__ ${month + "/" + day + "/" + year} __**` + ":pushpin:")
      .setDescription(args.join(" "))
      .setFooter("© World Of Suvli")
      client.channels.get("372380621151928331").send("@everyone")
      client.channels.get("372380621151928331").send({embed})
    }
  }

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  //let message = message.content.toUpperCase();
if (command == "hook") {
  if(command == "hook"){
    return hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message> [HEXcolor], avatarURL\n\n**<> is required\n[] is optional**`, '01FF7C', 'https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/bank-building-128.png')
  }

  let hookArgs = message.content.slice(prefix.length + 4).split(",");

  hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);
}

  //balance and money
  if (command === "balance"  || command === "money") {

    economy.fetchBalance(message.author.id).then((i) => {
      const embed = new Discord.RichEmbed()
      .setDescription(`**${message.guild.name} Bank**`)
      .setColor(0x01FF7C)
      .addField('Account Holder',message.author.username,true)
      .addField('Account Balance',i.money,true)

      message.channel.send({embed})
      return hook(message.channel, 'Bank', `**${message.guild.name} BANK**\n\nAccount Holder\n[] is optional**`, '01FF7C', 'https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/bank-building-128.png')

    let hookArgs = message.content.slice(prefix.length + 4).split(",");

    hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);
    })

  }

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit({embed: {
      title: "🏓 Pong!",
  color: 0x01FF7C,
  description: `Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`
}});
  }


  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send({embed: {
  color: 0x01FF7C,
  description: "🤖 I am a bot!"
}});
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "everyone"].includes(r.name)) )
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "Sorry you don't have permission to use that 😒"
  }});

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "Please give me a valid Guest, I am getting low wage paid 💸"
  }});
    if(!member.kickable)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "I can't kick this person, I think this person has a higher role than you!"
  }});

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "Please Indicate a reason for the kick!"
  }});

    // Now, time for a swift kick in the nuts! `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply({embed: {
  color: 0x01FF7C,
  description: `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`
}});

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "Please mention a valid guest to kick..."
  }});
    if(!member.bannable)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "I can not ban this guest, do they have a higher role than you?"
  }});

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply({embed: {
    color: 0x01FF7C,
    description: "Please Indicate a reason for the ban!"
  }});

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply({embed: {
  color: 0x01FF7C,
  description: `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`
  }});
}

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  });

client.login(config.token);
