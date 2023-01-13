import { joinVoiceChannel } from "@discordjs/voice";

import { client } from "./client";

import dotenv from "dotenv";
import { logger } from "./utils";
import { JoinVoiceChannelService } from "./services/JoinVoiceChannelService";
import { RenderButtonsService } from "./services/RenderButtonsService";
import { RESOURCES } from "./constants/constants";
import { Button } from "./entities/Button";

dotenv.config();

const { DISCORD_TOKEN: token } = process.env;

client.on("ready", async () => {
  logger.info("Sonoplasta do Faro is ready!");
});

client.on("messageCreate", async (message) => {
  if (message.content === "!faro") {
    const joinChannelService = new JoinVoiceChannelService(joinVoiceChannel);
    joinChannelService.execute(message);

    const buttons = RESOURCES.map(
      (button) =>
        new Button({
          label: button.label,
          id: button.key,
          style: "PRIMARY",
        })
    );
    const renderButtonsService = new RenderButtonsService(buttons);
    await renderButtonsService.execute(message);
  }
});

client.login(token);
