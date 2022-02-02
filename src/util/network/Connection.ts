import { nanoid } from 'nanoid';
import {
  ConnectionStatus,
  ParsedData,
  WS_EVENTS,
} from '../../types/network.types';
import type { ShapeType } from '../../types/typeGuards.types';
import { CallbackFunction, ChatEntry } from '../../types/types';
import { ChatLogType } from './Connection.types';
import { ConnectionMonitor } from './ConnectionMonitor';

export class Connection {
  #userName: string = 'user_' + nanoid(5);
  #chatLog: ChatLogType[] = [];
  #userId: string;
  #url: string;
  #port: string;
  #roomId: string = '';
  ws: WebSocket | null = null;
  #keeper?: ConnectionMonitor;
  #status?: ConnectionStatus = 'disconnected';
  #onConnected: CallbackFunction<[Connection]>;
  onDeleteShapes: CallbackFunction<[string[]]>;
  onUpdateShapes: CallbackFunction<[Record<string, any>[]]>;
  onGetAllShapes: CallbackFunction<[], ShapeType[]>;
  onResetEditor: CallbackFunction<[]>;
  onUpdateConnectionStatus: CallbackFunction<[ConnectionStatus]>;
  onNewMessage: CallbackFunction<[ChatEntry[]]>;

  constructor(
    onDeleteShapes: CallbackFunction<[string[]]>,
    onUpdateShapes: CallbackFunction<[Record<string, any>[]]>,
    onGetAllShapes: CallbackFunction<[], ShapeType[]>,
    onResetEditor: CallbackFunction<[]>,
    onUpdateConnectionStatus: CallbackFunction<[ConnectionStatus]>,
    onNewMessage: CallbackFunction<[ChatEntry[]]>,
    onConnected: CallbackFunction<[Connection]>,
    url: string,
    port: string
  ) {
    this.#url = url;
    this.#port = port;
    this.#userId = nanoid();
    this.onDeleteShapes = onDeleteShapes;
    this.onUpdateShapes = onUpdateShapes;
    this.onGetAllShapes = onGetAllShapes;
    this.onResetEditor = onResetEditor;
    this.onNewMessage = onNewMessage;
    this.#onConnected = onConnected;
    this.onUpdateConnectionStatus = onUpdateConnectionStatus;
    this.updateStatus('disconnected');
  }

  disconnect = () => {
    this.ws?.close();
    this.#keeper?.destroy();
    this.updateStatus('disconnected');
    this.onResetEditor();
  };

  getRoom = () => {
    return this.#roomId;
  };

  getChatLog = () => {
    return this.#chatLog;
  };

  getUserName = () => {
    return this.#userName;
  };

  #parseResponse = (response: any): ParsedData => {
    const allParsedData = JSON.parse(response.data);
    if (
      allParsedData.event === WS_EVENTS.PING ||
      allParsedData.event === WS_EVENTS.PONG
    ) {
      return allParsedData;
    }
    const { value, ...parsedData } = allParsedData;
    const parsedValue =
      typeof value === 'string'
        ? value
        : (JSON.parse(value) as string[] | undefined)?.map(
            (innerValue): Record<string, any> => JSON.parse(innerValue)
          );
    return { ...parsedData, value: parsedValue };
  };

  #startKeepingConnectionAlive = (ws: WebSocket) => {
    if (this.#keeper) {
      this.#keeper.destroy();
    }
    this.#keeper = new ConnectionMonitor(ws);
    return this.#keeper;
  };

  #createNewWebSocket = () => {
    const self = this;
    const ws = new WebSocket(`ws://${this.#url}:${this.#port}`);
    this.ws = ws;
    ws.addEventListener('open', () => {
      const payload = {
        event: WS_EVENTS.JOIN_ROOM,
        roomId: self.#roomId,
        value: JSON.stringify(
          self.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())
        ),
        user: self.#userName,
      };
      self.#onConnected(self);
      self.updateStatus('connected');
      ws.send(JSON.stringify(payload));
      self.sendChatMessage('Connected to session.');
    });

    ws.addEventListener('close', () => {
      this.disconnect();
    });

    ws.addEventListener('message', msg => {
      const data: ParsedData = this.#parseResponse(msg);
      const { value, event, user } = data;
      switch (event) {
        case WS_EVENTS.MESSAGE:
          {
            if (user && value) {
              self.#chatLog?.push({ userName: user, message: value as string });
              self.onNewMessage(self.#chatLog);
            }
          }
          break;
        case WS_EVENTS.GET_SHAPES: {
          self.onUpdateShapes(JSON.parse(value as string) ?? []);
          break;
        }
        case WS_EVENTS.ERROR: {
          alert(
            'Error while communicating with the server. Please refresh the connection.'
          );
          break;
        }
      }
    });
    this.#startKeepingConnectionAlive(ws);
    this.#keeper = this.#startKeepingConnectionAlive(this.ws);
  };

  sendChatMessage = (message?: string) => {
    if (!message) return;
    const payload = JSON.stringify({
      event: WS_EVENTS.MESSAGE,
      roomId: this.#roomId,
      user: this.#userName,
      userId: this.#userId,
      value: message,
    });
    this.ws?.send(payload);
  };

  #sendShapeWithLock = (
    shapes: ShapeType | ShapeType[],
    isLocked: boolean = true
  ) => {
    let _shapes: ShapeType[] = [];
    if (!Array.isArray(shapes)) {
      shapes.isLocked = isLocked;
      _shapes = [shapes];
    } else {
      shapes.forEach(shape => (shape.isLocked = isLocked));
      _shapes = shapes;
    }
    const payload = JSON.stringify({
      event: isLocked ? WS_EVENTS.LOCK_SHAPES : WS_EVENTS.UNLOCK_SHAPES,
      roomId: this.#roomId,
      user: this.#userName,
      userId: this.#userId,
      value: _shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    this.ws?.send(payload);
  };

  lockShapes = (shape: ShapeType | ShapeType[]) => {
    this.#sendShapeWithLock(shape, true);
  };

  unlockShapes = (shape: ShapeType | ShapeType[]) => {
    this.#sendShapeWithLock(shape, false);
  };

  updateStatus = (status: ConnectionStatus) => {
    this.#status = status;
    this.onUpdateConnectionStatus(this.#status);
  };

  getStatus = (): ConnectionStatus | undefined => this.#status;

  deleteShapes = (ids: string[]) => {
    const payload = JSON.stringify({
      event: WS_EVENTS.DELETE_SHAPES,
      roomId: this.#roomId,
      user: this.#userName,
      userId: this.#userId,
      value: ids,
    });
    this.ws?.send(payload);
  };

  updateShapes = (shapes: ShapeType | ShapeType[]) => {
    let _shapes: ShapeType[] = [];
    if (!Array.isArray(shapes)) {
      _shapes = [shapes];
    } else {
      _shapes = shapes;
    }
    const payload = JSON.stringify({
      event: WS_EVENTS.UPDATE_SHAPES,
      roomId: this.#roomId,
      user: this.#userName,
      userId: this.#userId,
      value: _shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    this.ws?.send(payload);
  };

  connect = (
    roomId: string,
    userName: string = this.#userName,
    url: string = this.#url,
    port: string = this.#port
  ) => {
    this.updateStatus('connecting');
    this.disconnect();
    this.#createNewWebSocket();
    this.#userName = userName;
    this.#roomId = roomId;
    this.#url = url;
    this.#port = port;
  };
}
