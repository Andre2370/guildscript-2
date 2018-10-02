//Exit error code explanation:
// 1 : Some ran a command but failed to obtain permissions
// 2 : Code error
// 3 : non specified

//const's
const Discord = require("discord.js");
const cfg = require("./cfg/cfg.json");
const client = new Discord.Client();
const fs = require("fs")
const request = require('request');
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const pointProvider = new EnmapLevel({name: "points"});
this.points = new Enmap({provider: pointProvider});

//variables
var time = Date.now();

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'Type ' +prefix+ 'help',
            type: 0
        }
    });
});

client.on("ready", () => {
   console.log(`[` +time+ `] Logged in as ${client.user.tag}! We are up and running boss!`);
   console.log(`[` +time+ `] Ctrl + C to open the command line. Type node gs.js to restart`)
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "kick")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});


const current = require("./package.json")

if (cfg.using < current.version) {
	console.log(` `)
	console.log(`[` +time+ `] Uh oh boss! You better update GS, as the current version is deprecated and most likely reaching EOL.`)
	console.log(`[` +time+ `] Current up-to-date version is: ` +current.version+ `.`)
	console.log(` `)
} else {
	console.log(`Current version is up-to-date!`)
	console.log(` `)
}

let prefix = cfg.prefix;
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "help")) {
  	message.channel.send("Help section for GuildScript. ")

  } else

  if (message.content.startsWith(prefix + "about")) {
  	message.channel.send("This amazing bot was created by Andre#2370, tho I wasn't the major developer! \n gravy#3333: made this amazing icon. You can find him in the ArrayBot support server. \n Blayyke#8221: Helped me in most stuff, and he is also a cat lover. You can also find him in the ArrayBot support server!");
  } else

  if(message.content.startsWith(cfg.prefix + "prefix")) {
  	let newPrefix = message.content.split(" ").slice(1, 2)[0];
  	cfg.prefix = newPrefix;

  	fs.writeFile("./cfg/cfg.json", JSON.stringify(cfg), (err) => console.error);
  	message.channel.send("Your new prefix is now: " +cfg.prefix+ " !");
  }
});

client.login(cfg.token);
