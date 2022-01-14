declare const GeneralMessageEvents: readonly ["message", "ping", "pong", "get-shapes", "delete-shapes", "update-shapes"];
declare const ServerMessageEvents: readonly ["error", "message", "ping", "pong", "get-shapes", "delete-shapes", "update-shapes"];
export declare const MessageEvents: readonly ["error", "message", "ping", "pong", "get-shapes", "delete-shapes", "update-shapes", "join-room", "disconnect", "message", "ping", "pong", "get-shapes", "delete-shapes", "update-shapes", "message", "ping", "pong", "get-shapes", "delete-shapes", "update-shapes"];
export declare enum WS_EVENTS {
    MESSAGE = "message",
    PING = "ping",
    PONG = "pong",
    GET_SHAPES = "get-shapes",
    DELETE_SHAPES = "delete-shapes",
    UPDATE_SHAPES = "update-shapes",
    JOIN_ROOM = "join-room",
    DISCONNECT = "disconnect",
    ERROR = "error"
}
export declare type ServerMessageEventType = typeof ServerMessageEvents[number];
export declare type ClientMessageEventType = typeof MessageEvents[number];
export declare type GeneralMessageEventType = typeof GeneralMessageEvents[number];
export declare type MessageEventType = typeof MessageEvents[number];
export declare type ConnectionStatus = 'disconnected' | 'connected' | 'connecting';
export declare type ParsedData = {
    event?: WS_EVENTS;
    user?: string;
    userId?: string;
    value?: Record<string, any>[] | string;
    [key: string]: any;
};
export {};
