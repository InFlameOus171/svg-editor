import type { ConnectionStatus } from '../../types/network.types';
import type { ShapeType } from '../../types/shapes.types';
export declare class Connection {
    #private;
    ws: WebSocket | null;
    onDeleteShapes: (ids: string[]) => void;
    onUpdateShapes: (shapes: Record<string, any>[]) => void;
    onGetAllShapes: () => ShapeType[];
    onResetEditor: () => void;
    onUpdateConnectionStatus: (status: ConnectionStatus) => void;
    onNewMessage: (chatLog: Array<{
        userName: string;
        message: string;
    }>) => void;
    constructor(onDeleteShapes: (ids: string[]) => void, onUpdateShapes: (shape: Record<string, any>[]) => void, onGetAllShapes: () => ShapeType[], onResetEditor: () => void, onUpdateConnectionStatus: (status: ConnectionStatus) => void, onNewMessage: (chatLog: Array<{
        userName: string;
        message: string;
    }>) => void, url?: string, port?: string);
    disconnect: () => void;
    getRoom: () => string;
    getChatLog: () => {
        userName: string;
        message: string;
    }[];
    getUserName: () => string;
    sendChatMessage: (message?: string | undefined) => void;
    sendShapes: (shapes: ShapeType[]) => void;
    lockShapes: (shape: ShapeType | ShapeType[]) => void;
    unlockShapes: (shape: ShapeType | ShapeType[]) => void;
    updateStatus: (status: ConnectionStatus) => void;
    getStatus: () => ConnectionStatus | undefined;
    deleteShapes: (ids: string[]) => void;
    updateShapes: (shapes: ShapeType | ShapeType[]) => void;
    connect: (roomId: string, userName?: string, url?: string, port?: string) => void;
}
