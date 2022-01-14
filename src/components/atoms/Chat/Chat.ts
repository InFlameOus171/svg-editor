import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chatStyles } from './Chat.styles';

@customElement('chat-section')
export class Chat extends LitElement {
  @property({ type: Array })
  chatLog: Array<{ userName: string; message: string }> = [];
  @property()
  onSendMessage?: (message?: string) => void;
  @property({ type: Boolean })
  isDisabled?: boolean = true;

  static styles = [chatStyles];

  handleSendMessage = () => {
    const value = (
      this.shadowRoot?.getElementById('message-field') as
        | HTMLInputElement
        | undefined
    )?.value;
    this.onSendMessage?.(value);
  };

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (_changedProperties.has('isDisabled')) {
      if (this.isDisabled) {
        this.shadowRoot
          ?.getElementById('message-field')
          ?.setAttribute('disabled', '');
        this.shadowRoot
          ?.getElementById('send-message-button')
          ?.setAttribute('disabled', '');
      } else {
        this.shadowRoot
          ?.getElementById('message-field')
          ?.removeAttribute('disabled');
        this.shadowRoot
          ?.getElementById('send-message-button')
          ?.removeAttribute('disabled');
      }
    }
  }

  render() {
    return html`
      <h3>Chat</h3>
      <div id="chatbox">
        ${this.chatLog?.map(entry => {
          return html`<div class="chat-entry">
            <div>${entry.userName}:</div>
            <div>${entry.message}</div>
          </div>`;
        })}
      </div>
      <div id="chat-form">
        <input id="message-field" type="text" placeholder="Message..." />
        <button id="send-message-button" @click=${this.handleSendMessage}>
          Send
        </button>
      </div>
    `;
  }
}
