import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connectionSectionStyles } from './ConnectionSection.styles';
import '../../atoms/Chat';
import '../../atoms/RoomInformation';
import '../../atoms/ConnectForm';
import { nanoid } from 'nanoid';
let ConnectionSection = class ConnectionSection extends LitElement {
    constructor() {
        super(...arguments);
        this.userName = 'user_' + nanoid(5);
        this.roomId = '';
        this.chatLog = [];
    }
    updated(_changedProperties) {
        console.log('did antyhing change', _changedProperties);
    }
    render() {
        return html `
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
};
ConnectionSection.styles = [connectionSectionStyles];
__decorate([
    property({ type: String })
], ConnectionSection.prototype, "userName", void 0);
__decorate([
    property({ type: String })
], ConnectionSection.prototype, "roomId", void 0);
__decorate([
    property({ type: String, reflect: true })
], ConnectionSection.prototype, "status", void 0);
__decorate([
    property({
        type: Array,
    })
], ConnectionSection.prototype, "chatLog", void 0);
__decorate([
    property()
], ConnectionSection.prototype, "onJoinRoom", void 0);
__decorate([
    property()
], ConnectionSection.prototype, "onLeaveRoom", void 0);
__decorate([
    property()
], ConnectionSection.prototype, "onSendMessage", void 0);
ConnectionSection = __decorate([
    customElement('connection-section')
], ConnectionSection);
export { ConnectionSection };
//# sourceMappingURL=ConnectionSection.js.map