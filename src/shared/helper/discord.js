import Discord from "discord.js";
import { DISCORD_BOT_TOKEN, DISCORD_ROADMAPS_CHANNEL_ID } from "../constants/config";
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
  ]
});

client.once('ready', () => {
  console.log('Bot is ready');
});

const sendRoadmap = async (content) => {
  const channelId = DISCORD_ROADMAPS_CHANNEL_ID;
  const channel = await client.channels.fetch(channelId);
  if (!channel) {
    console.log(`Invalid channel ID: ${channelId}`);
    return;
  }
  await channel.send(content);
}

client.login(DISCORD_BOT_TOKEN);
export { sendRoadmap };