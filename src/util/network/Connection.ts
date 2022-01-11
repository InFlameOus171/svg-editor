import { nanoid } from 'nanoid';
import { ParsedData } from '../../types/network.types';
import { ShapeType } from '../../types/shapes';
import { Keeper } from './Keeper';

export class Connection {
  ws: WebSocket;
  static userName: string = 'user_' + nanoid(5);
  #userId: string;
  #url: string;
  #port: string;
  #roomId: string;
  #keeper: Keeper;
  #chat?: HTMLElement | null;
  onDeleteShapes: (ids: string[]) => void;
  onUpdateShapes: (shapes: Record<string, any>[]) => void;
  onGetAllShapes: () => ShapeType[];
  onResetEditor: () => void;
  constructor(
    roomId: string = '',
    user: string = 'user_' + nanoid(5),
    onDeleteShapes: (ids: string[]) => void,
    onUpdateShapes: (shape: Record<string, any>[]) => void,
    onGetAllShapes: () => ShapeType[],
    onResetEditor: () => void,
    url: string = 'localhost',
    port: string = '8080'
  ) {
    this.#url = url;
    this.#port = port;
    this.#roomId = roomId;
    Connection.userName = user;
    this.#userId = nanoid();
    this.ws = this.createNewWebSocket();
    this.#keeper = this.#startKeepingConnectionAlive(this.ws);
    this.onDeleteShapes = onDeleteShapes;
    this.onUpdateShapes = onUpdateShapes;
    this.onGetAllShapes = onGetAllShapes;
    this.onResetEditor = onResetEditor;
  }

  disconnect = () => {
    this.ws.close();
    this.onResetEditor();
  };

  joinRoom = (roomId: string) => {
    this.connect(this.#url, this.#port, roomId);
  };

  getRoom = () => {
    return this.#roomId;
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

  setChat = (element?: HTMLElement | null) => {
    this.#chat = element;
  };

  createNewWebSocket = () => {
    const ws = new WebSocket(`ws://${this.#url}:${this.#port}`);

    ws.onopen = () => {
      const payload = {
        event: 'join-room',
        roomId: this.#roomId,
        value: JSON.stringify(
          this.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())
        ),
        user: Connection.userName,
      };
      ws.send(JSON.stringify(payload));
    };

    ws.addEventListener('message', msg => {
      const data: ParsedData = this.#parseResponse(msg);
      const { value, event, user, userId } = data;
      switch (event) {
        case 'message':
          {
            const newEntry = document.createElement('div');
            newEntry.setAttribute('class', 'chat-entry');
            const userName = document.createElement('div');
            const message = document.createElement('div');
            userName.innerHTML = user ? user + ':' : '';
            message.innerHTML = value as string;
            newEntry.appendChild(userName);
            newEntry.appendChild(message);
            this.#chat?.appendChild(newEntry);
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
    return ws;
  };

  sendChatMessage = (message?: string) => {
    if (!message) return;
    const payload = JSON.stringify({
      event: 'message',
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
      value: message,
    });
    this.ws.send(payload);
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
      user: Connection.userName,
      userId: this.#userId,
      value: _shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    this.ws.send(payload);
  };

  lockShapes = (shape: ShapeType | ShapeType[]) => {
    this.#sendShapeWithLock(shape, true);
  };

  unlockShapes = (shape: ShapeType | ShapeType[]) => {
    this.#sendShapeWithLock(shape, false);
  };

  deleteShapes = (ids: string[]) => {
    const payload = JSON.stringify({
      event: 'delete-shapes',
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
      value: ids,
    });
    this.ws.send(payload);
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
      user: Connection.userName,
      userId: this.#userId,
      value: _shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    this.ws.send(payload);
  };

  connect = (
    url: string = this.#url,
    port: string = this.#port,
    roomId?: string
  ) => {
    this.disconnect();
    url = url;
    port = port;
    roomId = roomId ?? roomId;
    this.createNewWebSocket();
  };
}
