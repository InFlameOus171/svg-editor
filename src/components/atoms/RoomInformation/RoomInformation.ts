import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { roomInformationStyles } from './RoomInformation.styles';

@customElement('room-information')
export class RoomInformation extends LitElement {
  @property({ type: String })
  userName?: string = '';
  @property({ type: String })
  roomId?: string = '';

  @property()
  onLeaveRoom?: () => void;

  static styles = [roomInformationStyles];

  render() {
    return html`<div>
        Connected as ${this.userName} <br />
        Room ID: ${this.roomId}
      </div>
      <div id="disconnect-button-container">
        <button @click=${this.onLeaveRoom}>Disconnect</button>
      </div>`;
  }
}
