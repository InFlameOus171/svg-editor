var _ConnectionMonitor_ws;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { WS_EVENTS } from '../../types/network.types';
export class ConnectionMonitor {
    constructor(webSocket) {
        _ConnectionMonitor_ws.set(this, void 0);
        this.destroy = () => {
            __classPrivateFieldGet(this, _ConnectionMonitor_ws, "f").removeEventListener('message', event => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.event === WS_EVENTS.PING) {
                    const newEvent = JSON.stringify({ event: WS_EVENTS.PONG });
                    __classPrivateFieldGet(this, _ConnectionMonitor_ws, "f").send(newEvent);
                }
            });
        };
        __classPrivateFieldSet(this, _ConnectionMonitor_ws, webSocket, "f");
        webSocket.addEventListener('message', event => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.event === WS_EVENTS.PING) {
                const newEvent = JSON.stringify({ event: WS_EVENTS.PONG });
                webSocket.send(newEvent);
            }
        });
    }
}
_ConnectionMonitor_ws = new WeakMap();
//# sourceMappingURL=ConnectionMonitor.js.map