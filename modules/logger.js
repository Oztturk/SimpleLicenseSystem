
import { EmbedBuilder,WebhookClient  } from 'discord.js'
import * as dotenv from 'dotenv'

dotenv.config();


var logToDiscord = (Title,...extraFields) =>{
    const webhookClient = new WebhookClient({ url: process.env.WebhookURL });
    const embed = new EmbedBuilder()
	.setTitle(Title)
    .addFields([
        ...extraFields
    ])
	.setColor(0x00FFFF);

    webhookClient.send({
        content: '',
        username: process.env.WebhookName,
        embeds: [embed],
    });
}

export {
    logToDiscord
}