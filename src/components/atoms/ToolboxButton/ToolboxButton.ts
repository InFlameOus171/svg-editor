import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ToolboxStyle } from './ToolboxButton.styles';
import { IToolboxButtonProps } from './ToolboxButton.types';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  static styles = ToolboxStyle;

  @property({ type: Object }) props: IToolboxButtonProps;

  private handleClick() {
    this.props.onClick(this.props.id);
  }

  constructor(props: IToolboxButtonProps) {
    super();
    this.props = props;
  }

  render() {
    return html`
      <button @click=${this.handleClick}>${this.props.title}</button>
    `;
  }
}
