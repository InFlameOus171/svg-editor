import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { connectFormStyles } from './ConnectForm.styles';

@customElement('connect-form')
export class ConnectForm extends LitElement {
  @property()
  onJoinRoom?: (data: { userName?: string; roomId?: string }) => void;

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
    console.log((event.target as HTMLInputElement | undefined)?.value);
    this.roomId =
      (event.target as HTMLInputElement | undefined)?.value ?? this.roomId;
  };
  #handleUserNameChange = (event: InputEvent) => {
    console.log((event.target as HTMLInputElement | undefined)?.value);

    this.userName =
      (event.target as HTMLInputElement | undefined)?.value ?? this.userName;
  };

  render() {
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
