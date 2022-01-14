var _Connection_userName, _Connection_chatLog, _Connection_userId, _Connection_url, _Connection_port, _Connection_roomId, _Connection_keeper, _Connection_status, _Connection_parseResponse, _Connection_startKeepingConnectionAlive, _Connection_createNewWebSocket, _Connection_sendShapeWithLock;
import { __classPrivateFieldGet, __classPrivateFieldSet, __rest } from "tslib";
import { nanoid } from 'nanoid';
import { Keeper } from './Keeper';
export class Connection {
    constructor(onDeleteShapes, onUpdateShapes, onGetAllShapes, onResetEditor, onUpdateConnectionStatus, onNewMessage, url = 'localhost', port = '8080') {
        _Connection_userName.set(this, 'user_' + nanoid(5));
        _Connection_chatLog.set(this, []);
        _Connection_userId.set(this, void 0);
        _Connection_url.set(this, void 0);
        _Connection_port.set(this, void 0);
        _Connection_roomId.set(this, '');
        this.ws = null;
        _Connection_keeper.set(this, void 0);
        _Connection_status.set(this, 'disconnected');
        this.disconnect = () => {
            var _a;
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
            this.updateStatus('disconnected');
            this.onResetEditor();
        };
        this.getRoom = () => {
            return __classPrivateFieldGet(this, _Connection_roomId, "f");
        };
        this.getChatLog = () => {
            return __classPrivateFieldGet(this, _Connection_chatLog, "f");
        };
        this.getUserName = () => {
            return __classPrivateFieldGet(this, _Connection_userName, "f");
        };
        _Connection_parseResponse.set(this, (response) => {
            var _a;
            const allParsedData = JSON.parse(response.data);
            if (allParsedData.event === 'ping' || allParsedData.event === 'pong')
                return allParsedData;
            const { value } = allParsedData, parsedData = __rest(allParsedData, ["value"]);
            const parsedValue = typeof value === 'string'
                ? value
                : (_a = JSON.parse(value)) === null || _a === void 0 ? void 0 : _a.map((innerValue) => JSON.parse(innerValue));
            return Object.assign(Object.assign({}, parsedData), { value: parsedValue });
        });
        _Connection_startKeepingConnectionAlive.set(this, (ws) => {
            if (__classPrivateFieldGet(this, _Connection_keeper, "f")) {
                __classPrivateFieldGet(this, _Connection_keeper, "f").destroy();
            }
            __classPrivateFieldSet(this, _Connection_keeper, new Keeper(ws), "f");
            return __classPrivateFieldGet(this, _Connection_keeper, "f");
        });
        _Connection_createNewWebSocket.set(this, () => {
            const ws = new WebSocket(`ws://${__classPrivateFieldGet(this, _Connection_url, "f")}:${__classPrivateFieldGet(this, _Connection_port, "f")}`);
            this.ws = ws;
            ws.onopen = () => {
                const payload = {
                    event: 'join-room',
                    roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                    value: JSON.stringify(this.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())),
                    user: __classPrivateFieldGet(this, _Connection_userName, "f"),
                };
                this.updateStatus('connected');
                ws.send(JSON.stringify(payload));
            };
            ws.addEventListener('message', msg => {
                var _a, _b;
                const data = __classPrivateFieldGet(this, _Connection_parseResponse, "f").call(this, msg);
                const { value, event, user } = data;
                switch (event) {
                    case 'message':
                        {
                            if (user && value) {
                                (_a = __classPrivateFieldGet(this, _Connection_chatLog, "f")) === null || _a === void 0 ? void 0 : _a.push({ userName: user, message: value });
                                this.onNewMessage(__classPrivateFieldGet(this, _Connection_chatLog, "f"));
                            }
                        }
                        break;
                    case 'get-shapes': {
                        this.onUpdateShapes((_b = JSON.parse(value)) !== null && _b !== void 0 ? _b : []);
                        break;
                    }
                    case 'ping': {
                    }
                }
            });
            __classPrivateFieldGet(this, _Connection_startKeepingConnectionAlive, "f").call(this, ws);
            __classPrivateFieldSet(this, _Connection_keeper, __classPrivateFieldGet(this, _Connection_startKeepingConnectionAlive, "f").call(this, this.ws), "f");
        });
        this.sendChatMessage = (message) => {
            var _a;
            console.log(message);
            if (!message)
                return;
            const payload = JSON.stringify({
                event: 'message',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: __classPrivateFieldGet(this, _Connection_userName, "f"),
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: message,
            });
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(payload);
        };
        this.sendShapes = (shapes) => {
            if (!shapes.length)
                return;
            const payload = JSON.stringify({
                event: '',
            });
        };
        _Connection_sendShapeWithLock.set(this, (shape, isLocked = true) => {
            var _a;
            let _shapes = [];
            if (!Array.isArray(shape)) {
                shape.isLocked = isLocked;
                _shapes = [shape];
            }
            else {
                shape.forEach(shape => (shape.isLocked = isLocked));
                _shapes = shape;
            }
            const payload = JSON.stringify({
                event: isLocked ? 'lock-shapes' : 'unlock-shapes',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: __classPrivateFieldGet(this, _Connection_userName, "f"),
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: _shapes.map(shape => JSON.stringify(shape.getDeconstructedShapeData())),
            });
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(payload);
        });
        this.lockShapes = (shape) => {
            __classPrivateFieldGet(this, _Connection_sendShapeWithLock, "f").call(this, shape, true);
        };
        this.unlockShapes = (shape) => {
            __classPrivateFieldGet(this, _Connection_sendShapeWithLock, "f").call(this, shape, false);
        };
        this.updateStatus = (status) => {
            __classPrivateFieldSet(this, _Connection_status, status, "f");
            this.onUpdateConnectionStatus(__classPrivateFieldGet(this, _Connection_status, "f"));
        };
        this.getStatus = () => __classPrivateFieldGet(this, _Connection_status, "f");
        this.deleteShapes = (ids) => {
            var _a;
            const payload = JSON.stringify({
                event: 'delete-shapes',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: __classPrivateFieldGet(this, _Connection_userName, "f"),
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: ids,
            });
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(payload);
        };
        this.updateShapes = (shapes) => {
            var _a;
            let _shapes = [];
            if (!Array.isArray(shapes)) {
                _shapes = [shapes];
            }
            else {
                _shapes = shapes;
            }
            const payload = JSON.stringify({
                event: 'update-shapes',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: __classPrivateFieldGet(this, _Connection_userName, "f"),
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: _shapes.map(shape => JSON.stringify(shape.getDeconstructedShapeData())),
            });
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(payload);
        };
        this.connect = (roomId, userName = __classPrivateFieldGet(this, _Connection_userName, "f"), url = __classPrivateFieldGet(this, _Connection_url, "f"), port = __classPrivateFieldGet(this, _Connection_port, "f")) => {
            this.updateStatus('connecting');
            this.disconnect();
            __classPrivateFieldGet(this, _Connection_createNewWebSocket, "f").call(this);
            __classPrivateFieldSet(this, _Connection_userName, userName, "f");
            __classPrivateFieldSet(this, _Connection_roomId, roomId, "f");
            __classPrivateFieldSet(this, _Connection_url, url, "f");
            __classPrivateFieldSet(this, _Connection_port, port, "f");
        };
        __classPrivateFieldSet(this, _Connection_url, url, "f");
        __classPrivateFieldSet(this, _Connection_port, port, "f");
        __classPrivateFieldSet(this, _Connection_userId, nanoid(), "f");
        this.onDeleteShapes = onDeleteShapes;
        this.onUpdateShapes = onUpdateShapes;
        this.onGetAllShapes = onGetAllShapes;
        this.onResetEditor = onResetEditor;
        this.onNewMessage = onNewMessage;
        this.onUpdateConnectionStatus = onUpdateConnectionStatus;
        this.updateStatus('disconnected');
    }
}
_Connection_userName = new WeakMap(), _Connection_chatLog = new WeakMap(), _Connection_userId = new WeakMap(), _Connection_url = new WeakMap(), _Connection_port = new WeakMap(), _Connection_roomId = new WeakMap(), _Connection_keeper = new WeakMap(), _Connection_status = new WeakMap(), _Connection_parseResponse = new WeakMap(), _Connection_startKeepingConnectionAlive = new WeakMap(), _Connection_createNewWebSocket = new WeakMap(), _Connection_sendShapeWithLock = new WeakMap();
//# sourceMappingURL=Connection.js.map