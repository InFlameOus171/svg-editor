export declare enum WS_EVENTS {
    MESSAGE = "message",
    PING = "ping",
    PONG = "pong",
    UPDATE_SHAPES = "update-shapes",
    GET_SHAPES = "get-shapes",
    DELETE_SHAPES = "delete-shapes",
    LOCK_SHAPES = "lock-shapes",
    UNLOCK_SHAPES = "unlock-shapes",
    JOIN_ROOM = "join-room",
    DISCONNECT = "disconnect",
    ERROR = "error"
}
export declare type ConnectionStatus = 'disconnected' | 'connected' | 'connecting';
export declare type ParsedData = Record<string, any> & {
    event?: WS_EVENTS;
    user?: string;
    userId?: string;
    value?: Record<string, any>[] | string;
};
export declare type RoomConnectionData = {
    userName?: string;
    roomId?: string;
};
