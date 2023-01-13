import { Message, MessageActionRow, MessageButton } from "discord.js";
import { MAX_AMOUNT_OF_BUTTONS_PER_ROW } from "../constants/constants";
import { parseToMatrix } from "../helpers/parseToMatrix";
import { Button } from "../entities/Button";
import { Service } from "./Service";

export class RenderButtonsService implements Service {
  constructor(private buttons: Button[]) {}

  async execute(message: Message) {
    const buttonsArray = this.buttons.map((button) =>
      new MessageButton()
        .setCustomId(button.id)
        .setLabel(button.label)
        .setStyle(button.style)
    );

    const buttonsMatrix = parseToMatrix(
      MAX_AMOUNT_OF_BUTTONS_PER_ROW,
      buttonsArray
    );

    const rows = buttonsMatrix.map((buttonRow) =>
      new MessageActionRow().addComponents(buttonRow)
    );

    await message.reply({
      components: rows,
    });
  }
}
