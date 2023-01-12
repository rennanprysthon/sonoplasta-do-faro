import { joinVoiceChannel } from "@discordjs/voice";

import { client } from "./client";

import dotenv from "dotenv";
import { logger } from "./utils";
import { JoinVoiceChannelService } from "./services/JoinVoiceChannelService";

dotenv.config();

const { DISCORD_TOKEN: token } = process.env;

client.on("ready", async () => {
  logger.info("Sonoplasta do Faro is ready!");
});

client.on("message", async (message) => {
  if (message.content === "!faro") {
    const joinChannelService = new JoinVoiceChannelService(joinVoiceChannel);
    joinChannelService.execute(message);
  }
});

client.login(token);
