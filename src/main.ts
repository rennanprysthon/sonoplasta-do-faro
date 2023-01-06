import {
	joinVoiceChannel,
	createAudioPlayer,
	entersState,
	VoiceConnectionStatus,
} from '@discordjs/voice';

import { VoiceBasedChannel } from 'discord.js';
import { createDiscordJSAdapter } from './adapter';
import { client } from './client'

import dotenv from 'dotenv'
import { logger } from './utils';

dotenv.config();

const { DISCORD_TOKEN: token } = process.env

/**
 * 	In this example, we are creating a single audio player that plays to a number of voice channels.
 * The audio player will play a single track.
 */

/**
 * Create the audio player. We will use this for all of our connections.
 */
const player = createAudioPlayer();

async function connectToChannel(channel: VoiceBasedChannel) {
	/**
	 * Here, we try to establish a connection to a voice channel. If we're already connected
	 * to this voice channel, @discordjs/voice will just return the existing connection for us!
	 */
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: createDiscordJSAdapter(channel),
	});

	/**
	 * If we're dealing with a connection that isn't yet Ready, we can set a reasonable
	 * time limit before giving up. In this example, we give the voice connection 30 seconds
	 * to enter the ready state before giving up.
	 */
	try {
		/**
		 * Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
		 * an error is thrown.
		 */
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		/**
		 * At this point, the voice connection is ready within 30 seconds! This means we can
		 * start playing audio in the voice channel. We return the connection so it can be
		 * used by the caller.
		 */
		return connection;
	} catch (error) {
		/**
		 * At this point, the voice connection has not entered the Ready state. We should make
		 * sure to destroy it, and propagate the error by throwing it, so that the calling function
		 * is aware that we failed to connect to the channel.
		 */
		connection.destroy();
		throw error;
	}
}

client.on('ready', async () => {
	logger.info('Sonoplasta do Faro is ready!');
});

client.on('messageCreate', async (message) => {
	if (!message.guild) return;

  if (message.content === '!faro') {
		const channel = message.member?.voice.channel;

		if (channel) {
			/**
			 * The user is in a voice channel, try to connect.
			 */
			try {
				const connection = await connectToChannel(channel);

				/**
				 * We have successfully connected! Now we can subscribe our connection to
				 * the player. This means that the player will play audio in the user's
				 * voice channel.
				 */
				connection.subscribe(player);
				await message.reply('Renderizar lista de mensagens');
			} catch (error) {
				/**
				 * Unable to connect to the voice channel within 30 seconds :(
				 */
				console.error(error);
			}
		} else {
			/**
			 * The user is not in a voice channel.
       * Atualizar esses textos para internacionalização
			 */
			void message.reply('Por favor, entre em um canal de voz');
		}
	}
});

client.login(token);
