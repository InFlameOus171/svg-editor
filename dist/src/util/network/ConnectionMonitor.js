var _ConnectionMonitor_ws;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class ConnectionMonitor {
    constructor(webSocket) {
        _ConnectionMonitor_ws.set(this, void 0);
        this.destroy = () => {
            __classPrivateFieldGet(this, _ConnectionMonitor_ws, "f").removeEventListener('message', event => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.event === 'ping') {
                    __classPrivateFieldGet(this, _ConnectionMonitor_ws, "f").send('{"event":"pong"}');
                }
            });
        };
        __classPrivateFieldSet(this, _ConnectionMonitor_ws, webSocket, "f");
        webSocket.addEventListener('message', event => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.event === 'ping') {
                webSocket.send('{"event":"pong"}');
            }
        });
    }
}
_ConnectionMonitor_ws = new WeakMap();
//# sourceMappingURL=ConnectionMonitor.js.map