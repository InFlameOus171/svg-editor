import type { ShapeType } from '../../types/shapes.types';
export declare class Connection {
    #private;
    ws: WebSocket;
    static userName: string;
    onDeleteShapes: (ids: string[]) => void;
    onUpdateShapes: (shapes: Record<string, any>[]) => void;
    onGetAllShapes: () => ShapeType[];
    onResetEditor: () => void;
    constructor(roomId: string | undefined, user: string | undefined, onDeleteShapes: (ids: string[]) => void, onUpdateShapes: (shape: Record<string, any>[]) => void, onGetAllShapes: () => ShapeType[], onResetEditor: () => void, url?: string, port?: string);
    disconnect: () => void;
    joinRoom: (roomId: string) => void;
    getRoom: () => string;
    setChat: (element?: HTMLElement | null | undefined) => void;
    createNewWebSocket: () => WebSocket;
    sendChatMessage: (message?: string | undefined) => void;
    sendShapes: (shapes: ShapeType[]) => void;
    lockShapes: (shape: ShapeType | ShapeType[]) => void;
    unlockShapes: (shape: ShapeType | ShapeType[]) => void;
    deleteShapes: (ids: string[]) => void;
    updateShapes: (shapes: ShapeType | ShapeType[]) => void;
    connect: (url?: string, port?: string, roomId?: string | undefined) => void;
}
