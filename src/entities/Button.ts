import { MessageButtonStyle } from "discord.js";

export interface ButtonProps {
  id: string;
  label: string;
  style: MessageButtonStyle;
}

export class Button {
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get label() {
    return this.props.label;
  }

  public set label(label: string) {
    this.props.label = label;
  }

  public get style() {
    return this.props.style;
  }

  public set style(style: MessageButtonStyle) {
    this.style = style;
  }
}
