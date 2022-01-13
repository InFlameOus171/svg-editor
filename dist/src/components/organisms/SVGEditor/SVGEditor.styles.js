import { css } from 'lit';
export const layoutStyle = css `
  :host {
    height: 100%;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    background-color: #2196f3;
  }

  #footer {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.8);
  }

  #footer #footer-fields {
    border: none;
    flex: 2 1 auto;
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
export const layoutHeaderStyle = css `
  #header {
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
  }
`;
export const layoutContentStyle = css `
  #content {
    flex: 1 1 auto;
    display: flex;
  }

  #draw-container {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    flex: 1 1 auto;
    /* max-height: 80vh; */
    /* width: 100%; */
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
    flex: 1 2 220px;
    max-width: 15%;
    flex-direction: column;
    padding: 20px 15px 0;
    background-color: rgba(255, 255, 255, 0.8);
    overflow-y: auto;
  }

  #preview-layer {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

  #chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 2 0 auto;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
  }

  #connection-info {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    flex: 0 1 20%;
  }

  #connection-section {
    display: flex;
    flex-direction: column;
  }

  #connection-info #connect-form > label {
    display: flex;
  }

  #connection-info #connect-form > label > #connect-form-label {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  #connection-info #connect-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  #connection-info #connect-form > :first-child {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  #connection-info #connect-form > :first-child label {
    flex: auto;
    flex-direction: column;
    display: flex;
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

  #connection-info #chatbox .chat-entry:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  #connection-info #chatbox .chat-entry :first-child {
    align-self: flex-start;
  }

  #chat #chat-form {
    display: flex;
    padding-top: 10px;
  }

  #chat #chat-form #message-field {
    width: 100%;
  }

  #position-container {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 0 0;
  }
`;
//# sourceMappingURL=SVGEditor.styles.js.map