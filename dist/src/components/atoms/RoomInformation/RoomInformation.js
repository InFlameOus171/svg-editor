import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { roomInformationStyles } from './RoomInformation.styles';
let RoomInformation = class RoomInformation extends LitElement {
    constructor() {
        super(...arguments);
        this.userName = '';
        this.roomId = '';
    }
    render() {
        return html `<div>
        Connected as ${this.userName} <br />
        Room ID: ${this.roomId}
      </div>
      <div id="disconnect-button-container">
        <button @click=${this.onLeaveRoom}>Disconnect</button>
      </div>`;
    }
};
RoomInformation.styles = [roomInformationStyles];
__decorate([
    property({ type: String })
], RoomInformation.prototype, "userName", void 0);
__decorate([
    property({ type: String })
], RoomInformation.prototype, "roomId", void 0);
__decorate([
    property()
], RoomInformation.prototype, "onLeaveRoom", void 0);
RoomInformation = __decorate([
    customElement('room-information')
], RoomInformation);
export { RoomInformation };
//# sourceMappingURL=RoomInformation.js.map