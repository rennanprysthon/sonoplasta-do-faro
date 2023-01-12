import { DiscordGatewayAdapterCreator } from "@discordjs/voice";
import { Message } from "discord.js";
import { VoiceAdapterNotAvailable } from "../errors/VoiceAdapterNotAvailable";
import { GuildNotAvailable } from "../errors/GuildNotAvailable";
import { MemberNotAvailable } from "../errors/MemberNotAvailable";
import { ChannelNotAvailable } from "../errors/ChannelNotAvailable";

export class JoinChannelOptionsFactory {
  channelId: string;
  guildId: string;
  adapterCreator: DiscordGatewayAdapterCreator;
  constructor(message: Message) {
    if (!message.member) {
      throw new MemberNotAvailable();
    }

    const channel = message.member.voice.channel;

    if (!channel) {
      throw new ChannelNotAvailable();
    }

    if (!channel.guild) {
      throw new GuildNotAvailable();
    }

    this.channelId = channel.id;

    this.guildId = channel.guild.id;

    if (!channel.guild.voiceAdapterCreator) {
      throw new VoiceAdapterNotAvailable();
    }

    this.adapterCreator = channel.guild
      .voiceAdapterCreator as DiscordGatewayAdapterCreator;
  }
}
