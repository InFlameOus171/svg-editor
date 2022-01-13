const GeneralMessageEvents = [
    'message',
    'ping',
    'pong',
    'get-shapes',
    'delete-shapes',
    'update-shapes',
];
const ClientMessageEvents = [
    'join-room',
    'disconnect',
    ...GeneralMessageEvents,
];
const ServerMessageEvents = ['error', ...GeneralMessageEvents];
export const MessageEvents = [
    ...ServerMessageEvents,
    ...ClientMessageEvents,
    ...GeneralMessageEvents,
];
export var WS_EVENTS;
(function (WS_EVENTS) {
    WS_EVENTS["MESSAGE"] = "message";
    WS_EVENTS["PING"] = "ping";
    WS_EVENTS["PONG"] = "pong";
    WS_EVENTS["GET_SHAPES"] = "get-shapes";
    WS_EVENTS["DELETE_SHAPES"] = "delete-shapes";
    WS_EVENTS["UPDATE_SHAPES"] = "update-shapes";
    WS_EVENTS["JOIN_ROOM"] = "join-room";
    WS_EVENTS["DISCONNECT"] = "disconnect";
    WS_EVENTS["ERROR"] = "error";
})(WS_EVENTS || (WS_EVENTS = {}));
//# sourceMappingURL=network.types.js.map