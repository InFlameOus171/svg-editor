import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connectFormStyles } from './ConnectForm.styles';
import { RoomData } from './ConnectForm.types';

@customElement('connect-form')
export class ConnectForm extends LitElement {
  @property()
  onJoinRoom?: (data: RoomData) => void;

  @property({ type: String })
  userName?: string;
  @property({ type: String })
  roomId?: string;
  static styles = [connectFormStyles];

  #handleJoinRoom = () => {
    const userName = this.userName;
    const roomId = this.roomId;
    this.onJoinRoom?.({ userName, roomId });
  };

  #handleRoomIdChange = (event: Event) => {
    this.roomId =
      (event.target as HTMLInputElement | undefined)?.value ?? this.roomId;
  };
  #handleUserNameChange = (event: InputEvent) => {
    this.userName =
      (event.target as HTMLInputElement | undefined)?.value ?? this.userName;
  };

  protected render() {
    return html`<div>
        <label
          ><div id="username-form-label">Username:</div>
          <input
            @change=${this.#handleUserNameChange}
            id="user"
            type="text"
            maxlength="10"
            placeholder=${this.userName ?? ''}
        /></label>
        <label
          ><div id="connect-form-label">Room ID:</div>
          <input @change=${this.#handleRoomIdChange} id="room" type="text"
        /></label>
      </div>
      <div id="connect-button-container">
        <button @click=${this.#handleJoinRoom}>Connect</button>
      </div>`;
  }
}
