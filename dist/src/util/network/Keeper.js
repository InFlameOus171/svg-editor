var _Keeper_ws;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class Keeper {
    constructor(webSocket) {
        _Keeper_ws.set(this, void 0);
        this.destroy = () => {
            __classPrivateFieldGet(this, _Keeper_ws, "f").removeEventListener('message', event => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.event === 'ping') {
                    __classPrivateFieldGet(this, _Keeper_ws, "f").send('{"event":"pong"}');
                }
            });
        };
        __classPrivateFieldSet(this, _Keeper_ws, webSocket, "f");
        webSocket.addEventListener('message', event => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.event === 'ping') {
                webSocket.send('{"event":"pong"}');
            }
        });
    }
}
_Keeper_ws = new WeakMap();
//# sourceMappingURL=Keeper.js.map