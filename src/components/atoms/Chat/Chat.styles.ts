import { css } from 'lit';

export const chatStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  :host #chatbox .chat-entry:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :host #chatbox {
    height: 15em;
    overflow-y: auto;
    background-color: #fff;
  }

  :host #chatbox .chat-entry {
    display: flex;
    justify-content: space-between;
  }

  :host #chatbox .chat-entry div {
    display: flex;
    max-width: 50%;
    overflow-wrap: anywhere;
  }

  :host #chatbox .chat-entry :first-child {
    align-self: flex-start;
  }
  :host #chat-form {
    display: flex;
    padding-top: 10px;
  }

  :host #chat-form #message-field {
    width: 100%;
  }
`;
