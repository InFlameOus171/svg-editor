import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chatStyles } from './Chat.styles';
let Chat = class Chat extends LitElement {
    constructor() {
        super(...arguments);
        this.chatLog = [];
        this.isDisabled = true;
        this.handleSendMessage = () => {
            var _a, _b, _c;
            const value = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('message-field')) === null || _b === void 0 ? void 0 : _b.value;
            (_c = this.onSendMessage) === null || _c === void 0 ? void 0 : _c.call(this, value);
        };
    }
    updated(_changedProperties) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (_changedProperties.has('isDisabled')) {
            if (this.isDisabled) {
                (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('message-field')) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', '');
                (_d = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('send-message-button')) === null || _d === void 0 ? void 0 : _d.setAttribute('disabled', '');
            }
            else {
                (_f = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById('message-field')) === null || _f === void 0 ? void 0 : _f.removeAttribute('disabled');
                (_h = (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.getElementById('send-message-button')) === null || _h === void 0 ? void 0 : _h.removeAttribute('disabled');
            }
        }
    }
    render() {
        var _a;
        return html `
      <h3>Chat</h3>
      <div id="chatbox">
        ${(_a = this.chatLog) === null || _a === void 0 ? void 0 : _a.map(entry => {
            return html `<div class="chat-entry">
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
};
Chat.styles = [chatStyles];
__decorate([
    property({ type: Array })
], Chat.prototype, "chatLog", void 0);
__decorate([
    property()
], Chat.prototype, "onSendMessage", void 0);
__decorate([
    property({ type: Boolean })
], Chat.prototype, "isDisabled", void 0);
Chat = __decorate([
    customElement('chat-section')
], Chat);
export { Chat };
//# sourceMappingURL=Chat.js.map