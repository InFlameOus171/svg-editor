var _ConnectForm_handleJoinRoom, _ConnectForm_handleRoomIdChange, _ConnectForm_handleUserNameChange;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connectFormStyles } from './ConnectForm.styles';
let ConnectForm = class ConnectForm extends LitElement {
    constructor() {
        super(...arguments);
        _ConnectForm_handleJoinRoom.set(this, () => {
            var _a;
            const userName = this.userName;
            const roomId = this.roomId;
            (_a = this.onJoinRoom) === null || _a === void 0 ? void 0 : _a.call(this, { userName, roomId });
        });
        _ConnectForm_handleRoomIdChange.set(this, (event) => {
            var _a, _b;
            this.roomId =
                (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : this.roomId;
        });
        _ConnectForm_handleUserNameChange.set(this, (event) => {
            var _a, _b;
            this.userName =
                (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : this.userName;
        });
    }
    render() {
        var _a;
        return html `<div>
        <label
          ><div id="username-form-label">Username:</div>
          <input
            @change=${__classPrivateFieldGet(this, _ConnectForm_handleUserNameChange, "f")}
            id="user"
            type="text"
            maxlength="10"
            placeholder=${(_a = this.userName) !== null && _a !== void 0 ? _a : ''}
        /></label>
        <label
          ><div id="connect-form-label">Room ID:</div>
          <input @change=${__classPrivateFieldGet(this, _ConnectForm_handleRoomIdChange, "f")} id="room" type="text"
        /></label>
      </div>
      <div id="connect-button-container">
        <button @click=${__classPrivateFieldGet(this, _ConnectForm_handleJoinRoom, "f")}>Connect</button>
      </div>`;
    }
};
_ConnectForm_handleJoinRoom = new WeakMap(), _ConnectForm_handleRoomIdChange = new WeakMap(), _ConnectForm_handleUserNameChange = new WeakMap();
ConnectForm.styles = [connectFormStyles];
__decorate([
    property()
], ConnectForm.prototype, "onJoinRoom", void 0);
__decorate([
    property({ type: String })
], ConnectForm.prototype, "userName", void 0);
__decorate([
    property({ type: String })
], ConnectForm.prototype, "roomId", void 0);
ConnectForm = __decorate([
    customElement('connect-form')
], ConnectForm);
export { ConnectForm };
//# sourceMappingURL=ConnectForm.js.map