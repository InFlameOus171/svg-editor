import { ConnectionStatus } from '../../types/network.types';
import type { ShapeType } from '../../types/typeGuards.types';
import { CallbackFunction, ChatEntry } from '../../types/types';
import { ChatLogType } from './Connection.types';
export declare class Connection {
    #private;
    ws: WebSocket | null;
    onDeleteShapes: CallbackFunction<[string[]]>;
    onUpdateShapes: CallbackFunction<[Record<string, any>[]]>;
    onGetAllShapes: CallbackFunction<[], ShapeType[]>;
    onResetEditor: CallbackFunction<[]>;
    onUpdateConnectionStatus: CallbackFunction<[ConnectionStatus]>;
    onNewMessage: CallbackFunction<[ChatEntry[]]>;
    constructor(onDeleteShapes: CallbackFunction<[string[]]>, onUpdateShapes: CallbackFunction<[Record<string, any>[]]>, onGetAllShapes: CallbackFunction<[], ShapeType[]>, onResetEditor: CallbackFunction<[]>, onUpdateConnectionStatus: CallbackFunction<[ConnectionStatus]>, onNewMessage: CallbackFunction<[ChatEntry[]]>, onConnected: CallbackFunction<[Connection]>, url: string, port: string);
    disconnect: () => void;
    getRoom: () => string;
    getChatLog: () => ChatLogType[];
    getUserName: () => string;
    sendChatMessage: (message?: string | undefined) => void;
    lockShapes: (shape: ShapeType | ShapeType[]) => void;
    unlockShapes: (shape: ShapeType | ShapeType[]) => void;
    updateStatus: (status: ConnectionStatus) => void;
    getStatus: () => ConnectionStatus | undefined;
    deleteShapes: (ids: string[]) => void;
    updateShapes: (shapes: ShapeType | ShapeType[]) => void;
    connect: (roomId: string, userName?: string, url?: string, port?: string) => void;
}
