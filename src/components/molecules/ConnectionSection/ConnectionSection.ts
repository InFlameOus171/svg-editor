import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connectionSectionStyles } from './ConnectionSection.styles';
import '../../atoms/Chat';
import '../../atoms/RoomInformation';
import '../../atoms/ConnectForm';
import { nanoid } from 'nanoid';
import { ConnectionStatus } from '../../../types/network.types';

@customElement('connection-section')
export class ConnectionSection extends LitElement {
  static styles = [connectionSectionStyles];

  @property({ type: String })
  userName?: string = 'user_' + nanoid(5);
  @property({ type: String })
  roomId: string = '';
  @property({ type: String, reflect: true })
  status?: ConnectionStatus;
  @property({
    type: Array,
  })
  chatLog: Array<{ userName: string; message: string }> = [];

  @property()
  onJoinRoom?: (data: { userName?: string; roomId?: string }) => void;
  @property()
  onLeaveRoom?: () => void;
  @property()
  onSendMessage?: (message?: string) => void;

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    console.log('did antyhing change', _changedProperties);
  }
  render() {
    return html`
      <h3>Connection</h3>
      <connect-form
        .roomId=${this.roomId}
        .userName=${this.userName}
        .onJoinRoom=${this.onJoinRoom}
      >
      </connect-form>
      <room-information
        .onLeaveRoom=${this.onLeaveRoom}
        .userName=${this.userName}
        .roomId=${this.roomId}
      >
      </room-information>
      <chat-section
        .onSendMessage=${this.onSendMessage}
        .chatLog=${this.chatLog}
        .isDisabled=${this.status === 'connecting' ||
        this.status === 'disconnected'}
      >
      </chat-section>
    `;
  }
}
