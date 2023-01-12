import { Message } from "discord.js";
import { VoiceAdapterNotAvailable } from "../errors/VoiceAdapterNotAvailable";
import { GuildNotAvailable } from "../errors/GuildNotAvailable";
import { MemberNotAvailable } from "../errors/MemberNotAvailable";
import {
  JoinVoiceChannel,
  JoinVoiceChannelService,
} from "./JoinVoiceChannelService";
import { ChannelNotAvailable } from "../errors/ChannelNotAvailable";

const callback = jest.fn() as JoinVoiceChannel;

describe("Join Voice Channel Service", () => {
  it("should join the voice channel", () => {
    const message = {
      member: {
        voice: {
          id: "voice-id",
          channel: {
            guild: {
              id: "guild-id",
              voiceAdapterCreator: {},
            },
          },
        },
      },
    } as Message;
    const joinChannelService = new JoinVoiceChannelService(callback);

    joinChannelService.execute(message);

    expect(callback).toBeCalledTimes(1);
  });

  it("should throw a MemberNotAvailable Error", () => {
    const message = {} as Message;

    const joinChannelService = new JoinVoiceChannelService(callback);

    expect(() => joinChannelService.execute(message)).rejects.toThrow(
      MemberNotAvailable
    );
  });

  it("should throw a GuildNotAvailable Error", () => {
    const message = {
      member: { voice: { id: "voice-id", channel: {} } },
    } as Message;
    const joinChannelService = new JoinVoiceChannelService(callback);

    expect(() => joinChannelService.execute(message)).rejects.toThrow(
      GuildNotAvailable
    );
  });

  it("should throw a VoiceAdapterNotAvailable Error", () => {
    const message = {
      member: {
        voice: {
          id: "voice-id",
          channel: {
            guild: {
              id: "guild-id",
            },
          },
        },
      },
    } as Message;
    const joinChannelService = new JoinVoiceChannelService(callback);

    expect(() => joinChannelService.execute(message)).rejects.toThrow(
      VoiceAdapterNotAvailable
    );
  });

  it("should throw a ChannelNotAvailable Error", () => {
    const message = {
      member: { voice: { id: "voice-id" } },
      guild: {
        id: "guild-id",
        voiceAdapterCreator: {},
      },
    } as Message;
    const joinChannelService = new JoinVoiceChannelService(callback);

    expect(() => joinChannelService.execute(message)).rejects.toThrow(
      ChannelNotAvailable
    );
  });
});
