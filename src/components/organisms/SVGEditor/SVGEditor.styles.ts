import { css } from 'lit';

export const layoutStyle = css`
  :host {
    height: 100%;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    background-color: #2196f3;
  }

  #footer {
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.8);
  }

  #footer #footer-fields {
    border: none;
    display: flex;
    flex-direction: column;
  }

  #footer-fields > #footer-input {
    width: 100%;
    justify-content: space-between;
    display: flex;
  }

  #footer #footer-input #left-input-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  #footer #footer-input #right-input-section {
    visibility: hidden;
    border: none;
    padding: 0 20px 20px;
    background-color: inherit;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  #footer #footer-input-fields {
    display: flex;
    flex-direction: column;
  }

  #footer #footer-submit-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  #stroke-opacity-input {
    max-width: '20px';
  }
`;
export const layoutHeaderStyle = css`
  #header {
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
  }
`;

export const layoutContentStyle = css`
  #content {
    height: 90%;
    display: flex;
    flex-wrap: nowrap;
  }

  #draw-container {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    position: relative;
  }

  #drawzone {
    top: 0;
    left: 0;
    position: absolute;
  }

  #right-main-section {
    display: flex;
    flex-direction: column;
    padding: 30px 15px 0;
    background-color: rgba(255, 255, 255, 0.8);
  }

  #preview-layer {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

  #chat {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    margin-top: 20px;
  }

  #connection-info {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    min-height: 600px;
    max-height: 100%;
  }

  #connection-info #connect-form > label {
    display: flex;
  }

  #connection-info #connect-form > label > #connect-form-label {
    display: flex;
    min-width: fit-content;
    flex-direction: column;
    justify-content: flex-end;
  }

  #connection-info #connect-form {
    display: flex;
  }

  #connection-info #chatbox {
    min-height: 20em;
    background-color: white;
  }

  #connection-info #chatbox .chat-entry {
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: flex-end;
  }

  #connect-button-container {
    display: flex;
    align-items: flex-end;
  }

  #room-information {
    flex-direction: column;
  }

  #connection-info #chatbox .chat-entry:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  #connection-info #chatbox .chat-entry :first-child {
    align-self: flex-start;
  }

  #connection-info #chat-form {
    display: flex;
    padding-top: 10px;
  }

  #connection-info #chat-form #message-field {
    width: 100%;
  }

  #connection-info #chat #position-container {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 0 0;
  }
`;
