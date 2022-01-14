import { nanoid } from 'nanoid';
import type { ConnectionStatus, ParsedData } from '../../types/network.types';
import type { ShapeType } from '../../types/shapes.types';
import { Keeper } from './Keeper';

export class Connection {
  #userName: string = 'user_' + nanoid(5);
  #chatLog: Array<{ userName: string; message: string }> = [];
  #userId: string;
  #url: string;
  #port: string;
  #roomId: string = '';
  ws: WebSocket | null = null;
  #keeper?: Keeper;
  #status?: ConnectionStatus = 'disconnected';
  onDeleteShapes: (ids: string[]) => void;
  onUpdateShapes: (shapes: Record<string, any>[]) => void;
  onGetAllShapes: () => ShapeType[];
  onResetEditor: () => void;
  onUpdateConnectionStatus: (status: ConnectionStatus) => void;
  onNewMessage: (chatLog: Array<{ userName: string; message: string }>) => void;

  constructor(
    onDeleteShapes: (ids: string[]) => void,
    onUpdateShapes: (shape: Record<string, any>[]) => void,
    onGetAllShapes: () => ShapeType[],
    onResetEditor: () => void,
    onUpdateConnectionStatus: (status: ConnectionStatus) => void,
    onNewMessage: (
      chatLog: Array<{ userName: string; message: string }>
    ) => void,
    url: string = 'localhost',
    port: string = '8080'
  ) {
    this.#url = url;
    this.#port = port;
    this.#userId = nanoid();
    this.onDeleteShapes = onDeleteShapes;
    this.onUpdateShapes = onUpdateShapes;
    this.onGetAllShapes = onGetAllShapes;
    this.onResetEditor = onResetEditor;
    this.onNewMessage = onNewMessage;
    this.onUpdateConnectionStatus = onUpdateConnectionStatus;
    this.updateStatus('disconnected');
  }

  disconnect = () => {
    this.ws?.close();
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
    if (allParsedData.event === 'ping' || allParsedData.event === 'pong')
      return allParsedData;
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
    this.#keeper = new Keeper(ws);
    return this.#keeper;
  };

  #createNewWebSocket = () => {
    const ws = new WebSocket(`ws://${this.#url}:${this.#port}`);
    this.ws = ws;
    ws.onopen = () => {
      const payload = {
        event: 'join-room',
        roomId: this.#roomId,
        value: JSON.stringify(
          this.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())
        ),
        user: this.#userName,
      };
      this.updateStatus('connected');
      ws.send(JSON.stringify(payload));
    };

    ws.addEventListener('message', msg => {
      const data: ParsedData = this.#parseResponse(msg);
      const { value, event, user } = data;
      switch (event) {
        case 'message':
          {
            if (user && value) {
              this.#chatLog?.push({ userName: user, message: value as string });
              this.onNewMessage(this.#chatLog);
            }
          }
          break;
        case 'get-shapes': {
          this.onUpdateShapes(JSON.parse(value as string) ?? []);
          break;
        }
        case 'ping': {
        }
      }
    });
    this.#startKeepingConnectionAlive(ws);
    this.#keeper = this.#startKeepingConnectionAlive(this.ws);
  };

  sendChatMessage = (message?: string) => {
    console.log(message);
    if (!message) return;
    const payload = JSON.stringify({
      event: 'message',
      roomId: this.#roomId,
      user: this.#userName,
      userId: this.#userId,
      value: message,
    });
    this.ws?.send(payload);
  };

  sendShapes = (shapes: ShapeType[]) => {
    if (!shapes.length) return;
    const payload = JSON.stringify({
      event: '',
    });
  };

  #sendShapeWithLock = (
    shape: ShapeType | ShapeType[],
    isLocked: boolean = true
  ) => {
    let _shapes: ShapeType[] = [];
    if (!Array.isArray(shape)) {
      shape.isLocked = isLocked;
      _shapes = [shape];
    } else {
      shape.forEach(shape => (shape.isLocked = isLocked));
      _shapes = shape;
    }
    const payload = JSON.stringify({
      event: isLocked ? 'lock-shapes' : 'unlock-shapes',
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

  getStatus = () => this.#status;

  deleteShapes = (ids: string[]) => {
    const payload = JSON.stringify({
      event: 'delete-shapes',
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
      event: 'update-shapes',
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
