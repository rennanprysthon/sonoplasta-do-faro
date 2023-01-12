import { Service } from "./Service";
import {
  JoinVoiceChannelOptions,
  CreateVoiceConnectionOptions,
  VoiceConnection,
} from "@discordjs/voice";
import { Message } from "discord.js";
import { JoinChannelOptionsFactory } from "../entities/JoinChannelOptionsFactory";

export type JoinVoiceChannel = (
  options: JoinVoiceChannelOptions & CreateVoiceConnectionOptions
) => VoiceConnection;
export class JoinVoiceChannelService implements Service {
  constructor(private joinVoiceChannel: JoinVoiceChannel) {}

  async execute(message: Message) {
    const { channelId, guildId, adapterCreator } =
      new JoinChannelOptionsFactory(message);
    this.joinVoiceChannel({ channelId, guildId, adapterCreator });
  }
}
