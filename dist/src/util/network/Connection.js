var _Connection_userId, _Connection_url, _Connection_port, _Connection_roomId, _Connection_keeper, _Connection_chat, _Connection_parseResponse, _Connection_startKeepingConnectionAlive, _Connection_sendShapeWithLock;
import { __classPrivateFieldGet, __classPrivateFieldSet, __rest } from "tslib";
import { nanoid } from 'nanoid';
import { Keeper } from './Keeper';
export class Connection {
    constructor(roomId = '', user = 'user_' + nanoid(5), onDeleteShapes, onUpdateShapes, onGetAllShapes, onResetEditor, url = 'localhost', port = '8080') {
        _Connection_userId.set(this, void 0);
        _Connection_url.set(this, void 0);
        _Connection_port.set(this, void 0);
        _Connection_roomId.set(this, void 0);
        _Connection_keeper.set(this, void 0);
        _Connection_chat.set(this, void 0);
        this.disconnect = () => {
            this.ws.close();
            this.onResetEditor();
        };
        this.joinRoom = (roomId) => {
            this.connect(__classPrivateFieldGet(this, _Connection_url, "f"), __classPrivateFieldGet(this, _Connection_port, "f"), roomId);
        };
        this.getRoom = () => {
            return __classPrivateFieldGet(this, _Connection_roomId, "f");
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
        this.setChat = (element) => {
            __classPrivateFieldSet(this, _Connection_chat, element, "f");
        };
        this.createNewWebSocket = () => {
            const ws = new WebSocket(`ws://${__classPrivateFieldGet(this, _Connection_url, "f")}:${__classPrivateFieldGet(this, _Connection_port, "f")}`);
            ws.onopen = () => {
                const payload = {
                    event: 'join-room',
                    roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                    value: JSON.stringify(this.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())),
                    user: Connection.userName,
                };
                ws.send(JSON.stringify(payload));
            };
            ws.addEventListener('message', msg => {
                var _a, _b;
                const data = __classPrivateFieldGet(this, _Connection_parseResponse, "f").call(this, msg);
                const { value, event, user, userId } = data;
                switch (event) {
                    case 'message':
                        {
                            const newEntry = document.createElement('div');
                            newEntry.setAttribute('class', 'chat-entry');
                            const userName = document.createElement('div');
                            const message = document.createElement('div');
                            userName.innerHTML = user ? user + ':' : '';
                            message.innerHTML = value;
                            newEntry.appendChild(userName);
                            newEntry.appendChild(message);
                            (_a = __classPrivateFieldGet(this, _Connection_chat, "f")) === null || _a === void 0 ? void 0 : _a.appendChild(newEntry);
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
            return ws;
        };
        this.sendChatMessage = (message) => {
            if (!message)
                return;
            const payload = JSON.stringify({
                event: 'message',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: Connection.userName,
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: message,
            });
            this.ws.send(payload);
        };
        this.sendShapes = (shapes) => {
            if (!shapes.length)
                return;
            const payload = JSON.stringify({
                event: '',
            });
        };
        _Connection_sendShapeWithLock.set(this, (shape, isLocked = true) => {
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
                user: Connection.userName,
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: _shapes.map(shape => JSON.stringify(shape.getDeconstructedShapeData())),
            });
            this.ws.send(payload);
        });
        this.lockShapes = (shape) => {
            __classPrivateFieldGet(this, _Connection_sendShapeWithLock, "f").call(this, shape, true);
        };
        this.unlockShapes = (shape) => {
            __classPrivateFieldGet(this, _Connection_sendShapeWithLock, "f").call(this, shape, false);
        };
        this.deleteShapes = (ids) => {
            const payload = JSON.stringify({
                event: 'delete-shapes',
                roomId: __classPrivateFieldGet(this, _Connection_roomId, "f"),
                user: Connection.userName,
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: ids,
            });
            this.ws.send(payload);
        };
        this.updateShapes = (shapes) => {
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
                user: Connection.userName,
                userId: __classPrivateFieldGet(this, _Connection_userId, "f"),
                value: _shapes.map(shape => JSON.stringify(shape.getDeconstructedShapeData())),
            });
            this.ws.send(payload);
        };
        this.connect = (url = __classPrivateFieldGet(this, _Connection_url, "f"), port = __classPrivateFieldGet(this, _Connection_port, "f"), roomId) => {
            this.disconnect();
            url = url;
            port = port;
            roomId = roomId !== null && roomId !== void 0 ? roomId : roomId;
            this.createNewWebSocket();
        };
        __classPrivateFieldSet(this, _Connection_url, url, "f");
        __classPrivateFieldSet(this, _Connection_port, port, "f");
        __classPrivateFieldSet(this, _Connection_roomId, roomId, "f");
        Connection.userName = user;
        __classPrivateFieldSet(this, _Connection_userId, nanoid(), "f");
        this.ws = this.createNewWebSocket();
        __classPrivateFieldSet(this, _Connection_keeper, __classPrivateFieldGet(this, _Connection_startKeepingConnectionAlive, "f").call(this, this.ws), "f");
        this.onDeleteShapes = onDeleteShapes;
        this.onUpdateShapes = onUpdateShapes;
        this.onGetAllShapes = onGetAllShapes;
        this.onResetEditor = onResetEditor;
    }
}
_Connection_userId = new WeakMap(), _Connection_url = new WeakMap(), _Connection_port = new WeakMap(), _Connection_roomId = new WeakMap(), _Connection_keeper = new WeakMap(), _Connection_chat = new WeakMap(), _Connection_parseResponse = new WeakMap(), _Connection_startKeepingConnectionAlive = new WeakMap(), _Connection_sendShapeWithLock = new WeakMap();
Connection.userName = 'user_' + nanoid(5);
//# sourceMappingURL=Connection.js.map