import { Message } from "discord.js";
import { Button } from "../entities/Button";
import { RenderButtonsService } from "./RenderButtonsService";

describe("Render Buttons Service", () => {
  it("should render the buttons", () => {
    const buttons = [
      new Button({
        label: "test button",
        id: "1",
        style: "PRIMARY",
      }),
    ];

    const message = {
      reply: jest.fn(),
      author: {
        send: jest.fn(),
      },
      channel: {
        send: jest.fn(),
      },
    } as unknown as Message;

    const renderButtonsService = new RenderButtonsService(buttons);
    renderButtonsService.execute(message);

    expect(message.reply).toHaveBeenCalledTimes(1);
    expect(message.reply).toHaveBeenCalledWith(
      expect.objectContaining({
        components: expect.any(Array),
      })
    );
  });
});
