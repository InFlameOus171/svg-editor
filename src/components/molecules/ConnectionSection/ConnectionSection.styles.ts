import { css } from 'lit';

export const connectionSectionStyles = css`
  :host {
    display: flex;
    flex-direction: column;
  }
  :host([status='connected']) connect-form {
    display: none;
  }
  :host([status='disconnected']) room-information,
  :host([status='connecting']) room-information {
    display: none;
  }

  #chat #chatbox {
    height: 100%;
    height: -moz-available; /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
    height: fill-available;
    flex: 1 0.5 auto;
    overflow: auto;
    background-color: white;
  }

  #chat #chatbox .chat-entry {
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: flex-end;
  }

  #connect-button-container {
    display: flex;
    padding-top: 20px;
    justify-content: center;
  }

  #room-information {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  #room-information > #disconnect-button-container {
    padding-top: 10px;
    align-self: flex-start;
  }

  :host #chatbox .chat-entry:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :host #chatbox .chat-entry :first-child {
    align-self: flex-start;
  }

  #chat #chat-form {
    display: flex;
    padding-top: 10px;
  }

  #chat #chat-form #message-field {
    width: 100%;
  }
`;
