import { Client } from 'discord.js';
import { GatewayIntentBits } from 'discord-api-types/v9';

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
});

export { client }
