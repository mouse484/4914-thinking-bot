const Discord = require("discord.js");

const client = new Discord.Client();


client.on("ready", () => {
    console.log("まめのき🤔");
    client.user.setActivity(`mame:help | ${client.guilds.size} Server`);
});

client.on("message", message => {
    if (message.author.bot) return;

    const mamenoki = client.users.get("491418194762792961");
    const mame_channel = client.channels.get("597206326602498068")

    if (message.author.id === mamenoki.id) {

        message.react("🤔");

        if (message.content.match(/(::|--)[a-z]/)) return;

        const message_option = {
            embed: {
                fields: [
                    {
                        name: "チャンネル",
                        value: `<#${message.channel.id}>`,
                        inline: true,
                    },
                    {
                        name: "リンク",
                        value: `[まめのきさんの発言はこちら](${message.url})`,
                        inline: true,
                    }
                ],
                timestamp: new Date(),
            }
        };

        if (message.attachments.first()) {
            message_option.file = message.attachments.first().url;
        }

        mame_channel.send(message.cleanContent, message_option);
    }

    if (message.isMemberMentioned(mamenoki)) {
        const value = mame_channel.name.split("mamenokiログ-")[1];
        const num = Number(value) + 1;
        mame_channel.setName(`mamenokiログ-${num}`);
    }

    if (message.content === "mame:help") {
        message.channel.send({
            embed: {
                author: {
                    name: client.user.username,
                    url: "https://github.com/mouse484/tmo-bot",
                    icon_url: client.user.avatarURL,
                },
                title: "まめのきさんにティンキングをつけログを取るBotです",
                fields: [
                    {
                        name: "開発場所",
                        value: "[GitHub](https://github.com/mouse484/tmo-bot)",
                        inline: true,
                    },
                    {
                        name: "招待",
                        value: "[URL](https://discordapp.com/oauth2/authorize?client_id=598122769254842378&scope=bot)",
                        inline: true,
                    }
                ],
            }
        })
    }
});

client.login(process.env.TOKEN);
